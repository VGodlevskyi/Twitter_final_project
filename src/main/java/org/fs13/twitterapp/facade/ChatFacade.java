package org.fs13.twitterapp.facade;

import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rq.ChatRequest;
import org.fs13.twitterapp.dto.rq.MessageEditRequest;
import org.fs13.twitterapp.dto.rq.MessageRequest;
import org.fs13.twitterapp.dto.rs.ChatResponse;
import org.fs13.twitterapp.dto.rs.MessageResponse;
import org.fs13.twitterapp.exceptions.user.NotAuthorizedException;

import java.security.Principal;
import java.util.List;

public interface ChatFacade {
    ChatResponse getChatById(Long chatId) throws NotAuthorizedException;
    PageableResponse<ChatResponse> getChatsByUser(Principal principal, int page, int limit) throws NotAuthorizedException;
    PageableResponse<MessageResponse> getMessagesByChatId(Long chatId, int page, int limit) throws NotAuthorizedException;
    ChatResponse createChat(ChatRequest chatRequest);
    ChatResponse addMembers(Long chatId, List<Long> members) throws NotAuthorizedException;
    ChatResponse removeMembers(Long chatId, List<Long> members) throws NotAuthorizedException;
    ChatResponse saveMessage(MessageRequest dto, Principal principal) throws NotAuthorizedException;
    ChatResponse updateMessage(MessageEditRequest editRequest) throws NotAuthorizedException;
    ChatResponse removeMessage(Long messageId) throws NotAuthorizedException;
    void removeChat(Long chatId) throws NotAuthorizedException;
}
