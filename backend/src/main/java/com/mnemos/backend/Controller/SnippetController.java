package com.mnemos.backend.Controller;

import com.mnemos.backend.Entity.Snippet;
import com.mnemos.backend.Service.SnippetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("snippet")
public class SnippetController {
    @Autowired
    private SnippetService snippetService;

    @PostMapping("/create")
    public ResponseEntity<?> createNewSnippet(@RequestBody Map<String, String> request){
        System.out.println("In the controller");
       return snippetService.addSnippet(request.get("title"), request.get("description"), request.get("uid"), request.get("code"), request.get("language"));
    }

    @PostMapping("/all")
    public Snippet[] getAllSnippets(@RequestBody Map<String, String> request){
        return snippetService.getSnippetsByUid(request.get("uid"));
    }

    @PutMapping("/update/{id}")
    public Snippet updateSnippet(@PathVariable UUID id , @RequestBody Map<String, String> request){
        return snippetService.updateSnippet(id, request.get("title"), request.get("description"), request.get("code"), request.get("language"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSnippet(@PathVariable UUID id){
        return snippetService.deleteSnippet(id);
    }
}
