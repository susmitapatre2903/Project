package com.project.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.project.dao.AssignmentDao;
import com.project.entities.Assignment;
import com.project.utils.StorageService;

@Transactional
@Service
public class AssignmentServiceImpl implements AssignmentService {

	@Autowired
	private AssignmentDao assignmentDao;

	@Autowired
	private StorageService storageService;

	@Override
	public Assignment saveAssignment(Assignment assign, MultipartFile assignment) {

		String fileName = storageService.store(assignment);

		assign.setAssignment(fileName);

		return assignmentDao.save(assign);
	}

	@Override
	public Assignment findAssignment(int std_id, int div_id, int sub_id) {

		return assignmentDao.findAssignment(std_id, div_id, sub_id);
	}

	@Override
	public List<Assignment> findAssignmentwrtUser(int user_id, int sub_id, int div_id, int std_id) {

		return assignmentDao.findAssignmentwrtUser(user_id, sub_id, div_id, std_id);
	}

	@Override
	public void deleteAssignmentById(Integer id) {

		assignmentDao.deleteById(id);
	}

	@Override
	public List<Assignment> findAssignmentwrtStdDivSub(int sub_id, int div_id, int std_id) {

		return assignmentDao.findAssignmentwrtStdDivSub(sub_id, div_id, std_id);
	}

}
