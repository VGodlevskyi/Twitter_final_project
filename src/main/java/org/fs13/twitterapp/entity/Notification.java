package org.fs13.twitterapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.fs13.twitterapp.entity.user.User;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_notification")
public class Notification extends BaseEntity {
    @Column(name = "is_read")
    private Boolean isRead;
    @Column(name = "body", length = 100000000)
    private String body;
    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @ManyToOne
    @JoinColumn(
            name = "postId",
            updatable = false,
            nullable = true,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "post_id_fk")
    )
    private Post post;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "userId",
            updatable = false,
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "user_id_fk")
    )
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "submitterId",
            updatable = false,
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "submitter_id_fk")
    )
    private User submitter;
}
