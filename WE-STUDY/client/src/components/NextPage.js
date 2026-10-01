import { URL } from './../../src/constants/constant';
import '../components/user/login.css'
import React, { useState } from 'react';
import axios from 'axios';

const Something = () => {
    const [output, setOutput] = useState("");
    console.log("in something")

    axios.get(URL + '/login/something').then((response) => {
        const result = response.data;
        setOutput(result)
        console.log(output)
    })

    return (
        <div className="vh-100 gradient-custom">
            {output}
        </div>
    )
}

export default Something;