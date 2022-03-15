package org.fs13.twitterapp.config;

import org.fs13.twitterapp.dto.rs.PostResponse;
import org.fs13.twitterapp.dto.rs.UserResponse;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration

public class ApplicationConfig {
  @Bean
  public PasswordEncoder encoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper modelMapper = new ModelMapper();
    modelMapper.typeMap(User.class, UserResponse.class)
            .addMapping(User::getNumberOfSubs, UserResponse::setNumberOfSubs)
            .addMapping(User::getNumberOfSubscriptions, UserResponse::setNumberOfSubscriptions)
            .addMapping(User::getNumberOfTweets, UserResponse::setNumberOfTweets)
            .addMapping(User::isUserFollowingByCurrentUser, UserResponse::setIsUserFollowingByCurrentUser);

    modelMapper.typeMap(Post.class, PostResponse.class)
            .addMapping(Post::getNumberOfLikes, PostResponse::setNumberOfLikes)
            .addMapping(Post::getNumberOfComments, PostResponse::setNumberOfComments)
            .addMapping(Post::getNumberOfRetweets, PostResponse::setNumberOfRetweets)
            .addMapping(Post::isUserSubscribedByCurrentUser, PostResponse::setIsUserSubscribedByCurrentUser)
            .addMapping(Post::isLikedByCurrentUser, PostResponse::setIsLikedByCurrentUser);

    return modelMapper;
  }
}
