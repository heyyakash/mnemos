package com.mnemos.backend.Utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mnemos.backend.Exception.InternalServerErrorException;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Converter(autoApply = true)
public class JsonConverter implements AttributeConverter<List<Map<String, Object>>, String> {
    private static final ObjectMapper objectmapper = new ObjectMapper();
    @Override
    public String convertToDatabaseColumn(List<Map<String, Object>> attribute){
        try{
            System.out.println("Converting to DB Col >>>>>>>>>>>>>>>>>>> " + attribute);
            if (attribute == null) {
                return "[]"; // Ensure we store a valid empty JSON array instead of null
            }
            return objectmapper.writeValueAsString(attribute);
        }catch (JsonProcessingException e){
            throw new InternalServerErrorException("Error Converting history to json");
        }
    }

    @Override
    public List<Map<String, Object>> convertToEntityAttribute(String dbData) {
        try{
            if (dbData == null || dbData.isEmpty()) {
                return new ArrayList<>(); // Return an empty list if JSON is null or empty
            }
            return objectmapper.readValue(dbData, new TypeReference<>() {});
        }catch (JsonProcessingException e){
            System.out.println("Error converting json to histroy list");
            throw  new InternalServerErrorException("Some Internal Error Occured");
        }
    }
}
