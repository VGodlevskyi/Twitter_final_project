package org.fs13.twitterapp.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.fs13.twitterapp.entity.user.User;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "MESSAGES")
public class Message extends BaseEntity {

  @Column(name= "MSG_BODY")
  private String body;

  @ManyToOne(targetEntity = User.class)
  @JoinTable(name = "CONN_USER_MESSAGE",
          inverseJoinColumns =  @JoinColumn(name = "USER_ID",    referencedColumnName = "ID"),
          joinColumns =         @JoinColumn(name = "MESSAGE_ID", referencedColumnName = "ID"))
  private User sender;

  @ManyToOne(targetEntity = Chat.class, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
  @JoinTable(
          name ="CONN_CHAT_MESSAGE",
          joinColumns =         @JoinColumn(name = "MESSAGE_ID", referencedColumnName = "ID"),
          inverseJoinColumns =  @JoinColumn(name = "CHAT_ID",    referencedColumnName = "ID"))
  private Chat chat;

}
