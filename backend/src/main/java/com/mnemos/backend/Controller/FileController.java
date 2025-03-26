package com.mnemos.backend.Controller;


import com.mnemos.backend.Entity.User;
import com.mnemos.backend.Exception.UnauthorizedException;
import com.mnemos.backend.Repository.UserRepository;
import com.mnemos.backend.Service.FileService;
import com.mnemos.backend.Utils.ResponseGenerator;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("file")
public class FileController {
    @Autowired
    private FileService fileService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("folder_info/{id}")
    public ResponseEntity<?> getFolderInformation(HttpServletRequest request, @PathVariable String id){
        Map<String,Object> response = fileService.retrieveFolderDetails(request, id);
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, response, true));
    }

    @PostMapping("/folder")
    public ResponseEntity<?> createFolder(HttpServletRequest request,@RequestBody Map<String, String> body){
        System.out.println("body");
        System.out.println(body);
        Optional<User> user = userRepository.findUserById(UUID.fromString(request.getAttribute("uid").toString()));
        if(user.isEmpty()){
            throw new UnauthorizedException("Unauthorized");
        }
        fileService.CreateFolder(body.get("name"), body.get("description"), UUID.fromString(body.get("parent_id")), user.get());
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, "Folder created successfully", true));
    }

    @GetMapping("folder/contents/{id}")
    public ResponseEntity<?> getFolderContents(HttpServletRequest request, @PathVariable String id){
        List<Map<String, Object>> response = fileService.retrieveFolderContents(request, id);
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, response, true ));
    }
}
