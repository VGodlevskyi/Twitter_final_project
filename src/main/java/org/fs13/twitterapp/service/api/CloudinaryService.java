package org.fs13.twitterapp.service.api;

import org.fs13.twitterapp.entity.Message;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.InvalidPropertiesFormatException;


public interface CloudinaryService {
    User uploadAvatar(MultipartFile file) throws IOException;
    User uploadProfileBackgroud(MultipartFile file);
    Post uploadPostFile(MultipartFile file);
    Message uploadMsgFile(MultipartFile file);
    String getUrl(MultipartFile file) throws InvalidPropertiesFormatException, IOException;
}
