package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Lecturer;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.DuplicateEmailException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILecturerController;
import de.digitra.uniplaner.service.LecturerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired; //zusaetzlich hinzugefuegt
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/lecturers")
public class LecturerController implements ILecturerController {

    //zusaetzlich hinzugefuegt
	@Autowired
	LecturerService lecturerService;

    @Override
    public ResponseEntity<Lecturer> createLecturer(Lecturer lecturer) throws BadRequestException, DuplicateEmailException {
        if(lecturer.getId() != null) {
			throw new BadRequestException("Lecturer gibt es bereits (Id vorhanden)");
		}
        String email = lecturer.getEmail();
        if(!(lecturerService.findByEmail(email).isEmpty())){
            throw new DuplicateEmailException("E-Mail wird bereits von einem anderen Lecturer im System verwendet");
        }
    	return ResponseEntity.ok(lecturerService.save(lecturer)); //zusätzlich lecturerService zum Speichern
    }

    @Override
    public ResponseEntity<Lecturer> updateLecturer(Lecturer lecturer) throws BadRequestException {
        if(lecturer.getId() == null) {
			throw new BadRequestException("Lecturer gibt es noch nicht (Id nicht vorhanden)");
		}
    	return ResponseEntity.ok(lecturerService.save(lecturer));
    }

    @Override
    public ResponseEntity<Lecturer> updateLecturer(Long id, @Valid Lecturer lecturerDetails) throws ResourceNotFoundException {
        Optional<Lecturer> optionalLecturer = lecturerService.findOne(id);
        if(!(optionalLecturer.isPresent())){
            throw new ResourceNotFoundException("Lecturer mit der angegebenen Id nicht gefunden");
        }
        Lecturer lecturer = optionalLecturer.get();
        lecturer.setEmail(lecturerDetails.getEmail());
        lecturer.setFirstName(lecturerDetails.getFirstName());
        lecturer.setLastName(lecturerDetails.getLastName());
        lecturer.setLectureDates(lecturerDetails.getLectureDates());
        lecturer.setLectures(lecturerDetails.getLectures());
        lecturer.setStudyProgram(lecturerDetails.getStudyProgram());
        
        return ResponseEntity.ok(lecturerService.save(lecturer));
    }

    @Override
    public ResponseEntity<List<Lecturer>> getAlllecturers() {
        List<Lecturer> resources = lecturerService.findAll();
        return ResponseEntity.ok(resources);
    }

    @Override
    public ResponseEntity<Lecturer> getLecturer(Long id) throws ResourceNotFoundException {
        Optional<Lecturer> optionalLecturer = lecturerService.findOne(id);
        if(!(optionalLecturer.isPresent())){
            throw new ResourceNotFoundException("Lecturer mit der angegebenen Id nicht gefunden");
        }
        Lecturer lecturer = optionalLecturer.get();
        return ResponseEntity.ok(lecturer);
    }

    @Override
    public ResponseEntity<Void> deleteLecturer(Long id) {
        lecturerService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
