import { URL } from '../../constants/constant';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const StandardListRow = ({ list, index }) => {

    const deleteStandard = (list) => {

        console.log(list.id)
        axios.get(URL + '/deletestd/' + list.id).then((response) => {
            console.log(list.id)
            const result = response.data;
            if (result.status === "success") {
                alert("Successfully deleted Standard")
            } else {
                alert("failed to deleted Standard")
            }
            console.log(result)
        })
        window.location.reload(false);
    }

    return (
        <tr >
            <th scope="row">{index + 1}</th>
            <td ><a href={"/addDivision/" + list.id} >{list.standardName}</a></td>
            <td>
                <button onClick={() => { deleteStandard(list) }} className="btn btn-outline-light btn-sm px-3" type="submit" >delete</button>
                <button className="btn btn-outline-light btn-sm px-3" type="submit" > <a href={"/addSubject/" + list.id}>add subject</a> </button>
            </td>
        </tr>
    )
}

export default StandardListRow