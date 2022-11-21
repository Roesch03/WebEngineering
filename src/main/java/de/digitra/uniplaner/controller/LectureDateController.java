package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.LectureDate;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILectureDateController;
import de.digitra.uniplaner.service.LectureDateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    LectureDateService lectureDateService;

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.LectureDate> createLectureDate(de.digitra.uniplaner.domain.LectureDate lecturedate) throws BadRequestException {
        if(lecturedate.getId() != null){
            throw new BadRequestException("LectureDate must be NULL!")
        }
        return new ResponseEntity<>(lecturedate, HttpStatus.ACCEPTED);
    }

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.LectureDate> updateLectureDate(de.digitra.uniplaner.domain.LectureDate lecturedate) throws BadRequestException {
        if(lecturedate.getId() == null){
            throw new BadRequestException("LectureDate not must be NULL!");
        }
        return new ResponseEntity<>(lectureDateService.save(lecturedate), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.LectureDate> updateLectureDate(Long id, de.digitra.uniplaner.domain.LectureDate lecturedateDetails) throws ResourceNotFoundException {
        Optinal<LectureDate> foundLectureDate = lectureDateService.findOne(id);
        if(!foundLectureDate.isPresent()){
            throw new ResourceNotFoundException("Ressource not found!")
        }
        LectureDate target = lectureDateService.findOne(id).get();
        return new ResponseEntity<>(lectureDateService.save(target), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<de.digitra.uniplaner.domain.LectureDate>> getAlllecturedates() {
        return new ResponseEntity<>(lectureDateService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.LectureDate> getLectureDate(Long id) throws ResourceNotFoundException {
        Optinal<LectureDate> foundLectureDate = lectureDateService.findOne(id);
        if(foundLectureDate == null){
            throw new ResourceNotFoundException("Ressource not found");
        }
        return new ResponseEntity<>(foundLectureDate.get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteLectureDate(Long id) {
        lectureDateService.delete(id);
        return ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
