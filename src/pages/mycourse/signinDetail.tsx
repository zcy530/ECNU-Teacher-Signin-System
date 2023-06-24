import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Descriptions, Input, InputRef, Radio, RadioChangeEvent, Row, Select, Space, Statistic, Tag, TimePicker } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Table, { ColumnsType, TableProps } from 'antd/es/table';
import { StringLiteral } from 'typescript';
import { FilterConfirmProps } from 'antd/es/table/interface';

export interface Props {
  rcrecordId: number;
  setStatus: (status: number) => void;
  rollcallrecordid: number;
}  

interface DataType {
    studentId: number;
    name: string;
    time: string;
    status: string;
}

const getStatus = (id:string) => {
    if(id=='normal'){
      return '正常出勤'
    }
    else if(id=='late'){
      return '迟到'
    }
    else if(id=='absent'){
      return '旷课'
    }
    else{
      return '请假'
    }
}

const getColor = (id:string) => {
    if(id=='normal'){
      return 'green'
    }
    else if(id=='late'){
      return 'pink'
    }
    else if(id=='absent'){
      return 'red'
    }
    else{
      return 'blue'
    }
}

const columns: ColumnsType<DataType> = [
  {
    title: '学生姓名',
    dataIndex: 'name',
  },
  {
    title: '学号',
    dataIndex: 'studentId',
    defaultSortOrder:'ascend',
    sorter: (a, b) => a.studentId - b.studentId,
  },
  {
    title: '签到时间',
    dataIndex: 'time',
  },
  {
    title: '考勤状态',
    dataIndex: 'status',
    render: (_, { status }) => (
        <Tag color={getColor(status)} key={status}>
          {getStatus(status)}
        </Tag>
    ),
  },
//   {
//     title: '操作',
//     dataIndex: 'option',
//     key: 'option',
//     render: (_,{studentId}) => (
//       <Space size="middle">
//         <Button type='primary' onClick={()=>{
//             console.log(studentId)
//         }}>修改状态</Button>
//       </Space>
//     ),
//   },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const SigninDetail = (props:Props) => {

    const [data,setData] = useState<DataType[]>([])

    useEffect(() => {
        fetch(`http://8.130.86.79:8072/signin-service/course/signup/student/all?rcrecordId=${props.rollcallrecordid}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          },
        })
        .then(response => response.json())
        .then((value)=> {
          console.log(value);
          setData(value);
        })
      },[])

  return (
    <div>

    <h2 style={{marginTop:30}}>本节课签到情况详情</h2>
    <text style={{marginBottom:20}}>本次签到的id号：{props.rollcallrecordid}</text>
    <Table columns={columns} dataSource={data} onChange={onChange} style={{marginTop:10}}/>
    <Button type='primary' style={{marginTop:0}} onClick={()=>props.setStatus(2)}>返回发起签到页面</Button>
    </div>
    
  );
};

export default SigninDetail;

