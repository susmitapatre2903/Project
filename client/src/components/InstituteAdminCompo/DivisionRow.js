import { URL } from '../../constants/constant';
import React, { useState ,useEffect} from "react";
import axios from 'axios';

const DivisionRow = ({list,index,std}) => {
 
    const body = new FormData()
    const deleteDivision = (list,std) =>{

        console.log(std)

        body.append('std_id',std)
        body.append('div_id',list.id)

    axios.post(URL + '/deleteDivByStd',body).then((response)=>{
        console.log(list.id)
        const result = response.data;
        if(result.status === "success"){
            alert("Successfully deleted Division")
            window.location.reload(false);
        }else{
            alert("failed to deleted Division")
        }
        console.log(result)
    })
}

    return(
        <tr >
            <th scope="row">{index+1}</th>
            <td >{list.divName}</td>
            <td><button onClick={()=>{deleteDivision(list,std)}}   className="btn btn-outline-light btn-sm px-3 " type="submit" >delete</button></td>
        </tr>
    )
}

export default DivisionRow