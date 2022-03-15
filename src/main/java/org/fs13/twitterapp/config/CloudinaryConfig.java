package org.fs13.twitterapp.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.util.HashMap;

@Configuration
@PropertySource("classpath:cloudinary.properties")
public class CloudinaryConfig {
    @Value("${api-key}")
    private String apiKey;

    @Value("${api-secret}")
    private String apiSecret;

    @Value("${cloud-name}")
    private String cloudName;


    @Bean
    public Cloudinary getConfigured() {
        return new Cloudinary(new HashMap<>() {{
            put("api_key", apiKey);
            put("api_secret", apiSecret);
            put("cloud_name", cloudName);
        }});
    }
}
