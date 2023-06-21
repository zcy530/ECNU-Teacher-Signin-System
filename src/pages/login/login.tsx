import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Login  = () => {

    const right = 'passward'
    const [passward, setPassward] = useState('');
    const navigate = useNavigate()
    
    return(
    <div style={{backgroundImage:'linear-gradient(to left, rgb(211, 235, 248), rgb(91, 145, 192))',height:900,marginTop:0}}>
        <div style={{height:200}}></div>
        <div style={{marginLeft:300}}>
        <h2 style={{marginLeft:240}}>ECNU签到系统教师端</h2>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户id"
          name="id"
          rules={[{ required: true, message: '请输入你的id!' }]}
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入你的密码!' }]}
        >
          <Input.Password value={passward} onChange={(e)=>setPassward(e.target.value)}/>
        </Form.Item>
    
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
    
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" style={{width:200}} onClick={()=>{
            if(passward==right) {
                navigate('/')
            } else{
                alert('账号或者密码错误')
            }
            console.log(passward)
          }}>
            登陆
          </Button>
        </Form.Item>
      </Form>
      </div>
      </div>
    )
};

export default Login;