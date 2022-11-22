package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.StudyProgram;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.IStudyProgramController;
import de.digitra.uniplaner.service.StudyProgramService;
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
@RequestMapping("/studyprograms")
public class StudyProgramController implements IStudyProgramController {

    //zusaetzlich hinzugefuegt
	@Autowired
	StudyProgramService studyProgramService;

    @Override
    public ResponseEntity<StudyProgram> createStudyProgram(StudyProgram studyprogram) throws BadRequestException {
        if(studyprogram.getId() != null) {
			throw new BadRequestException("Studyprogram gibt es bereits (Id vorhanden)");
		}
    	return ResponseEntity.ok(studyProgramService.save(studyprogram)); //zusätzlich studyProgramService zum Speichern
    }

    @Override
    public ResponseEntity<StudyProgram> updateStudyProgram(StudyProgram studyprogram) throws BadRequestException {
        if(studyprogram.getId() == null) {
			throw new BadRequestException("Studyprogram gibt es noch nicht (Id nicht vorhanden)");
		}
    	return ResponseEntity.ok(studyProgramService.save(studyprogram));
    }

    @Override
    public ResponseEntity<StudyProgram> updateStudyProgram(Long id, @Valid StudyProgram studyprogramDetails) throws ResourceNotFoundException {
        Optional<StudyProgram> optionalStudyProgram = studyProgramService.findOne(id);
        if(!(optionalStudyProgram.isPresent())){
            throw new ResourceNotFoundException("Studyprogram mit der angegebenen Id nicht gefunden");
        }
        StudyProgram studyprogram = optionalStudyProgram.get();
        studyprogram.setLectures(studyprogramDetails.getLectures());
        studyprogram.setName(studyprogramDetails.getName());
        studyprogram.setShortName(studyprogramDetails.getShortName());
        studyprogram.setStudyClasses(studyprogramDetails.getStudyClasses());
        
        return ResponseEntity.ok(studyProgramService.save(studyprogram));
    }

    @Override
    public ResponseEntity<List<StudyProgram>> getAllstudyprograms() {
        List<StudyProgram> resources = studyProgramService.findAll();
        return ResponseEntity.ok(resources);
    }

    @Override
    public ResponseEntity<StudyProgram> getStudyProgram(Long id) throws ResourceNotFoundException {
        Optional<StudyProgram> optionalStudyProgram = studyProgramService.findOne(id);
        if(!(optionalStudyProgram.isPresent())){
            throw new ResourceNotFoundException("Studyprogram mit der angegebenen Id nicht gefunden");
        }
        StudyProgram studyProgram = optionalStudyProgram.get();
        return ResponseEntity.ok(studyProgram);
    }

    @Override
    public ResponseEntity<Void> deleteStudyProgram(Long id) {
        studyProgramService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
