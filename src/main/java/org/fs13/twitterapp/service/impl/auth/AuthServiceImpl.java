package org.fs13.twitterapp.service.impl.auth;

import org.fs13.twitterapp.dto.UserResetDetails;
import org.fs13.twitterapp.dto.rq.RegistrationRequest;
import org.fs13.twitterapp.dto.rs.RegistrationResponse;
import org.fs13.twitterapp.entity.ConfirmationToken;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.entity.user.UserOrigin;
import org.fs13.twitterapp.exceptions.user.BadCredentialsException;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.facade.UserFacade;
import org.fs13.twitterapp.repository.UserRepo;
import org.fs13.twitterapp.service.api.AuthService;
import org.fs13.twitterapp.service.impl.auth.tokens.ConfirmationTokenService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

import static org.fs13.twitterapp.exceptions.user.BadCredentialsException.BAD_CREDENTIALS;
import static org.fs13.twitterapp.exceptions.user.NotFoundException.EMAIL_NOT_FOUND;


@Service
public class AuthServiceImpl implements AuthService {
  @Autowired
  private UserRepo userRepo;
  @Autowired
  private ModelMapper modelMapper;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private ConfirmationTokenService confirmationTokenService;

  @Override
  public RegistrationResponse registerUser(RegistrationRequest registrationRequest) {
    Optional<User> existingUser = userRepo.findByEmail(registrationRequest.getEmail());

    if (existingUser.isPresent()) {
       throw new RuntimeException("User has already been registered");
    }

    User usr = modelMapper.map(registrationRequest, User.class);
    usr.setPassword(passwordEncoder.encode(usr.getPassword()));
    usr.setOrigin(UserOrigin.OUR);
    userRepo.save(usr);
    return RegistrationResponse.of(RegistrationResponse.REGISTRATION_SUCCESS);
  }

  @Override
  public User getCurrentUser(RegistrationRequest registrationRequest) {
    String email = registrationRequest.getEmail();
    return userRepo.findByEmail(email)
            .orElseThrow(()
                    -> new NotFoundException(String.format( "user %s not found", email)));
  }

  @Override
  public String confirmRegistration(String token) {
    ConfirmationToken ct = confirmationTokenService.getByToken(token);
    User user = ct.getGivenTo();
    userRepo.enableAppUser(user.getEmail());
    return confirmationTokenService.confirmToken(token);
  }

  @Override
  public User findByCredentials(String username, String password) {
    User user = userRepo.findByEmail(username)
            .orElseThrow(() ->
                    new NotFoundException(String.format("bad credentials: email %s not found", username)));
    String pass = user.getPassword();
    if (passwordEncoder.matches(password, pass)) {
      return user;
    } else {
      throw new BadCredentialsException(BAD_CREDENTIALS);
    }
  }

  @Override
  public UserResetDetails getResetDetails(String username) {
    User user = userRepo.findByEmail(username)
            .orElseThrow(() -> new NotFoundException(EMAIL_NOT_FOUND));
    return new UserResetDetails(user, generatedRandomPassword(user));
  }

  @Override
  public boolean accountExists(String email) {
    return userRepo.findByEmail(email).isPresent();
  }

  private String generatedRandomPassword(User user) {
    String pass = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
    user.setPassword(passwordEncoder.encode(pass));
    userRepo.save(user);
    return pass;
  }

  @Override
  public String getConfirmationUrl(User user) {
    ConfirmationToken confirmationToken = confirmationTokenService.generatedToken(user);
    return "https://twitterapp-fs13.herokuapp.com/api/v0/auth/register/confirm/" + confirmationToken.getToken();
  }

}
