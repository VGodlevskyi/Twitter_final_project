package org.fs13.twitterapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.fs13.twitterapp.entity.user.User;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.*;
import java.security.Principal;
import java.util.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "post")
public class Post extends BaseEntity {
    @Column(name = "body")
    private String body;
    @Column(name = "img_twit_url")
    private String imgTwitUrl;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "userId",
            updatable = false,
            nullable = false,
            referencedColumnName = "id"
    )
    private User user;

    @LazyCollection(LazyCollectionOption.EXTRA)
    @JsonIgnore
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Repost> reposts = new ArrayList<>();

    @LazyCollection(LazyCollectionOption.EXTRA)
    @JsonIgnore
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @LazyCollection(LazyCollectionOption.EXTRA)
    @JsonIgnore
    @ManyToMany(mappedBy = "likedPosts")
    private Set<User> likes = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Notification> notifications = new ArrayList<>();

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "conn_post_parent",
            inverseJoinColumns = {
                @JoinColumn(name = "PARENT_ID", referencedColumnName = "ID")
            },
            joinColumns = @JoinColumn(name = "REPOST_ID", referencedColumnName = "ID"))
    private Post parentPost;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "HEAD_ID", referencedColumnName = "ID")
    private Post headPost;

    @JsonIgnore
    @OneToMany(mappedBy = "headPost", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Set<Post> retweets = new HashSet<>();

    @Transient
    private String linkToHead;

    public Integer getNumberOfLikes() {
        return likes.size();
    }

    public Integer getNumberOfComments() {
        return comments.size();
    }

    public Integer getNumberOfRetweets() {
        return retweets.size();
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void addLike(User user) {
        likes.add(user);
    }

    public Boolean isLikedByCurrentUser() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        return likes.stream().anyMatch(u -> u.getEmail().equals(principal.getName()));
    }

    public Boolean isUserSubscribedByCurrentUser() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        if (principal.getName().equals(user.getEmail())) return false;
        return user.getUsersSubscribed().stream().anyMatch(u -> u.getEmail().equals(principal.getName()));
    }

    public String getLinkToHead() {
        return Objects.isNull(this.getHeadPost())? null : String.format("/tweet/%d", this.getHeadPost().getId());
    }

}
