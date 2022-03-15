package org.fs13.twitterapp.entity;


import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.fs13.twitterapp.entity.user.User;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = false)
@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
public class Comment extends BaseEntity {
  @Column(name = "body")
  private String body;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(
    name = "post_id",
    nullable = false,
    updatable = false,
    referencedColumnName = "id",
    foreignKey = @ForeignKey(
            name = "comments_post_fk"
    ))
    private Post post;

  @ManyToOne
  @JoinColumn(
          name = "user_id",
          updatable = false
    )
  private User user;

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
