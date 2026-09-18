package com.capitalvantage.backend.controller;

import com.capitalvantage.backend.dto.request.UpsertUserConfigRequest;
import com.capitalvantage.backend.dto.response.UserConfigResponse;
import com.capitalvantage.backend.dto.response.UserNameResponse;
import com.capitalvantage.backend.exception.GlobalExceptionHandler;
import com.capitalvantage.backend.exception.UserConfigNotFoundException;
import com.capitalvantage.backend.service.UserConfigService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class UserConfigControllerTest {

    private MockMvc mockMvc;
    private StubUserConfigService userConfigService;

    @BeforeEach
    void setUp() {
        userConfigService = new StubUserConfigService();
        mockMvc = MockMvcBuilders
                .standaloneSetup(new UserConfigController(userConfigService))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void shouldReturnUserConfig() throws Exception {
        userConfigService.getResponse = new UserConfigResponse("Jane Doe", "jane@example.com", "gpt-4.1");

        mockMvc.perform(get("/api/user-config"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("Jane Doe"))
                .andExpect(jsonPath("$.email").value("jane@example.com"))
                .andExpect(jsonPath("$.aiModel").value("gpt-4.1"));
    }

    @Test
    void shouldReturnUserName() throws Exception {
        userConfigService.nameResponse = new UserNameResponse("Jane Doe");

        mockMvc.perform(get("/api/user-config/name"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("Jane Doe"));
    }

    @Test
    void shouldReturnNotFoundWhenUserConfigDoesNotExist() throws Exception {
        userConfigService.getException = new UserConfigNotFoundException("User configuration not found.");

        mockMvc.perform(get("/api/user-config"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("User configuration not found."));
    }

    @Test
    void shouldUpsertUserConfig() throws Exception {
        userConfigService.putResponse = new UserConfigResponse("Jane Doe", "jane@example.com", "gpt-4.1");

        mockMvc.perform(put("/api/user-config")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Jane Doe",
                                  "email": "jane@example.com",
                                  "aiModel": "gpt-4.1"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("Jane Doe"))
                .andExpect(jsonPath("$.email").value("jane@example.com"))
                .andExpect(jsonPath("$.aiModel").value("gpt-4.1"));
        org.junit.jupiter.api.Assertions.assertEquals(
                new UpsertUserConfigRequest("Jane Doe", "jane@example.com", "gpt-4.1"),
                userConfigService.lastRequest
        );
    }

    private static class StubUserConfigService extends UserConfigService {
        private UserConfigResponse getResponse;
        private UserNameResponse nameResponse;
        private RuntimeException getException;
        private UserConfigResponse putResponse;
        private RuntimeException putException;
        private UpsertUserConfigRequest lastRequest;

        private StubUserConfigService() {
            super(null);
        }

        @Override
        public UserConfigResponse getUserConfig() {
            if (getException != null) {
                throw getException;
            }
            return getResponse;
        }

        @Override
        public UserNameResponse getUserName() {
            if (getException != null) {
                throw getException;
            }
            return nameResponse;
        }

        @Override
        public UserConfigResponse upsertUserConfig(UpsertUserConfigRequest request) {
            lastRequest = request;
            if (putException != null) {
                throw putException;
            }
            return putResponse;
        }
    }
}
