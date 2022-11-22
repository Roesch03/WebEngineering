package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.LectureDate;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILectureDateController;
import de.digitra.uniplaner.service.LectureDateService;
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
@RequestMapping("/lecturedates")
public class LectureDateController implements ILectureDateController {

    //zusaetzlich hinzugefuegt
	@Autowired
	LectureDateService lectureDateService;

    @Override
    public ResponseEntity<LectureDate> createLectureDate(LectureDate lecturedate) throws BadRequestException {
        if(lecturedate.getId() != null) {
			throw new BadRequestException("Lecturedate gibt es bereits (Id vorhanden)");
		}
    	return ResponseEntity.ok(lectureDateService.save(lecturedate)); //zusätzlich lectureDateService zum Speichern
    }

    @Override
    public ResponseEntity<LectureDate> updateLectureDate(LectureDate lecturedate) throws BadRequestException {
        if(lecturedate.getId() == null) {
			throw new BadRequestException("Lecturedate gibt es noch nicht (Id nicht vorhanden)");
		}
    	return ResponseEntity.ok(lectureDateService.save(lecturedate));
    }

    @Override
    public ResponseEntity<LectureDate> updateLectureDate(Long id, @Valid LectureDate lecturedateDetails) throws ResourceNotFoundException {
        Optional<LectureDate> optionalLectureDate = lectureDateService.findOne(id);
        if(!(optionalLectureDate.isPresent())){
            throw new ResourceNotFoundException("Lecturedate mit der angegebenen Id nicht gefunden");
        }
        LectureDate lecturedate = optionalLectureDate.get();
        lecturedate.setEndDate(lecturedateDetails.getEndDate());
        lecturedate.setLecture(lecturedateDetails.getLecture());
        lecturedate.setLecturer(lecturedateDetails.getLecturer());
        lecturedate.setSemester(lecturedateDetails.getSemester());
        lecturedate.setStartDate(lecturedateDetails.getStartDate());
        
        return ResponseEntity.ok(lectureDateService.save(lecturedate));
    }

    @Override
    public ResponseEntity<List<LectureDate>> getAlllecturedates() {
        List<LectureDate> resources = lectureDateService.findAll();
        return ResponseEntity.ok(resources);
    }

    @Override
    public ResponseEntity<LectureDate> getLectureDate(Long id) throws ResourceNotFoundException {
        Optional<LectureDate> optionalLectureDate = lectureDateService.findOne(id);
        if(!(optionalLectureDate.isPresent())){
            throw new ResourceNotFoundException("Lecturedate mit der angegebenen Id nicht gefunden");
        }
        LectureDate lecturedate = optionalLectureDate.get();
        return ResponseEntity.ok(lecturedate);
    }

    @Override
    public ResponseEntity<Void> deleteLectureDate(Long id) {
        lectureDateService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
