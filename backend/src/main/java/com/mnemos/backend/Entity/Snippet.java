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
    import java.util.*;

    @Entity
    @Table(name = "snippets")
    public class Snippet {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        @Column(nullable = false, updatable = false)
        private UUID id;

        private String title;
        private String description;

        @Column(columnDefinition = "TEXT")
        private String code;

        private Integer version = 1;

        @Column(columnDefinition = "JSONB")
        @JdbcTypeCode(SqlTypes.JSON)
        private List<Map<String, Object>> history = new ArrayList<>();

        private float[] vector;

        private String uid;


        private String language;
        private Boolean isArchived = false;


        private Long createdAt;
        private Long updatedAt;

        private Boolean isBoolean = false;

        private List<UUID> labels = new ArrayList<>();

        @PrePersist
        protected void onCreate(){
            long now = System.currentTimeMillis()/1000;
            this.createdAt = now;
            this.updatedAt = now;
        }


        @PreUpdate
        public void onUpdate() throws JsonProcessingException {
            System.out.println("In the onUpdate");
            Map<String, Object> oldVersion = Map.of(
                    "code", this.code,
                    "version", this.version,
                    "language", this.language,
                    "updatedAt", this.updatedAt
            );
            System.out.println(oldVersion);
            history.add(oldVersion);
            System.out.println(history);
            this.version+=1;
            this.updatedAt = System.currentTimeMillis() / 1000;
        }
        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
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

        public String getUid() {
            return uid;
        }

        public void setUid(String uid) {
            this.uid = uid;
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

        public Long getUpdatedAt() {
            return updatedAt;
        }

        public void setUpdatedAt(Long updatedAt) {
            this.updatedAt = updatedAt;
        }

        public Long getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(Long createdAt) {
            this.createdAt = createdAt;
        }

        public List<Map<String, Object>> getHistory() {
            return history;
        }

        public void setHistory(List<Map<String, Object>> history) {
            this.history = history;
        }

        public Boolean getBoolean() {
            return isBoolean;
        }

        public void setBoolean(Boolean aBoolean) {
            isBoolean = aBoolean;
        }

        public List<UUID> getLabels() {
            return labels;
        }

        public void setLabels(List<UUID> labels) {
            this.labels = labels;
        }

        public Boolean getArchived() {
            return isArchived;
        }

        public void setArchived(Boolean archived) {
            isArchived = archived;
        }

    }
