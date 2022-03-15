package org.fs13.twitterapp.dto.rq;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserRequest {

    private Long id;
    private MultipartFile avatarImg;
    private MultipartFile bgImg;

    @NotNull
    @Size(min = 2, max = 255)
    private String name;

    @NotNull
    @Size(min = 2, max = 255)
    private String surname;

    @Size(min = 2, max = 255)
    private String bio;

    @Size(min = 2, max = 255)
    private String website;

    @Size(min = 2, max = 255)
    private String location;

    @Email
    private String email;
    /*
      1) should not start with digit or special character
      2) should not end with special character
      3) must contain any of these three at least once('@','#','_') and no other special characters are allowed.
      4) must contain at least one letter
      5) must contain at least one digit
      6) length should be minimum 8 character
     * */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthdate;
}