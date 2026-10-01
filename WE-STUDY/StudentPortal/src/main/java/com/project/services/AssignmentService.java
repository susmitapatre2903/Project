package com.project.services;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.project.entities.Assignment;

public interface AssignmentService {

	Assignment saveAssignment(Assignment assign, MultipartFile assignment);

	Assignment findAssignment(int std_id, int div_id, int sub_id);

	List<Assignment> findAssignmentwrtUser(int user_id, int sub_id, int div_id, int std_id);

	void deleteAssignmentById(Integer id);

	List<Assignment> findAssignmentwrtStdDivSub(int sub_id, int div_id, int std_id);

}
