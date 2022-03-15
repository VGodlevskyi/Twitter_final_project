package org.fs13.twitterapp.repository;

import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    default User findUserById(Long id) {
        return this.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("user with id %d not found", id)));
    }

    @Transactional
    @Modifying
    @Query("UPDATE User a SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);

    User findUserByName(String name);

    Page<User> findAllByUsersSubscribedNotContains(User user, Pageable pageable);

    Page<User> findAll(Pageable pageable);

    Page<User> findByNameContainsIgnoreCase(String name, Pageable pageable);
}
