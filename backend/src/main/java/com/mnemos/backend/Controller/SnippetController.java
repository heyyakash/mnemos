package com.mnemos.backend.Controller;

import com.mnemos.backend.Entity.Snippet;
import com.mnemos.backend.Service.SnippetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("snippet")
public class SnippetController {
    @Autowired
    private SnippetService snippetService;

    @PostMapping("/create")
    public ResponseEntity<?> createNewSnippet(@RequestBody Map<String, String> request){
        System.out.println("In the controller");
       return snippetService.addSnippet(request.get("title"), request.get("description"), request.get("email"), request.get("code"), request.get("language"));
    }

    @PostMapping("/all")
    public Snippet[] getAllSnippets(@RequestBody Map<String, String> request){
        return snippetService.getSnippetByEmail(request.get("email"));
    }

    @PutMapping("/update/{id}")
    public Snippet updateSnippet(@PathVariable Long id ,@RequestBody Map<String, String> request){
        return snippetService.updateSnippet(id, request.get("title"), request.get("description"), request.get("code"), request.get("language"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSnippet(@PathVariable Long id){
        return snippetService.deleteSnippet(id);
    }
}
