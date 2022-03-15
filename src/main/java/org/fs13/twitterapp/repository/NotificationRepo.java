package org.fs13.twitterapp.repository;

import org.fs13.twitterapp.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {
    Page<Notification> getNotificationsByUserEmail(String email, Pageable pageable);
}
