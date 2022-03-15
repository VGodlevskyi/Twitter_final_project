package org.fs13.twitterapp.controller;

import org.fs13.twitterapp.dto.UserResetDetails;
import org.fs13.twitterapp.dto.rq.AuthRequest;
import org.fs13.twitterapp.dto.rq.AccountRequest;
import org.fs13.twitterapp.dto.rq.RegistrationRequest;
import org.fs13.twitterapp.dto.rq.ResetPasswordRequest;
import org.fs13.twitterapp.dto.rs.AccountResponse;
import org.fs13.twitterapp.dto.rs.AuthResponse;
import org.fs13.twitterapp.dto.rs.RegistrationResponse;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.exceptions.token.TokenAlreadyConfirmedException;
import org.fs13.twitterapp.exceptions.token.TokenNotFoundException;
import org.fs13.twitterapp.exceptions.user.BadCredentialsException;
import org.fs13.twitterapp.exceptions.user.NotFoundException;
import org.fs13.twitterapp.exceptions.user.UserAlreadyExistsException;
import org.fs13.twitterapp.service.api.AuthService;
import org.fs13.twitterapp.service.impl.auth.tokens.JwtService;
import org.fs13.twitterapp.listeners.RegistrationCompleteEvent;
import org.fs13.twitterapp.listeners.ResetRequestEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import java.util.Collections;
import java.util.Locale;
import java.util.Map;

import static org.fs13.twitterapp.dto.rs.RegistrationResponse.REGISTRATION_ERROR;
import static org.fs13.twitterapp.dto.rs.RegistrationResponse.REGISTRATION_SUCCESS;

@RestController
@RequestMapping("api/v0/auth")
public class AuthController {

  @Autowired
  private AuthService service;
  @Autowired
  private ApplicationEventPublisher eventPublisher;
  @Autowired
  private JwtService jwtService;
  @Autowired
  private UserDetailsService userDetailsService;

  @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<RegistrationResponse> registerAccount(@RequestBody @Valid RegistrationRequest rq) {
    try {
      service.registerUser(rq);
      User usr = service.getCurrentUser(rq);
      eventPublisher.publishEvent(new RegistrationCompleteEvent(service.getConfirmationUrl(usr), usr));
      return new ResponseEntity<>(RegistrationResponse.of(REGISTRATION_SUCCESS), HttpStatus.OK);
    } catch (UserAlreadyExistsException exception) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, REGISTRATION_ERROR, exception);
    }
  }

  @GetMapping("/register/confirm/{token}")
  public ResponseEntity<String> confirmRegistration(@PathVariable String token) {
    try {
      return new ResponseEntity<>(service.confirmRegistration(token), HttpStatus.OK);
    } catch (TokenNotFoundException notFoundException){
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "token confirmation failed", notFoundException);
    } catch (TokenAlreadyConfirmedException alreadyConfirmedException) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "token already confirmed", alreadyConfirmedException);
    }
  }

  @Validated
  @PostMapping("/login")
  public AuthResponse login(@RequestBody @Valid AuthRequest credentials) {

    try {
      User appUser = service.findByCredentials(credentials.getEmail(), credentials.getPassword());

      if (!appUser.isEnabled()) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication failed: Please activate your account");
      }
      return tokens(credentials.getEmail());
    } catch (BadCredentialsException exception) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Authentication failed: bad credentials provided", exception);
    } catch (NotFoundException exception) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Authentication failed: username not found", exception);
    }
  }

  @Validated
  @PostMapping("/reset")
  public ResponseEntity<Map<String, String>> resetPassword(@RequestBody @Valid ResetPasswordRequest rq) {
    String email = rq.getEmail();
    try {
      UserResetDetails details = service.getResetDetails(email);
      eventPublisher.publishEvent(new ResetRequestEvent(details.getResetPass(), details.getUser()));
      String successMessage = String.format("Please check %s to get your new password", email);
      return new ResponseEntity<>(Collections.singletonMap("message", successMessage), HttpStatus.OK);
    } catch (NotFoundException exception) {
      String failureMessage = String.format("failed to find user %s", email);
     throw new ResponseStatusException(HttpStatus.BAD_REQUEST, failureMessage);
    }
  }

  @Validated
  @PostMapping("/find-account")
  public ResponseEntity<AccountResponse> findByEmail(@RequestBody @Valid @NotNull AccountRequest rq) {
    final String email = rq.getEmail().toLowerCase();
    if (!service.accountExists(email)) {
      String failureMessage = String.format("accounts with email %s not found", email);
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, failureMessage);
    }
    return new ResponseEntity<>(new AccountResponse(rq.getEmail()), HttpStatus.OK);
  }


  private AuthResponse tokens(String email) {
    UserDetails userDetails =  userDetailsService.loadUserByUsername(email);
    System.out.println(userDetails.toString());
    final String accessToken = jwtService.accessToken((org.springframework.security.core.userdetails.User) userDetails);
    final String refreshToken = jwtService.refreshToken((org.springframework.security.core.userdetails.User) userDetails);
    return new AuthResponse(accessToken, refreshToken);
  }
}
