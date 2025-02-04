    package com.mnemos.backend.Entity;

    import com.fasterxml.jackson.core.JsonProcessingException;
    import com.fasterxml.jackson.core.type.TypeReference;
    import com.fasterxml.jackson.databind.JsonNode;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import com.mnemos.backend.Utils.JsonConverter;
    import jakarta.persistence.*;
    import org.hibernate.annotations.JdbcTypeCode;
    import org.hibernate.type.SqlTypes;

    import java.lang.reflect.Type;
    import java.time.LocalDateTime;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    @Entity
    @Table(name = "snippets")
    public class Snippet {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        private String title;
        private String description;

        @Column(columnDefinition = "TEXT")
        private String code;

        private Integer version = 1;

        @Column(columnDefinition = "JSONB")
        @JdbcTypeCode(SqlTypes.JSON)
        private List<Map<String, Object>> history = List.of();

        private float[] vector;

        private String email;


        private String language;

        private LocalDateTime updatedAt = LocalDateTime.now();
        private LocalDateTime createdAt = LocalDateTime.now();
        

        @PreUpdate
        public void onUpdate() throws JsonProcessingException {
            Map<String, Object> oldVersion = Map.of(
                    "title", this.title,
                    "description", this.description,
                    "code", this.code,
                    "version", this.version,
                    "language", this.language,
                    "updatedAt", this.updatedAt
            );

            history.add(oldVersion);
            this.version+=1;
            this.updatedAt = LocalDateTime.now();
        }
        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public float[] getVector() {
            return vector;
        }

        public void setVector(float[] vector) {
            this.vector = vector;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getLanguage() {
            return language;
        }

        public void setLanguage(String language) {
            this.language = language;
        }

        public Integer getVersion() {
            return version;
        }

        public void setVersion(Integer version) {
            this.version = version;
        }

        public LocalDateTime getUpdatedAt() {
            return updatedAt;
        }

        public void setUpdatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
        }

        public List<Map<String, Object>> getHistory() {
            return history;
        }

        public void setHistory(List<Map<String, Object>> history) {
            this.history = history;
        }
    }
