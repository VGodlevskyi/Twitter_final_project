package org.fs13.twitterapp.controller;

import org.fs13.twitterapp.dto.PageableResponse;
import org.fs13.twitterapp.dto.rq.ChatRequest;
import org.fs13.twitterapp.dto.rq.MessageEditRequest;
import org.fs13.twitterapp.dto.rq.MessageRequest;
import org.fs13.twitterapp.dto.rs.ChatResponse;
import org.fs13.twitterapp.dto.rs.MessageResponse;
import org.fs13.twitterapp.exceptions.user.NotAuthorizedException;
import org.fs13.twitterapp.facade.ChatFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.websocket.server.PathParam;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/v0/chats")
public class ChatController {
    @Autowired ChatFacade chatFacade;

    @PostMapping("/create")
    public ChatResponse createChat(@RequestBody ChatRequest chatRequest) {
        return chatFacade.createChat(chatRequest);
    }

    @DeleteMapping("/remove/{chatId}")
    public ResponseEntity<String> removeChat(@PathVariable Long chatId) {
        try {
             chatFacade.removeChat(chatId);
             return new ResponseEntity<>(
                     String.format("Chat with id %d has been successfully removed", chatId),
                     HttpStatus.OK
             );
        } catch (NotAuthorizedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }

    @GetMapping("/single/{chatId}")
    public ResponseEntity<ChatResponse> getChatById(@PathVariable Long chatId) {
        try {
            var chat = chatFacade.getChatById(chatId);
            return new ResponseEntity<>(chat, HttpStatus.OK);
        } catch (NotAuthorizedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }

    @PutMapping("/single/{chatId}")
    public ResponseEntity<ChatResponse> addChatMembers(@PathVariable Long chatId,@RequestBody List<Long> addedMembers) {
        try {
            var chat = chatFacade.addMembers(chatId, addedMembers);
            return new ResponseEntity<>(chat, HttpStatus.OK);
        } catch (NotAuthorizedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }

    @DeleteMapping("/single/{chatId}")
    public ResponseEntity<ChatResponse> removeChatMembers(@PathVariable Long chatId,@RequestBody List<Long> removedMembers) {
        try {
            var chat = chatFacade.removeMembers(chatId, removedMembers);
            return new ResponseEntity<>(chat, HttpStatus.OK);
        } catch (NotAuthorizedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<PageableResponse<ChatResponse>> getChatsByUser(Principal principal,
                                                   @PathParam("page")  int page,
                                                   @PathParam("limit") int limit) {

        try {
            var chatsResponse = chatFacade.getChatsByUser(principal, page, limit);
            return new ResponseEntity<>(chatsResponse, HttpStatus.OK);
        } catch (NotAuthorizedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }

    @GetMapping("/messages/list")
    public ResponseEntity<PageableResponse<MessageResponse>> getMessagesByChatId(
                                                @PathParam("chat") Long chat,
                                                @PathParam("page") int page,
                                                @PathParam("limit") int limit) {
        try {
            var messageResponse = chatFacade.getMessagesByChatId(chat, page, limit);
            return new ResponseEntity<>(messageResponse, HttpStatus.OK);
        } catch (NotAuthorizedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }

    @PostMapping("/message")
    public ResponseEntity<ChatResponse> saveMessage(@RequestBody MessageRequest messageRequest, Principal principal) {
        try {
            var responseBody = chatFacade.saveMessage(messageRequest, principal);
            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } catch (NotAuthorizedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }

    @PutMapping("/message")
    public ResponseEntity<ChatResponse> editMessage(@RequestBody MessageEditRequest editRequest) {
        try {
            var responseBody = chatFacade.updateMessage(editRequest);
            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } catch (NotAuthorizedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }

    @DeleteMapping("/message/{messageId}")
    public ResponseEntity<ChatResponse> deleteMessage(@PathVariable Long messageId) {
        try {
            var responseBody = chatFacade.removeMessage(messageId);
            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } catch (NotAuthorizedException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
        }
    }
}
