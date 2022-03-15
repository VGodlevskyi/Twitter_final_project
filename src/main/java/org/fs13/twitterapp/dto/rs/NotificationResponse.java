package org.fs13.twitterapp.dto.rs;

import lombok.Data;
import org.fs13.twitterapp.entity.NotificationType;

import java.util.Date;

@Data
public class NotificationResponse {
    private Long id;
    private Date createdDate;
    private String createdBy;
    private String body;
    private NotificationType type;
    private PostResponse post;
    private UserResponse submitter;
}
