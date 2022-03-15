package org.fs13.twitterapp.dto.rs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.*;

@Data
@AllArgsConstructor
public class ValidationErrorResponse {
    private List<Violation> violations;
}