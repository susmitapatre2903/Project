package com.project.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.dao.StandardDao;
import com.project.entities.Division;
import com.project.entities.Standard;

@Service
public class StandardServImpl implements StandardService {

	@Autowired
	StandardDao stdDao;

	@Override
	public Standard saveStandard(Standard std) {

		return stdDao.save(std);
	}

	@Override
	public void deleteStandard(int id) {

		stdDao.deleteById(id);
	}

	@Override
	public List<Standard> findByInstituteId(int id) {

		return stdDao.findStandardbyinstituteid(id);
	}

	@Override
	public List<Standard> findById(int id) {

		return stdDao.findById(id);
	}

	@Override
	public Standard saveDivision(Division div) {

		return null;
	}

	@Override
	public Standard findStandard(int stdid) {

		return stdDao.findStandard(stdid);
	}

}
