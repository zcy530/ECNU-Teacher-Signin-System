import React, { useEffect, useState } from 'react';
import { Button, Col, Descriptions, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Table, { ColumnsType, TableProps } from 'antd/es/table';

export interface Props {
  courseId: string;
  setStatus: (status: number) => void;
}  

const CheckAllSignin = (props:Props) => {


    useEffect(() => {
        fetch(`http://8.130.86.79:8072/signin-service/course/signup?courseId=FRKNP-G74eWf9c4B&professorId=5103909&term=2023年春季学期`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'URIEncoding':"utf-8"
          },
        })
        .then(response => response.json())
        .then((value)=> {
          console.log(value);
        })
      },[])

  return (
    <div>
    
    <h2>该课程所有的签到详情</h2>
    
    {/* <Table columns={columns} dataSource={data} onChange={onChange} /> */}
    <Button type='primary' style={{marginTop:0}} onClick={()=>props.setStatus(1)}>返回课程详情页面</Button>
    </div>
    
  );
};

export default CheckAllSignin;

