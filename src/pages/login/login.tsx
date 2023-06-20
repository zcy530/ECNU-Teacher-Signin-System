import { Button } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [id, setID] = useState<number>(0);
    const [password, setPassward] = useState<string>('');


    const navigate = useNavigate()
    return(
        <div style={{marginLeft:400}}>
            <Button type='primary' onClick={()=>{
                navigate('/')
            }}>登陆</Button>
        </div>
    )
}

export default Login;