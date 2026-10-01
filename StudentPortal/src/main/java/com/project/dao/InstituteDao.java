package com.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.entities.Institute;

public interface InstituteDao extends JpaRepository<Institute, Integer> {

}
