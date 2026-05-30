package com.capitalvantage.backend.dto.response;

public record UserConfigResponse(
        String name,
        String email,
        String aiModel
) {
}
