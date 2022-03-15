package org.fs13.twitterapp.dto.rq;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.fs13.twitterapp.entity.user.UserRole;

import javax.validation.constraints.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {
  @NotNull
  @Size(min = 2, max = 255, message = "should be from 2 to 255 characters long")
  private String name;
  @NotNull
  @Size(min = 2, max = 255, message = "should be from 2 to 255 characters long")
  private String surname;
  @NotNull
  @Email
  private String email;
  @NotNull
  @Pattern(regexp = "^.*(?=.{8,})((?=.*[!@#$%^&*()\\-_=+{};:,<.>]){1})(?=.*\\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$",
          message = "Password must contain at least 8 characters, one uppercase," +
                  " one number and one special case character")
  private String password;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  @Past
  private Date birthdate;

  private UserRole role = UserRole.USER;
}