package org.fs13.twitterapp.controller;

import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.facade.UserFacade;
import org.fs13.twitterapp.service.api.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/v0/upload")
public class CloudinaryController {

    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    UserFacade userFacade;

    @PostMapping("/avatar")
    public String setAvatar(@RequestBody MultipartFile imageFile) throws IOException {
        User u =  cloudinaryService.uploadAvatar(imageFile);
        return u.getAvatarUrl();
    }

    @PostMapping("/twit_img")
    public String setTwit(@RequestBody MultipartFile imageFile) throws IOException {
        Post p =  cloudinaryService.uploadPostFile(imageFile);
        return p.getImgTwitUrl();
    }
}
