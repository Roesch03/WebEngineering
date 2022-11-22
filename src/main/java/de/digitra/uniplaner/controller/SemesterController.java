package de.digitra.uniplaner.controller;

import de.digitra.uniplaner.domain.Semester;
import de.digitra.uniplaner.exceptions.BadRequestException;
import de.digitra.uniplaner.exceptions.ResourceNotFoundException;
import de.digitra.uniplaner.interfaces.ISemesterController;
import de.digitra.uniplaner.service.SemesterService;
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
@RequestMapping("/semesters")
public class SemesterController implements ISemesterController {

    //zusaetzlich hinzugefuegt
	@Autowired
	SemesterService semesterService;

    @Override
    public ResponseEntity<Semester> createSemester(Semester semester) throws BadRequestException {
        if(semester.getId() != null) {
			throw new BadRequestException("Semester gibt es bereits (Id vorhanden)");
		}
    	return ResponseEntity.ok(semesterService.save(semester)); //zusätzlich semesterService zum Speichern
    }

    @Override
    public ResponseEntity<Semester> updateSemester(Semester semester) throws BadRequestException {
        if(semester.getId() == null) {
			throw new BadRequestException("Semester gibt es noch nicht (Id nicht vorhanden)");
		}
    	return ResponseEntity.ok(semesterService.save(semester));
    }

    @Override
    public ResponseEntity<Semester> updateSemester(Long id, @Valid Semester semesterDetails) throws ResourceNotFoundException {
        Optional<Semester> optionalSemester = semesterService.findOne(id);
        if(!(optionalSemester.isPresent())){
            throw new ResourceNotFoundException("Semester mit der angegebenen Id nicht gefunden");
        }
        Semester semester = optionalSemester.get();
        semester.setEndDate(semesterDetails.getEndDate());
        semester.setName(semesterDetails.getName());
        semester.setNumber(semesterDetails.getNumber());
        semester.setStartDate(semesterDetails.getStartDate());
        semester.setStudyClass(semesterDetails.getStudyClass());
        
        return ResponseEntity.ok(semesterService.save(semester));
    }

    @Override
    public ResponseEntity<List<Semester>> getAllsemesters() {
        List<Semester> resources = semesterService.findAll();
        return ResponseEntity.ok(resources);
    }

    @Override
    public ResponseEntity<Semester> getSemester(Long id) throws ResourceNotFoundException {
        Optional<Semester> optionalSemester = semesterService.findOne(id);
        if(!(optionalSemester.isPresent())){
            throw new ResourceNotFoundException("Semester mit der angegebenen Id nicht gefunden");
        }
        Semester semester = optionalSemester.get();
        return ResponseEntity.ok(semester);
    }

    @Override
    public ResponseEntity<Void> deleteSemester(Long id) {
        semesterService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
