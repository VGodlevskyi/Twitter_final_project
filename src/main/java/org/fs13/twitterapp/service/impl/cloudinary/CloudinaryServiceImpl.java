package org.fs13.twitterapp.service.impl.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.fs13.twitterapp.entity.Message;
import org.fs13.twitterapp.entity.Post;
import org.fs13.twitterapp.entity.user.User;
import org.fs13.twitterapp.service.api.CloudinaryService;
import org.fs13.twitterapp.service.impl.user.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    @Autowired
    private UserServiceImp userService;
    @Autowired
    private Cloudinary cloudinary;
    private final List<String> avatarFormats = List.of("png", "jpg", "jpeg", "svg", "webp");

    @Override
    public User uploadAvatar(MultipartFile file) throws IOException {

        if (!acceptableExtension(file)) {
            throw new InvalidPropertiesFormatException("appropriate file file formats: "
                    + avatarFormats.toString());
        }

        Transformation transformation = new Transformation()
                .width(200)
                .height(200)
                .crop("scale")
                .gravity("face");

        Map uploadConfig = ObjectUtils.asMap(
                "folder", "twitterapp/avatars/",
                "unique_filename", "true",
                "resource_type", "auto",
                "quality", "auto:best",
                "transformation", transformation);

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadConfig);
        User currentUser = userService.getCurrentUser();
        currentUser.setAvatarUrl((String) uploadResult.get("public_id"));
        return userService.editUserProfile(currentUser);

    }

    @Override
    public User uploadProfileBackgroud(MultipartFile file) {
        return new User();
    }

    @Override
    public Post uploadPostFile(MultipartFile file) {
        return null;
    }

    @Override
    public Message uploadMsgFile(MultipartFile file)  {
        return null;
    }

    private boolean acceptableExtension(MultipartFile file) throws NullPointerException{

        String filename = file.getOriginalFilename();
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();

        return avatarFormats.contains(extension);
    }

    @Override
    public String getUrl(MultipartFile file) throws IOException {
        if (!acceptableExtension(file)) {
            throw new InvalidPropertiesFormatException("appropriate file file formats: "
                    + avatarFormats.toString());
        }
        Transformation transformation = new Transformation()
                .width(500);

        Map uploadConfig = ObjectUtils.asMap(
                "folder", "twitterapp/twits/",
                "unique_filename", "true",
                "resource_type", "auto",
                "quality", "auto:best",
                "transformation", transformation);

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadConfig);
        return ((String) "https://res.cloudinary.com/dt6kzum95/"+uploadResult.get("public_id"));

    }
}
