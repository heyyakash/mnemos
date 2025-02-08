package com.mnemos.backend.Service;

import com.mnemos.backend.Entity.Snippet;
import com.mnemos.backend.Exception.InternalServerErrorException;
import com.mnemos.backend.Exception.NotFoundException;
import com.mnemos.backend.Repository.SnippetRepository;
import com.mnemos.backend.Utils.ResponseGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class SnippetService {
    @Autowired
    private SnippetRepository snippetRepository;

    @Autowired
    private ResponseGenerator responseGenerator;

    public ResponseEntity<?> addSnippet(String title, String description, String uid, String code, String language){
        try {
            Snippet snippet = new Snippet();
            snippet.setCode(code);
            snippet.setUid(uid);
            snippet.setDescription(description);
            snippet.setTitle(title);
            snippet.setLanguage(language);
            snippetRepository.save(snippet);
            System.out.println(snippet);
            return ResponseEntity.ok(responseGenerator.generateResponse(HttpStatus.OK, "Snippet added successfully", true));
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

    public Snippet updateSnippet(UUID id, String title, String description, String code, String language){
        Optional<Snippet> snippet = snippetRepository.findById(id);
        if(snippet.isEmpty()){
            throw new NotFoundException("Snippet does not exist");
        }
        Snippet oldSnip = snippet.get();
        oldSnip.setTitle(title);
        oldSnip.setDescription(description);
        oldSnip.setCode(code);
        oldSnip.setLanguage(language);
        return snippetRepository.save(oldSnip);
    }

    public ResponseEntity<?> deleteSnippet(UUID id){
        Optional<Snippet> snippet = snippetRepository.findById(id);
        if(snippet.isEmpty()){
            throw new NotFoundException("Snippet does not exist");
        }
        snippetRepository.deleteById(id);
        return ResponseEntity.ok(responseGenerator.generateResponse(HttpStatus.OK, "Snippet deleted successfully", true));
    }

}
