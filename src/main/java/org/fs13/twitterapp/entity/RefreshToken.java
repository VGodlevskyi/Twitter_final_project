package org.fs13.twitterapp.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_refresh_tokens")
public class RefreshToken extends BaseEntity {
    @Column(name = "token")
    private String token;
}
