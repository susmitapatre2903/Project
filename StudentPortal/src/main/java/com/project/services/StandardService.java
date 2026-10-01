package com.project.services;

import java.util.List;
import com.project.entities.Division;
import com.project.entities.Standard;

public interface StandardService {

	Standard saveStandard(Standard std);

	void deleteStandard(int id);

	List<Standard> findByInstituteId(int id);

	List<Standard> findById(int id);

	Standard saveDivision(Division div);

	Standard findStandard(int stdid);

}
