package org.fs13.twitterapp.dto.rq;

import lombok.Data;
import org.fs13.twitterapp.dto.OnUpdate;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;


@Data
public class PostRequest {
    @NotNull(groups = OnUpdate.class)
    private Long id;

    private String body;

    private MultipartFile image;
}
