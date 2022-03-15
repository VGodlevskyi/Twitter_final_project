package org.fs13.twitterapp.service.api;

import org.fs13.twitterapp.dto.UserResetDetails;
import org.fs13.twitterapp.dto.rq.RegistrationRequest;
import org.fs13.twitterapp.dto.rs.RegistrationResponse;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.user.UserAlreadyExistsException;

public interface AuthService {
  RegistrationResponse registerUser(RegistrationRequest registrationRequest) throws UserAlreadyExistsException;
  String getConfirmationUrl(User user);
  User getCurrentUser(RegistrationRequest registrationRequest);
  String confirmRegistration(String token);
  User findByCredentials(String username, String password);
  UserResetDetails getResetDetails(String username);
  boolean accountExists(String email);
}
