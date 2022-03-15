package org.fs13.twitterapp.facade;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rq.ChangePasswordRequest;
import org.fs13.twitterapp.dto.rq.UserRequest;
import org.fs13.twitterapp.dto.rs.MessageResponse;
import org.fs13.twitterapp.dto.rs.UserResponse;
import org.fs13.twitterapp.entity.Message;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.service.impl.cloudinary.CloudinaryServiceImpl;
import org.fs13.twitterapp.service.impl.user.UserServiceImp;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.fs13.twitterapp.entity.user.UserOrigin.GOOGLE;
import static org.fs13.twitterapp.entity.user.UserRole.USER;

import java.security.Principal;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;


@Component
@RequiredArgsConstructor
public class UserFacade extends GeneralFacade<User, UserRequest, UserResponse> {

  private final UserServiceImp userService;
  private final CloudinaryServiceImpl cloudinaryService;
  private final PasswordEncoder passwordEncoder;
  public UserResponse editUserProfile(Principal principal, UserRequest userRequest) throws IOException {
    User userByPrincipalEmail = userService.getUserProfile(principal.getName());
    userByPrincipalEmail.setName(userRequest.getName());
    userByPrincipalEmail.setSurname(userRequest.getSurname());
    userByPrincipalEmail.setBio(userRequest.getBio());
    userByPrincipalEmail.setLocation(userRequest.getLocation());
    userByPrincipalEmail.setWebsite(userRequest.getWebsite());
    userByPrincipalEmail.setBirthdate(userRequest.getBirthdate());
    Optional<MultipartFile> avatarImg = Optional.ofNullable(userRequest.getAvatarImg());
    Optional<MultipartFile> bgImg = Optional.ofNullable(userRequest.getBgImg());

    if (avatarImg.isPresent()) userByPrincipalEmail.setAvatarUrl(cloudinaryService.getUrl(userRequest.getAvatarImg()));
    if (bgImg.isPresent()) userByPrincipalEmail.setProfileBackgroundUrl(cloudinaryService.getUrl(userRequest.getBgImg()));

    return convertToDto(userService.save(userByPrincipalEmail));
  }

  public UserResponse getUserProfile(String email) {
    return convertToDto(userService.getUserProfile(email));
  }


  public User follow(Principal principal, Long id) {
    User userByPrincipalEmail = userService.getUserProfile(principal.getName());

    User userById = userService.findById(id).orElseThrow(() -> new NotFoundException("User not found!"));

    return userService.follow(userByPrincipalEmail, userById);
  }

  public User unfollow(Principal principal, Long id) {
    User userByPrincipalEmail = userService.getUserProfile(principal.getName());

    User userById = userService.findById(id).orElseThrow(() -> new NotFoundException("User not found!"));

    return userService.unfollow(userByPrincipalEmail, userById);
  }

  public Set<UserResponse> getFollowing(Principal principal) {
    return userService.getFollowing(principal.getName()).stream().map(this::convertToDto).collect(Collectors.toSet());
  }

  public Set<UserResponse> getFollowers(Principal principal) {
    return userService.getFollowers(principal.getName()).stream().map(this::convertToDto).collect(Collectors.toSet());
  }


  public PageableResponse<UserResponse> findUserByNameContains(String user, int page, int size) {
    PageableResponse<User> pgUsers = userService.searchUserProfile(user, page, size);
    List<UserResponse> userResponseList = StreamSupport.stream(pgUsers.getList().spliterator(), false).map(this::convertToDto)
            .collect(Collectors.toList());
    return new PageableResponse<>(pgUsers.getTotal(), userResponseList);
  }

  public UserResponse getUserById(Long id) {
    return convertToDto(userService.getUserById(id));
  }

  public PageableResponse<UserResponse> findAllByUsersSubscribedNotContains(Principal principal, int page, int size) {
    PageableResponse<User> pgUsers = userService.findAllByUsersSubscribedNotContains(principal.getName(), 0, 10);
    List<UserResponse> userResponseList = StreamSupport.stream(pgUsers.getList().spliterator(), false).map(this::convertToDto)
            .collect(Collectors.toList());
    return new PageableResponse<>(pgUsers.getTotal(), userResponseList);
  }

  @Transactional
  public void passwordChange(ChangePasswordRequest request, Principal principal) {
    userService.getUserProfile(principal.getName())
                .setPassword(
                        passwordEncoder.encode(request.getUserinfo())
                );
  }

  public boolean verifyPassword(String input, Principal principal) {
    var current =  userService.getUserProfile(principal.getName()).getPassword();
    return passwordEncoder.matches(input, current);
  }
}
