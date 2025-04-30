package com.mnemos.backend.Service;


import com.mnemos.backend.Entity.Label;
import com.mnemos.backend.Repository.LabelRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LabelService {
    @Autowired
    private LabelRepository labelRepository;

    public Label CreateLabel(HttpServletRequest request, String name, String colour){
        UUID createdBy =  UUID.fromString(request.getAttribute("uid").toString());
        Label label = new Label();
        label.setColour(colour);
        label.setCreatedBy(createdBy);
        label.setName(name);
        return labelRepository.save(label);
    }

    public List<Label> GetLabelByUser(HttpServletRequest request){
        UUID createdBy =  UUID.fromString(request.getAttribute("uid").toString());
        Optional<List<Label>> labels = labelRepository.findLabelByCreatedBy(createdBy);
        return labels.get();
    }
}
