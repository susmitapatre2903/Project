import { URL } from '../../constants/constant';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const TeacherDivisionRow = ({ list, index, id, teacherSubList }) => {
	//  teacherSubList[index].subject.sub_name
	console.log(list.division.divName)
	return (
		<p> {list.division.divName}</p>
	)
}

export default TeacherDivisionRow