package org.fs13.twitterapp.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.fs13.twitterapp.entity.user.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "confirmation_token")
public class ConfirmationToken extends BaseEntity {
  @Column(name = "token", nullable = false)
  private String token;
  @Column(name = "expires_at", nullable = false)
  private LocalDateTime expiresAt;
  @Column(name = "confirmed_at")
  private LocalDateTime confirmedAt;

  @ManyToOne
  @JoinColumn(
          nullable = false,
          name = "userId"
    )
  private User givenTo;

  public ConfirmationToken(String token, LocalDateTime expiresAt, User user) {
    this.token = token;
    this.expiresAt = expiresAt;
    this.givenTo = user;
  }
}
