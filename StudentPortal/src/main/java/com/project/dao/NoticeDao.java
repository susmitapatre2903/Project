package com.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.project.entities.Notice;

public interface NoticeDao extends JpaRepository<Notice, Integer> {

	@Query("select s from Notice s where s.standard.id=?1 and s.user.id=?2")
	Notice findNoticeByStdUserId(int std_id, int user_id);

	@Query("select s from Notice s where s.standard.id=?1 ")
	Notice findNoticeByStandardId(int std_id);
}
