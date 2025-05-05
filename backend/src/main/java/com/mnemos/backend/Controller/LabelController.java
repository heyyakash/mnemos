package com.mnemos.backend.Controller;

import com.mnemos.backend.Entity.Label;
import com.mnemos.backend.Service.LabelService;
import com.mnemos.backend.Utils.ResponseGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("label")
public class LabelController {

    @Autowired
    private LabelService labelService;

    @PostMapping("create")
    public ResponseEntity<?> createLabel(HttpServletRequest request, @RequestBody Map<String, String> body){
        Label label = labelService.CreateLabel(request, body.get("name"), body.get("colour"));
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, label, true));
    }

    @GetMapping("user")
    public ResponseEntity<?> getUserLabel(HttpServletRequest request){
        List<Label> labels = labelService.GetLabelByUser(request);
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, labels, true));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getLabelById(HttpServletRequest request, @PathVariable UUID id){
        Label label = labelService.GetLabelById(request, id);
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, label, true));
    }

}
