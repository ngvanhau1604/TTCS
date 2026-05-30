package com.smartfee.service;

import com.smartfee.dto.ResidentRegistrationRequest;
import com.smartfee.model.Apartment;
import com.smartfee.model.User;
import com.smartfee.exception.InvalidDataException;
import com.smartfee.repository.ApartmentRepository;
import com.smartfee.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private static final String DEFAULT_ROLE = "RESIDENT";
    private static final String STATUS_PENDING = "PENDING";
    private static final String STATUS_APPROVED = "APPROVED";
    private static final String STATUS_REJECTED = "REJECTED";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ApartmentRepository apartmentRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private static final Set<String> ALLOWED_ROLES = Set.of("ADMIN", "RESIDENT", "ACCOUNTANT", "STAFF");

    public Optional<User> authenticate(String username, String rawPassword) {
        logger.debug("Attempting to authenticate user: {}", username);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            logger.warn("User not found: {}", username);
            return Optional.empty();
        }

        User foundUser = user.get();
        logger.debug("Found user: {} with role: {}", foundUser.getUsername(), foundUser.getRole());

        // Check if the password matches
        boolean matches = passwordEncoder.matches(rawPassword, foundUser.getPassword());
        // logger.debug("Password match result: {}", matches);

        if (!matches) {
            logger.warn("Invalid password for user: {}", username);
            return Optional.empty();
        }

        // If the password is correct, proceed to check the approval status.
        if (DEFAULT_ROLE.equalsIgnoreCase(foundUser.getRole())) {
            if (!STATUS_APPROVED.equalsIgnoreCase(foundUser.getApprovalStatus())) {
                logger.warn("User {} is not approved yet: {}", foundUser.getUsername(), foundUser.getApprovalStatus());          
                // Ném Exception với thông điệp rõ ràng để Controller bắt và trả về mã 403 cho Frontend
                throw new InvalidDataException("Tài khoản của bạn đang chờ Ban quản lý xét duyệt. Vui lòng quay lại sau.");
            }
        } else if (foundUser.getApprovalStatus() == null || foundUser.getApprovalStatus().isBlank()) {
            logger.debug("User {} has no approval status, treating system account role {} as approved",
                    foundUser.getUsername(), foundUser.getRole());
        }

        return Optional.of(foundUser);
    }

    public User registerResident(ResidentRegistrationRequest request) {
        if (request.getUsername() == null || request.getUsername().isBlank()) {
            throw new InvalidDataException("username là bắt buộc");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new InvalidDataException("password là bắt buộc");
        }
        if (request.getFullName() == null || request.getFullName().isBlank()) {
            throw new InvalidDataException("fullName là bắt buộc");
        }
        if (request.getPhoneNumber() == null || request.getPhoneNumber().isBlank()) {
            throw new InvalidDataException("phoneNumber là bắt buộc");
        }
        if (request.getApartmentCode() == null || request.getApartmentCode().isBlank()) {
            throw new InvalidDataException("apartmentCode là bắt buộc");
        }

        String normalizedUsername = request.getUsername().trim();
        if (userRepository.findByUsername(normalizedUsername).isPresent()) {
            throw new InvalidDataException("username đã tồn tại");
        }

        String normalizedApartmentCode = request.getApartmentCode().trim().toUpperCase();
        Apartment apartment = apartmentRepository.findByRoomNumber(normalizedApartmentCode)
                .orElseThrow(() -> new InvalidDataException("mã căn hộ không tồn tại"));

        if (apartment.getOwner() != null) {
            throw new InvalidDataException("căn hộ đã có cư dân được gán");
        }

        // 
        boolean isAlreadyRegistered = getPendingResidentRegistrations().stream()
                .anyMatch(u -> u.getApartmentCode().equalsIgnoreCase(normalizedApartmentCode));
        if (isAlreadyRegistered) {
            throw new InvalidDataException("Đã có một tài khoảng đang chờ duyệt đăng ký cho căn hộ này");
        }

        User user = new User();
        user.setUsername(normalizedUsername);
        user.setRole(DEFAULT_ROLE);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName().trim());
        user.setPhoneNumber(request.getPhoneNumber().trim());
        user.setApartmentCode(normalizedApartmentCode);
        user.setApprovalStatus(STATUS_PENDING);
        return userRepository.save(user);
    }

    public java.util.List<User> getPendingResidentRegistrations() {
        return userRepository.findPendingResidentRegistrations();
    }

    public User approveResidentRegistration(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidDataException("user không tồn tại"));
        if (!DEFAULT_ROLE.equalsIgnoreCase(user.getRole())) {
            throw new InvalidDataException("chỉ duyệt được tài khoản cư dân");
        }
        if (!isPendingStatus(user.getApprovalStatus())) {
            throw new InvalidDataException("tài khoản không ở trạng thái chờ duyệt");
        }

        if (user.getApartmentCode() == null || user.getApartmentCode().isBlank()) {
            throw new InvalidDataException("Tài khoản chờ duyệt đang thiếu mã căn hộ, không thể duyệt");
        }

        Apartment apartment = apartmentRepository.findByRoomNumber(user.getApartmentCode())
                .orElseThrow(() -> new InvalidDataException("mã căn hộ không tồn tại"));
        if (apartment.getOwner() != null && !apartment.getOwner().getUserId().equals(user.getUserId())) {
            throw new InvalidDataException("căn hộ đã có chủ sở hữu khác");
        }

        user.setApprovalStatus(STATUS_APPROVED);
        User saved = userRepository.save(user);
        apartment.setOwner(saved);
        apartmentRepository.save(apartment);
        return saved;
    }

    public User rejectResidentRegistration(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidDataException("user không tồn tại"));
        if (!isPendingStatus(user.getApprovalStatus())) {
            throw new InvalidDataException("tài khoản không ở trạng thái chờ duyệt");
        }
        user.setApprovalStatus(STATUS_REJECTED);
        return userRepository.save(user);
    }

    private boolean isPendingStatus(String approvalStatus) {
        if (approvalStatus == null) {
            return true;
        }
        return STATUS_PENDING.equalsIgnoreCase(approvalStatus.trim()) || approvalStatus.trim().isBlank();
    }

    private String normalizeRole(String rawRole) {
        if (rawRole == null || rawRole.isBlank()) {
            return DEFAULT_ROLE;
        }
        return rawRole.trim().toUpperCase();
    }
}