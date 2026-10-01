package com.project.models;

import org.springframework.beans.BeanUtils;
import com.project.entities.Institute;
import com.project.entities.Standard;

public class StandardDTO {

	private int id;
	private String standardName;
	private int institute_id;
	private String institutename;

	public String getInstitutename() {
		return institutename;
	}

	public void setInstitutename(String institutename) {
		this.institutename = institutename;
	}

	public String getStandardName() {
		return standardName;
	}

	public void setStandardName(String standardName) {
		this.standardName = standardName;
	}

	public int getInstitute_id() {
		return institute_id;
	}

	public void setInstitute_id(int institute_id) {
		this.institute_id = institute_id;
	}

	@Override
	public String toString() {
		return "StandardDTO [id=" + id + ", standardName=" + standardName + ", institute_id=" + institute_id + "]";
	}

	public static Standard toEntity(StandardDTO dto) {

		Standard standard = new Standard();
		BeanUtils.copyProperties(dto, standard);

		Institute institute = new Institute();
		institute.setId(dto.getInstitute_id());
		standard.setInstituteid(institute);

		return standard;
	}

}
