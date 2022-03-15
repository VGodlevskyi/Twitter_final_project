package org.fs13.twitterapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
public class JpaAuditConfig implements AuditorAware<String> {

  @Override
  public Optional<String> getCurrentAuditor() {
    Optional<Authentication> auth = Optional.of(SecurityContextHolder.getContext()).map(SecurityContext::getAuthentication);
    return Optional.of(auth.map(Authentication::getName)
            .orElse("anonymous"));
  }
}