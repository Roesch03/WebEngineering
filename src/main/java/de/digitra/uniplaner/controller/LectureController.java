package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Lecture;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ILectureController;
import de.digitra.uniplaner.interfaces.ILectureService;
import de.digitra.uniplaner.service.LectureService;
import de.digitra.uniplaner.service.LecturerService;
import net.bytebuddy.dynamic.DynamicType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private ILectureService lectureService;

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> createLecture(de.digitra.uniplaner.domain.Lecture lecture) throws BadRequestException {
        if(lecture.getId() != null){
            throw new BadRequestException("Lecture ID must be NULL");
        }

        return new ResponseEntity<>(lecture, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> updateLecture(de.digitra.uniplaner.domain.Lecture lecture) throws BadRequestException {
        if(Lecture.getID() == null){
            throw new BadRequestException("Lecture ID must be NULL");
        }
        return new ResponseEntity<>(lectureService.save(lecture), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> updateLecture(Long id, de.digitra.uniplaner.domain.Lecture lectureDetails) throws ResourceNotFoundException {
        Optinal<Lecture> foundLecture = lectureService.findOne(id);
        if(!foundLecture.isPresent()){
            throw new ResourceNotFoundException("Resource not found!");
        }
        Lecture target = lectureService.findOne(id).get();
        return new ResponseEntity<>(lectureService.save(target), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<de.digitra.uniplaner.domain.Lecture>> getAlllectures() {
        return new ResponseEntity<>(lectureService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<de.digitra.uniplaner.domain.Lecture> getLecture(Long id) throws ResourceNotFoundException {
        Optinal<Lecture> foundLecture = lectureService.findOne(id);
        if(foundLecture == null){
            throw new ResourceNotFoundException("Ressource not found!");
        }
        return new ResponseEntity<>(foundLecture.get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteLecture(Long id) {
        lectureService.delete(id);
        return ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
