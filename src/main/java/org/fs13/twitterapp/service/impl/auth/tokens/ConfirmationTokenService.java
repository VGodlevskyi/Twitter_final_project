package org.fs13.twitterapp.service.impl.auth.tokens;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.entity.ConfirmationToken;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.repository.ConfirmationTokenRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.fs13.twitterapp.exceptions.token.TokenNotFoundException.TokenNotFound;
import static org.fs13.twitterapp.exceptions.token.TokenAlreadyConfirmedException.TokenAlreadyConfirmed;
import static org.fs13.twitterapp.exceptions.token.TokenExpiredException.TokenExpired;

@Service
@RequiredArgsConstructor
public class ConfirmationTokenService {
  private final ConfirmationTokenRepo repo;

  public void saveConfirmationToken(ConfirmationToken token) {
    repo.save(token);
  }

  private int setConfirmedAt(String token) {
    return repo.updateConfirmedAt(token, LocalDateTime.now());
  }

  public ConfirmationToken getByToken(String token) {
    return repo.findByToken(token)
            .orElseThrow(() -> TokenNotFound);
  }

  public ConfirmationToken generatedToken(User user) {
    String token = UUID.randomUUID().toString();
    LocalDateTime expires = LocalDateTime.now().plusMinutes(60);
    ConfirmationToken confirmationToken = new ConfirmationToken(token, expires, user);
    repo.save(confirmationToken);
    return confirmationToken;
  }

  public String confirmToken(String token) {
    ConfirmationToken confirmationToken = getByToken(token);

    if (confirmationToken.getConfirmedAt() != null) {
      throw TokenAlreadyConfirmed;
    }

    if (confirmationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
      throw TokenExpired;
    }

    setConfirmedAt(token);

    return "token confirmed";
  }
}
