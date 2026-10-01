import { URL } from '../../constants/constant';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const TeacherSubjectRow = ({ list }) => {

	return (
		<p>
			{list.subject.sub_name}
		</p>
	)

}

export default TeacherSubjectRow