import axios from "axios"
import { URL } from '../../constants/constant';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


const SubjectRow = ({ list, index, standard, division, onItemSelect, teacherid, instituteid }) => {

    const body = new FormData()
    const standard1 = standard
    const division1 = division

    console.log(standard)
    console.log(division)

    return (
        <div>
            <div className="SubjectBar-row ">
                <div className="effect" id="title" onClick={() => {
                    onItemSelect(list.id)
                }} >
                    {list.sub_name}
                </div>
            </div>
        </div>
    )
}

export default SubjectRow