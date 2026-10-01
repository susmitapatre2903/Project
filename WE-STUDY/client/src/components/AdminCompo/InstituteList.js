import { URL } from './../../constants/constant';
import React from "react";
import axios from 'axios';

const InstituteListRow = ({list, index}) => {
 
    const deleteInstitute = (list) =>{
    
    console.log(list.id)

    axios.get(URL + '/deleteinstitute/'+list.id).then((response)=>{

        const result = response.data;

        if(result.status === "success"){
            alert("Successfully deleted Institute")
        }else{
            alert("failed to deleted Institute")
        }
        console.log(result)
    })

    window.location.reload(false);
}

    return(
        <tr >
            <th scope="row">{index+1}</th>
            <td ><a href={"/addinstituteadmin/"+ list.id } >{list.name}</a></td>
            <td><button onClick={()=>{deleteInstitute(list)}}   className="btn btn-outline-light btn-sm px-3 " type="submit" >delete</button></td>
        </tr>
    )
}

export default InstituteListRow