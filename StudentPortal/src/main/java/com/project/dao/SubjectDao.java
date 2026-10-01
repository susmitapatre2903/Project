package com.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.entities.Subject;

public interface SubjectDao extends JpaRepository<Subject, Integer> {

}
