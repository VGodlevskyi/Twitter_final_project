package org.fs13.twitterapp.entity.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.fs13.twitterapp.entity.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.security.Principal;
import java.time.LocalDate;
import java.util.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_user")
public class User extends BaseEntity implements UserDetails {
    private String name;
    private String surname;
    private String location;
    private String language;
    private LocalDate birthdate;
    private String bio;
    private String website;
    private String avatarUrl;
    private String profileBackgroundUrl;
    private String titleImgUrl;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @Enumerated(EnumType.STRING)
    private UserOrigin origin;
    private Boolean locked = false;
    private Boolean enabled = false;
    private String providerId;

    @Column(name = "user_email", nullable = false, unique = true)
    private String email;

    @Column
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Repost> reposts = new ArrayList<>();

    @LazyCollection(LazyCollectionOption.EXTRA)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany(mappedBy = "chatMembers", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonIgnore
    private Set<Chat> chats;

    @OneToMany(mappedBy = "sender", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonIgnore
    private Set<Message> sentMessages;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Notification> notifications = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "posts_to_likes",
            joinColumns = @JoinColumn(name = "user_id "),
            inverseJoinColumns = @JoinColumn(name = "post_id"))
    @JsonIgnore
    private Set<Post> likedPosts = new HashSet<>();

    @LazyCollection(LazyCollectionOption.EXTRA)
    @ManyToMany
    @JoinTable(name = "subscribers",
            joinColumns = @JoinColumn(name = "userWhoId"),
            inverseJoinColumns = @JoinColumn(name = "userWhomId"))
    @JsonIgnore
    private Set<User> usersSubscribed;

    @LazyCollection(LazyCollectionOption.EXTRA)
    @ManyToMany
    @JoinTable(name = "subscribers",
            joinColumns = @JoinColumn(name = "userWhomId"),
            inverseJoinColumns = @JoinColumn(name = "userWhoId"))
    @JsonIgnore
    private Set<User> usersSubscribing;

    public User(String name, String surname, LocalDate birthdate, UserRole role, String email, String password) {
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
        this.role = role;
        this.email = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public int getNumberOfSubs() {
        return usersSubscribed.size();
    }

    public int getNumberOfSubscriptions() {
        return usersSubscribing.size();
    }

    public int getNumberOfTweets() {
        return posts.size();
    }

    public void addUserToSubscribed(User user) {
        usersSubscribed.add(user);
    }

    public void addUserToSubscribing(User user) {
        usersSubscribing.add(user);
    }

    public void removeUserFromSubscribed(User user) {
        usersSubscribed.remove(user);
    }

    public void removeUserFromSubscribing(User user) {
        usersSubscribing.remove(user);
    }

    public Boolean isUserFollowingByCurrentUser() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        return usersSubscribed.stream().anyMatch(u -> u.getEmail().equals(principal.getName()));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return getId() != null && Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
