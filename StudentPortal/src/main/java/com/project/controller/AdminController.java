package com.project.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.entities.Institute;
import com.project.models.InstituteDTO;
import com.project.models.Response;
import com.project.services.InstituteService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class AdminController {

	@Autowired
	private InstituteService instituteService;

	@RequestMapping("/addinstitute")
	public ResponseEntity<?> addInstitute(InstituteDTO dto) {

		Institute institute = InstituteDTO.toEntity(dto);

		Institute newInstitute = instituteService.saveInstitute(institute, dto.getProfilepicture());

		if (newInstitute != null) {
			return Response.success(newInstitute);
		}
		return Response.error(null);
	}

	@RequestMapping("/deleteinstitute/{id}")
	public ResponseEntity<?> deleteInstitute(@PathVariable("id") int id) {

		if (id != 0) {
			instituteService.deleteInstitute(id);
			return Response.success("success");
		}
		return Response.error(null);
	}

	@RequestMapping("/findinstitute")
	public ResponseEntity<?> findAllInstitute() {

		List<Institute> instituteList = instituteService.findAllInstitute();

		if (instituteList != null) {
			return Response.success(instituteList);
		}
		return Response.error(null);
	}

}
