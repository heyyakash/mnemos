package com.mnemos.backend.Service;

import com.mnemos.backend.Entity.Snippet;
import com.mnemos.backend.Exception.InternalServerErrorException;
import com.mnemos.backend.Exception.NotFoundException;
import com.mnemos.backend.Repository.SnippetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SnippetService {
    @Autowired
    private SnippetRepository snippetRepository;

    public ResponseEntity<?> addSnippet(String title, String description, String email, String code, String language){
        try {
            System.out.println("In the try block");
            Snippet snippet = new Snippet();
            snippet.setCode(code);
            snippet.setEmail(email);
            snippet.setDescription(description);
            snippet.setTitle(title);
            snippet.setLanguage(language);
            snippetRepository.save(snippet);
            System.out.println(snippet);
            return ResponseEntity.ok("Snippet Added Successfully");
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new InternalServerErrorException(e.getMessage());
        }
    }

    public Snippet[] getSnippetByEmail(String email){
        Optional<Snippet[]> snippets = snippetRepository.findSnippetByEmail(email);
        if (snippets.isEmpty()){
            throw new NotFoundException("No Snippets found");
        }
        return snippets.get().clone();
    }
}
