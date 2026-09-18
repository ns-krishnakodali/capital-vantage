package com.capitalvantage.backend.dto.request;

public record UpsertUserConfigRequest(
        String name,
        String email,
        String aiModel
) {
}
