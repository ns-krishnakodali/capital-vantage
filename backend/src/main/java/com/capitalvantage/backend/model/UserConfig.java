package com.capitalvantage.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.CheckConstraint;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(
        name = "user_config",
        check = @CheckConstraint(
                name = "user_config_singleton_id_check",
                constraint = "id = 1"
        )
)
public class UserConfig {

    @Id
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(name = "ai_model", nullable = false)
    private String aiModel;

    protected UserConfig() {
    }

    public UserConfig(Integer id, String name, String email, String aiModel) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.aiModel = aiModel;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAiModel() {
        return aiModel;
    }

    public void setAiModel(String aiModel) {
        this.aiModel = aiModel;
    }
}
