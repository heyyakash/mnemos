package com.mnemos.backend.Service;

import com.mnemos.backend.Entity.File;
import com.mnemos.backend.Entity.Snippet;
import com.mnemos.backend.Entity.User;
import com.mnemos.backend.Exception.InternalServerErrorException;
import com.mnemos.backend.Exception.NotFoundException;
import com.mnemos.backend.Exception.UnauthorizedException;
import com.mnemos.backend.Repository.FileRepository;
import com.mnemos.backend.Repository.SnippetRepository;
import com.mnemos.backend.Utils.ResponseGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class SnippetService {
    @Autowired
    private SnippetRepository snippetRepository;


    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @Autowired
    private FileRepository fileRepository;

    public Snippet getSnippet(HttpServletRequest request, UUID id){
        try{
            String uid = request.getAttribute("uid").toString();
            Optional<Snippet> snippet= snippetRepository.findSnippetByIdAndUid(id,uid );
            if(snippet.isEmpty()) throw new NotFoundException("Snippet Not Found");
            return snippet.get();
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new InternalServerErrorException("Some Internal error occured");
        }
    }

    public ResponseEntity<?> addSnippet(String title, String description, User user, String code, String language, String sparent_id){
        try {
            UUID parent_id = UUID.fromString(sparent_id);

            boolean isParent = fileService.doesFolderBelongToUser(parent_id, user.getId());
            if(!isParent) throw new UnauthorizedException("Unauthorized");

            Snippet snippet = new Snippet();
            snippet.setCode(code);
            snippet.setUid(user.getId().toString());
            snippet.setDescription(description);
            snippet.setTitle(title);
            snippet.setLanguage(language);
            Snippet snip = snippetRepository.save(snippet);
            fileService.createFile(title, description, parent_id, snip, language, user );
            System.out.println(snippet);
            return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, "Snippet saved successfully", true ));
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new InternalServerErrorException(e.getMessage());
        }
    }

    public Snippet[] getSnippetsByUid(String email){
        Optional<Snippet[]> snippets = snippetRepository.findSnippetByUid(email);
        if (snippets.isEmpty()){
            throw new NotFoundException("No Snippets found");
        }
        return snippets.get().clone();
    }

    public ResponseEntity<?> updateSnippet(UUID id, String title, String description, String code){
        Optional<Snippet> snippet = snippetRepository.findById(id);
        Optional<File> file = fileRepository.findFileBySnippetId(id);
        if(snippet.isEmpty() || file.isEmpty()){
            throw new NotFoundException("Snippet does not exist");
        }
        File oldFile = file.get();
        Snippet oldSnip = snippet.get();

        System.out.println("In the onUpdate");
        if(oldSnip.getCode() != null && !oldSnip.getCode().equals(code)){
            Map<String, Object> oldVersion = Map.of(
                    "code", oldSnip.getCode(),
                    "version", oldSnip.getVersion(),
                    "updatedAt", oldSnip.getUpdatedAt()
            );
            oldSnip.setVersion(oldSnip.getVersion() + 1);
            oldSnip.getHistory().add(oldVersion);
        }
        oldSnip.setUpdatedAt(System.currentTimeMillis() / 1000);
        oldSnip.setTitle(title);
        oldFile.setName(title);
        oldSnip.setDescription(description);
        oldFile.setDescription(description);
        oldSnip.setCode(code);
        fileRepository.save(oldFile);
        snippetRepository.save(oldSnip);
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, "Snippet updated successfully", true));
    }

    public ResponseEntity<?> deleteSnippet(UUID id){
        Optional<Snippet> snippet = snippetRepository.findById(id);
        if(snippet.isEmpty()){
            throw new NotFoundException("Snippet does not exist");
        }
        snippetRepository.deleteById(id);
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, "Snippet deleted successfully", true));
    }

}
