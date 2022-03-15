package org.fs13.twitterapp.dto.rs;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String surname;
    private String bio;
    private LocalDate birthdate;
    private String location;
    private String website;
    private Date createdDate;
    private String avatarUrl;
    private String profileBackgroundUrl;
    private int numberOfSubs;
    private int numberOfSubscriptions;
    private int numberOfTweets;
    private Boolean isUserFollowingByCurrentUser;

}
