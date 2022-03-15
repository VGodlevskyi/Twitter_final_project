package org.fs13.twitterapp.dto.rq;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MessageEditRequest {
    private Long messageId;
    private String messageBody;
}
