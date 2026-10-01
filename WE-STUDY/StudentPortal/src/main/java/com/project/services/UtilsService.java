package com.project.services;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.dao.StandardDao;
import com.project.entities.Division;
import com.project.entities.Standard;

@Transactional
@Service
public class UtilsService {

	@Autowired
	private StandardDao stdDao;

	public void deleteDiv(Standard standard, Division division) {

		standard.removeDivision(division);
		stdDao.save(standard);
	}

}
