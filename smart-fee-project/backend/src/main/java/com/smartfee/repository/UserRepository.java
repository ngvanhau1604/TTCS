package com.smartfee.repository;

import com.smartfee.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    @Query("""
            select u
            from User u
            where u.role = 'RESIDENT'
                and (
                            upper(coalesce(trim(u.approvalStatus), '')) = 'PENDING'
                            or upper(coalesce(trim(u.approvalStatus), '')) = ''
                        )
            order by u.userId asc
            """)
    List<User> findPendingResidentRegistrations();
}