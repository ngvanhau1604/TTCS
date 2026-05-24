package com.smartfee.service;

import com.smartfee.model.User;
import com.smartfee.exception.InvalidDataException;
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

    @Autowired
    private UserRepository userRepository;

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

        boolean matches = passwordEncoder.matches(rawPassword, foundUser.getPassword());
        logger.debug("Password match result: {}", matches);

        return matches ? Optional.of(foundUser) : Optional.empty();
    }

    public User register(User user) {
        if (user.getUsername() == null || user.getUsername().isBlank()) {
            throw new InvalidDataException("username là bắt buộc");
        }
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new InvalidDataException("password là bắt buộc");
        }

        String normalizedUsername = user.getUsername().trim();
        if (userRepository.findByUsername(normalizedUsername).isPresent()) {
            throw new InvalidDataException("username đã tồn tại");
        }

        String role = user.getRole() == null || user.getRole().isBlank()
                ? "RESIDENT"
                : user.getRole().trim().toUpperCase();
        if (!ALLOWED_ROLES.contains(role)) {
            throw new InvalidDataException("role không hợp lệ");
        }

        user.setUsername(normalizedUsername);
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}