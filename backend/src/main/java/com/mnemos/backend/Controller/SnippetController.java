package com.mnemos.backend.Controller;

import com.mnemos.backend.Entity.Snippet;
import com.mnemos.backend.Entity.User;
import com.mnemos.backend.Exception.UnauthorizedException;
import com.mnemos.backend.Repository.UserRepository;
import com.mnemos.backend.Service.SnippetService;
import com.mnemos.backend.Utils.ResponseGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.hibernate.boot.model.process.internal.UserTypeResolution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("snippet")
public class SnippetController {
    @Autowired
    private SnippetService snippetService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getSnippet(HttpServletRequest request, @PathVariable UUID id){
        Snippet snip = snippetService.getSnippet(request, id);
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, snip, true));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNewSnippet(HttpServletRequest request, @RequestBody Map<String, String> body){
        System.out.println("In the controller");
        Optional<User> user = userRepository.findUserById(UUID.fromString(request.getAttribute("uid").toString()));
        if(user.isEmpty()){
            throw new UnauthorizedException("Unauthorized");
        }
       return snippetService.addSnippet(body.get("name"), body.get("description"), user.get(), body.get("snippet"), body.get("language"), body.get("parent_id"));
    }

    @PostMapping("/all")
    public Snippet[] getAllSnippets(@RequestBody Map<String, String> request){
        return snippetService.getSnippetsByUid(request.get("uid"));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateSnippet(@PathVariable UUID id , @RequestBody Map<String, String> request){
        return snippetService.updateSnippet(id, request.get("title"), request.get("description"), request.get("snippet"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSnippet(@PathVariable UUID id){
        return snippetService.deleteSnippet(id);
    }
}
