package com.project.services;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.project.entities.Institute;

public interface InstituteService {

	Institute saveName(Institute institute);

	void deleteInstitute(int i);

	List<Institute> findAllInstitute();

	Institute saveInstitute(Institute institute, MultipartFile profilepicture);

}
