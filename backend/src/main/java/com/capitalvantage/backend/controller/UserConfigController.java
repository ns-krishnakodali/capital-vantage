package com.capitalvantage.backend.controller;

import com.capitalvantage.backend.dto.request.UpsertUserConfigRequest;
import com.capitalvantage.backend.dto.response.UserConfigResponse;
import com.capitalvantage.backend.service.UserConfigService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user-config")
public class UserConfigController {

    private final UserConfigService userConfigService;

    public UserConfigController(UserConfigService userConfigService) {
        this.userConfigService = userConfigService;
    }

    @GetMapping
    public ResponseEntity<UserConfigResponse> getUserConfig() {
        return ResponseEntity.ok(userConfigService.getUserConfig());
    }

    @PutMapping
    public ResponseEntity<UserConfigResponse> upsertUserConfig(@RequestBody UpsertUserConfigRequest request) {
        return ResponseEntity.ok(userConfigService.upsertUserConfig(request));
    }
}
