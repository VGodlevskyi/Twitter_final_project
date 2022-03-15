package org.fs13.twitterapp.dto.rq;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class AuthRequest{
    @Email
    private String email;

    @Size(min = 4)
    @NotBlank
    private String password;
}
