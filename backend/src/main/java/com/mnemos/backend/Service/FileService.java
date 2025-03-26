package com.mnemos.backend.Service;


import com.mnemos.backend.Entity.File;
import com.mnemos.backend.Entity.Snippet;
import com.mnemos.backend.Entity.User;
import com.mnemos.backend.Exception.NotFoundException;
import com.mnemos.backend.Exception.UnauthorizedException;
import com.mnemos.backend.Repository.FileRepository;
import com.mnemos.backend.Utils.ResponseGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;

    public File CreateFolder(String name, String description, UUID parent_id, User user){
        File folder = new File();
        folder.setName(name);
        folder.setFolder(true);
        folder.setDescription(description);
        folder.setRoot(false);
        folder.setParent(parent_id!=null? fileRepository.findById(parent_id).orElse(null): null);
        folder.setOwner(user);
        return fileRepository.save(folder);
    }

    public File CreateRootFolder(String name, String description,UUID parent_id, User user){
        File folder = new File();
        folder.setName(name);
        folder.setFolder(true);
        folder.setDescription(description);
        folder.setRoot(true);
        folder.setParent(parent_id!=null? fileRepository.findById(parent_id).orElse(null): null);
        folder.setOwner(user);
        return fileRepository.save(folder);
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

    public void retrieveRoot(HttpServletRequest request){
        String suid = request.getAttribute("uid").toString();
        UUID uuid = UUID.fromString(suid);

    }

    public Map<String, Object> retrieveFolderDetails(HttpServletRequest request, String sid){
        UUID id = UUID.fromString(sid);
        UUID uid = UUID.fromString(request.getAttribute("uid").toString());

        Optional<File> folder = fileRepository.findFolderByIdandUID(id, uid);
        if(folder.isEmpty()){
            throw new NotFoundException("Unauthorized");
        }
        Map<String, Object> response = new HashMap<>();
        response.put("name", folder.get().getName());
        response.put("id", folder.get().getId());
        return response;
    }

    public void deleteFile(UUID id){
        fileRepository.deleteById(id);
    }

    public  List<Map<String, Object>>  retrieveFolderContents(HttpServletRequest request, String sparent_id){
        UUID parent_id = UUID.fromString(sparent_id);
        UUID uid = UUID.fromString(request.getAttribute("uid").toString());

        List<File> files = fileRepository.findFilesByFolderId(parent_id, uid);
        List<Map<String, Object>> list = new ArrayList<>();
        for(File file: files){
            Map<String, Object> fileObject = new HashMap<>();
            fileObject.put("name", file.getName());
            fileObject.put("description", file.getDescription());
            fileObject.put("createdAt", file.getCreatedAt());
            fileObject.put("id", file.getId());
            fileObject.put("language", file.getLanguage());
            fileObject.put("isFolder", file.getFolder());
            list.add(fileObject);
        }

        return list;

    }

}
