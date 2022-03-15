package org.fs13.twitterapp.dto.rs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatResponse {
    private Long chatId;
    private Long initiatorId;
    private Set<UserResponse> chatMembers;
    private Set<MessageResponse> messages;
}
