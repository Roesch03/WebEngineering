package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.StudyClass;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.IStudyClassController;
import de.digitra.uniplaner.service.StudyClassService;
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
@RequestMapping("/studyclasss")
public class StudyClassController implements IStudyClassController {

    //zusaetzlich hinzugefuegt
	@Autowired
	StudyClassService studyClassService;

    @Override
    public ResponseEntity<StudyClass> createStudyClass(StudyClass studyclass) throws BadRequestException {
        if(studyclass.getId() != null) {
			throw new BadRequestException("Studyclass gibt es bereits (Id vorhanden)");
		}
    	return ResponseEntity.ok(studyClassService.save(studyclass)); //zusätzlich studyClassService zum Speichern
    }

    @Override
    public ResponseEntity<StudyClass> updateStudyClass(StudyClass studyclass) throws BadRequestException {
        if(studyclass.getId() == null) {
			throw new BadRequestException("Studyclass gibt es noch nicht (Id nicht vorhanden)");
		}
    	return ResponseEntity.ok(studyClassService.save(studyclass));
    }

    @Override
    public ResponseEntity<StudyClass> updateStudyClass(Long id, @Valid StudyClass studyclassDetails) throws ResourceNotFoundException {
        Optional<StudyClass> optionalStudyClass = studyClassService.findOne(id);
        if(!(optionalStudyClass.isPresent())){
            throw new ResourceNotFoundException("Studyclass mit der angegebenen Id nicht gefunden");
        }
        StudyClass studyclass = optionalStudyClass.get();
        studyclass.setEndDate(studyclassDetails.getEndDate());
        studyclass.setName(studyclassDetails.getName());
        studyclass.setSemesters(studyclassDetails.getSemesters());
        studyclass.setStartDate(studyclassDetails.getStartDate());
        studyclass.setStartingYear(studyclassDetails.getStartDate().getYear());
        studyclass.setStudyProgram(studyclassDetails.getStudyProgram());
        
        return ResponseEntity.ok(studyClassService.save(studyclass));
    }

    @Override
    public ResponseEntity<List<StudyClass>> getAllstudyclasss() {
        List<StudyClass> resources = studyClassService.findAll();
        return ResponseEntity.ok(resources);
    }

    @Override
    public ResponseEntity<StudyClass> getStudyClass(Long id) throws ResourceNotFoundException {
        Optional<StudyClass> optionalStudyClass = studyClassService.findOne(id);
        if(!(optionalStudyClass.isPresent())){
            throw new ResourceNotFoundException("Studyclass mit der angegebenen Id nicht gefunden");
        }
        StudyClass studyclass = optionalStudyClass.get();
        return ResponseEntity.ok(studyclass);
    }

    @Override
    public ResponseEntity<Void> deleteStudyClass(Long id) {
        studyClassService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
