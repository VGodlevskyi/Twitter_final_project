package org.fs13.twitterapp.dto.rs;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.fs13.twitterapp.entity.user.ChangePasswordStatus;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@RequiredArgsConstructor
public class ChangePasswordResponse {
    @Enumerated(EnumType.STRING)
    private final ChangePasswordStatus changeStatus;

    public static ChangePasswordResponse failed() {
        return new ChangePasswordResponse(ChangePasswordStatus.FAILED);
    }

    public static ChangePasswordResponse passed() {
        return new ChangePasswordResponse(ChangePasswordStatus.OK);
    }
}
