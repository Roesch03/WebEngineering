package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Lecture;
import de.digitra.uniplaner.domain.LectureDate;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILectureController;
import de.digitra.uniplaner.service.LectureService;
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
@RequestMapping("/lectures")
public class LectureController implements ILectureController {
	
	//zusaetzlich hinzugefuegt
	@Autowired
	LectureService lectureService;
	
	@Override
    public ResponseEntity<Lecture> createLecture(Lecture lecture) throws BadRequestException{
		if(lecture.getId() != null) {
			throw new BadRequestException("Lecture gibt es bereits (Id vorhanden)");
		}
    	return ResponseEntity.ok(lectureService.save(lecture)); //zusätzlich lectureService zum Speichern
    }

    @Override
    public ResponseEntity<Lecture> updateLecture(Lecture lecture) throws BadRequestException{
        if(lecture.getId() == null) {
			throw new BadRequestException("Lecture gibt es noch nicht (Id nicht vorhanden)");
		}
    	return ResponseEntity.ok(lectureService.save(lecture));
    }

    @Override
    public ResponseEntity<Lecture> updateLecture(Long id, @Valid Lecture lectureDetails) throws ResourceNotFoundException {
        Optional<Lecture> optionalLecture = lectureService.findOne(id);
        if(!(optionalLecture.isPresent())){
            throw new ResourceNotFoundException("Lecture mit der angegebenen Id nicht gefunden");
        }
        Lecture lecture = optionalLecture.get();
        lecture.setDuration(lectureDetails.getDuration());
        lecture.setLectureDates(lectureDetails.getLectureDates());
        lecture.setLectureName(lectureDetails.getLectureName());
        lecture.setLecturers(lectureDetails.getLecturers());
        lecture.setModulName(lectureDetails.getModulName());
        lecture.setStudyProgram(lectureDetails.getStudyProgram());
        lecture.setStudyProgramm(lectureDetails.getStudyProgramm());
        
        return ResponseEntity.ok(lectureService.save(lecture));
    }

    @Override
    public ResponseEntity<List<Lecture>> getAlllectures() {
        List<Lecture> resources = lectureService.findAll();
        return ResponseEntity.ok(resources);
    }

    @Override
    public ResponseEntity<Lecture> getLecture(Long id) throws ResourceNotFoundException {
        Optional<Lecture> optionalLecture = lectureService.findOne(id);
        if(!(optionalLecture.isPresent())){
            throw new ResourceNotFoundException("Lecture mit der angegebenen Id nicht gefunden");
        }
        Lecture lecture = optionalLecture.get();
        return ResponseEntity.ok(lecture);
    }

    @Override
    public ResponseEntity<Void> deleteLecture(Long id) {
        lectureService.delete(id);
        return ResponseEntity.noContent().build();
    }

    
}
