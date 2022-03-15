package org.fs13.twitterapp.service.impl.user;

import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.repository.UserRepo;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImp implements UserDetailsService {

  private final String userNotFoundMsg = "Username: %s not found";
  private final UserRepo userRepo;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User appUser = userRepo.findByEmail(username)
            .orElseThrow(() ->
                    new UsernameNotFoundException(String.format(userNotFoundMsg, username)));
    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>(
           List.of(new SimpleGrantedAuthority(appUser.getRole().toString()))
    );

    return new org.springframework.security.core.userdetails.User(appUser.getUsername(), appUser.getPassword(), authorities);
  }
}
