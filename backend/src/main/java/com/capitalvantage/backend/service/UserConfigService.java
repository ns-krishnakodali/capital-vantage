package com.capitalvantage.backend.service;

import com.capitalvantage.backend.dto.request.UpsertUserConfigRequest;
import com.capitalvantage.backend.dto.response.UserConfigResponse;
import com.capitalvantage.backend.dto.response.UserNameResponse;
import com.capitalvantage.backend.exception.InvalidUserConfigException;
import com.capitalvantage.backend.exception.UserConfigIntegrityException;
import com.capitalvantage.backend.exception.UserConfigNotFoundException;
import com.capitalvantage.backend.model.UserConfig;
import com.capitalvantage.backend.repository.UserConfigRepository;
import org.springframework.stereotype.Service;

@Service
public class UserConfigService {

    private static final Integer USER_CONFIG_ID = 1;

    private final UserConfigRepository userConfigRepository;

    public UserConfigService(UserConfigRepository userConfigRepository) {
        this.userConfigRepository = userConfigRepository;
    }

    public UserConfigResponse getUserConfig() {
        UserConfig userConfig = getExistingUserConfig();
        return toResponse(userConfig);
    }

    public UserNameResponse getUserName() {
        UserConfig userConfig = getExistingUserConfig();
        return new UserNameResponse(userConfig.getName());
    }

    public UserConfigResponse upsertUserConfig(UpsertUserConfigRequest request) {
        String name = requireNonBlank(request.name(), "name");
        String email = requireNonBlank(request.email(), "email");
        String aiModel = requireNonBlank(request.aiModel(), "aiModel");

        long count = userConfigRepository.count();
        if (count > 1) {
            throw new UserConfigIntegrityException("Multiple user configuration rows found.");
        }

        UserConfig userConfig = userConfigRepository.findById(USER_CONFIG_ID)
                .orElseGet(() -> {
                    if (count == 1) {
                        throw new UserConfigIntegrityException("User configuration must use the fixed ID 1.");
                    }
                    return new UserConfig(USER_CONFIG_ID, name, email, aiModel);
                });

        userConfig.setName(name);
        userConfig.setEmail(email);
        userConfig.setAiModel(aiModel);

        UserConfig savedUserConfig = userConfigRepository.save(userConfig);
        return toResponse(savedUserConfig);
    }

    private UserConfig getExistingUserConfig() {
        long count = userConfigRepository.count();
        if (count == 0) {
            throw new UserConfigNotFoundException("User configuration not found.");
        }
        if (count > 1) {
            throw new UserConfigIntegrityException("Multiple user configuration rows found.");
        }

        UserConfig userConfig = userConfigRepository.findById(USER_CONFIG_ID)
                .orElseThrow(() -> new UserConfigIntegrityException("User configuration must use the fixed ID 1."));
        return userConfig;
    }

    private UserConfigResponse toResponse(UserConfig userConfig) {
        return new UserConfigResponse(
                userConfig.getName(),
                userConfig.getEmail(),
                userConfig.getAiModel()
        );
    }

    private String requireNonBlank(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new InvalidUserConfigException(fieldName + " is required.");
        }
        return value.trim();
    }
}
