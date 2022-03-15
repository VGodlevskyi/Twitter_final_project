package org.fs13.twitterapp.config.websockets;

import org.fs13.twitterapp.service.impl.auth.tokens.JwtService;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SocketChannelInterceptor implements ChannelInterceptor {
    private final JwtService jwtService;


    public SocketChannelInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            List<String> authorization = accessor.getNativeHeader("Authorization");
            String accessToken = authorization.get(0).split(" ")[1];
            UsernamePasswordAuthenticationToken authentication = jwtService.decode(accessToken);
            accessor.setUser(authentication);
        }
        return message;
    }

}
