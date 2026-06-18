package com.smartfee.service;

import com.smartfee.dto.ResidentRegistrationRequest;
import com.smartfee.exception.InvalidDataException;
import com.smartfee.model.Apartment;
import com.smartfee.model.User;
import com.smartfee.repository.ApartmentRepository;
import com.smartfee.repository.UserRepository;
import jakarta.persistence.Column;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.lang.reflect.Field;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ApartmentRepository apartmentRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    public void registerResident_defaultsPendingStatusAndLinksApartmentCode() {
        ResidentRegistrationRequest input = new ResidentRegistrationRequest();
        input.setUsername("newuser");
        input.setPassword("password123");
        input.setFullName("Nguyen Van A");
        input.setPhoneNumber("0909123456");
        input.setApartmentCode("101");

        when(userRepository.findByUsername("newuser")).thenReturn(Optional.empty());
        Apartment apartment = new Apartment();
        apartment.setApartmentId(1);
        apartment.setRoomNumber("101");
        when(apartmentRepository.findByRoomNumber("101")).thenReturn(Optional.of(apartment));
        when(passwordEncoder.encode("password123")).thenReturn("hashed-password");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User saved = authService.registerResident(input);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertEquals("RESIDENT", captor.getValue().getRole());
        assertEquals("PENDING", captor.getValue().getApprovalStatus());
        assertEquals("101", captor.getValue().getApartmentCode());
        assertEquals("RESIDENT", saved.getRole());
        assertEquals("PENDING", saved.getApprovalStatus());
        assertEquals("hashed-password", saved.getPassword());
    }

    @Test
    public void registerResident_rejectsMissingApartmentCode() {
        ResidentRegistrationRequest input = new ResidentRegistrationRequest();
        input.setUsername("newuser");
        input.setPassword("password123");
        input.setFullName("Nguyen Van A");
        input.setPhoneNumber("0909123456");

        assertThrows(InvalidDataException.class, () -> authService.registerResident(input));
        verify(userRepository, never()).save(any());
    }

    @Test
    public void approveResidentRegistration_setsApprovedAndLinksApartment() {
        User user = new User();
        user.setUserId(10);
        user.setUsername("newuser");
        user.setRole("RESIDENT");
        user.setApartmentCode("101");
        user.setApprovalStatus("PENDING");

        Apartment apartment = new Apartment();
        apartment.setApartmentId(1);
        apartment.setRoomNumber("101");

        when(userRepository.findById(10)).thenReturn(Optional.of(user));
        when(apartmentRepository.findByRoomNumber("101")).thenReturn(Optional.of(apartment));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(apartmentRepository.save(any(Apartment.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User approved = authService.approveResidentRegistration(10);

        assertEquals("APPROVED", approved.getApprovalStatus());
        assertSame(approved, apartment.getOwner());
        verify(userRepository).save(user);
        verify(apartmentRepository).save(apartment);
    }

    @Test
    public void loginBlockedWhenNotApproved() {
        User user = new User();
        user.setUsername("newuser");
        user.setPassword("encoded");
        user.setRole("RESIDENT");
        user.setApprovalStatus("PENDING");

        when(userRepository.findByUsername("newuser")).thenReturn(Optional.of(user));

        InvalidDataException ex = assertThrows(InvalidDataException.class,
                () -> authService.authenticate("newuser", "password123"));
        assertTrue(ex.getMessage().contains("duyệt"));
        verify(passwordEncoder, never()).matches(any(), any());
    }

    @Test
    public void adminLoginAllowedEvenWhenLegacyApprovalStatusIsBlank() {
        User user = new User();
        user.setUsername("admin");
        user.setPassword("encoded");
        user.setRole("ADMIN");
        user.setApprovalStatus("");

        when(userRepository.findByUsername("admin")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password123", "encoded")).thenReturn(true);

        assertTrue(authService.authenticate("admin", "password123").isPresent());
        verify(passwordEncoder).matches("password123", "encoded");
    }

    @Test
    public void roleColumnIsNotUpdatable() throws Exception {
        Field roleField = User.class.getDeclaredField("role");
        Column column = roleField.getAnnotation(Column.class);

        assertNotNull(column);
        assertFalse(column.updatable());
        assertFalse(column.nullable());
    }
}
