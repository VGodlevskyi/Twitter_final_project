package org.fs13.twitterapp.entity;


import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.fs13.twitterapp.entity.user.User;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = false)
@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_repost")
public class Repost extends BaseEntity {
  @Column(name = "body")
  private String body;

  @ManyToOne
  @JoinColumn(
          name = "userId",
          insertable = false,
          updatable = false
    )
  private User user;

  @ManyToOne(cascade = {CascadeType.PERSIST})
  @JoinColumn(
          name = "postId",
          insertable = false,
          updatable = false
    )
  private Post post;
}


