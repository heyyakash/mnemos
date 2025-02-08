package com.mnemos.backend.Service;


import com.mnemos.backend.Entity.File;
import com.mnemos.backend.Entity.Snippet;
import com.mnemos.backend.Entity.User;
import com.mnemos.backend.Repository.FileRepository;
import com.mnemos.backend.Utils.ResponseGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;

    public ResponseEntity<?> CreateFolder(String name, UUID parent_id, User user){
        File folder = new File();
        folder.setName(name);
        folder.setFolder(true);
        folder.setParent(parent_id!=null? fileRepository.findById(parent_id).orElse(null): null);
        folder.setOwner(user);
        fileRepository.save(folder);
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, "Folder created successfully", true));
    }

    public File createFile(String name, UUID parentId, Snippet snippet, User owner) {
        File file = new File();
        file.setName(name);
        file.setFolder(false);
        file.setParent(parentId != null ? fileRepository.findById(parentId).orElse(null) : null);
        file.setSnippet(snippet);
        file.setOwner(owner);
        return fileRepository.save(file);
    }

    public void deleteFile(UUID id){
        fileRepository.deleteById(id);
    }

}
