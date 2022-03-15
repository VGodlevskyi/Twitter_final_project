package org.fs13.twitterapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.fs13.twitterapp.entity.user.User;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CHATS")
public class Chat extends BaseEntity {
  @Column(name = "INITIATOR_ID")
  private Long initiatorId;

  @ManyToMany(targetEntity = User.class)
  @JoinTable(name = "CONN_CHAT_USER",
             joinColumns        = @JoinColumn(name = "CHAT_ID", referencedColumnName = "ID"),
             inverseJoinColumns = @JoinColumn(name = "USER_ID", referencedColumnName = "ID"))
  private Set<User> chatMembers;

  @OneToMany(targetEntity = Message.class, mappedBy = "chat", cascade = CascadeType.ALL)
  private Set<Message> messages;
}

