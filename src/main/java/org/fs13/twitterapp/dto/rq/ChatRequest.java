package org.fs13.twitterapp.dto.rq;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class ChatRequest {
    Long initiatorId;
    List<Long> memberIds;

    public List<Long> getMemberIds() {
        this.memberIds.add(initiatorId);
        return memberIds;
    }

    public Long getInitiatorId() {
        return initiatorId;
    }

    public void setInitiatorId(Long initiatorId) {
        this.initiatorId = initiatorId;
    }

    public void setMemberIds(List<Long> memberIds) {
        this.memberIds = memberIds;
    }
}
