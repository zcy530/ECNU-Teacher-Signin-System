import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Descriptions, Input, InputRef, Radio, RadioChangeEvent, Row, Select, Space, Statistic, TimePicker } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Table, { ColumnsType, TableProps } from 'antd/es/table';
import { StringLiteral } from 'typescript';
import { FilterConfirmProps } from 'antd/es/table/interface';

export interface Props {
  rcrecordId: number;
  setStatus: (status: number) => void;
}  

interface DataType {
    studentId: number;
    name: string;
    time: string;
    status: string;
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
  },
  {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    render: () => (
      <Space size="middle">
        <Button type='primary'>修改状态</Button>
      </Space>
    ),
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const SigninDetail = (props:Props) => {

    const [data,setData] = useState<DataType[]>([])

    useEffect(() => {
        fetch(`http://8.130.86.79:8072/signin-service/course/signup/student/all?rcrecordId=582`, {
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
    <Table columns={columns} dataSource={data} onChange={onChange} />
    <Button type='primary' style={{marginTop:0}} onClick={()=>props.setStatus(2)}>返回发起签到页面</Button>
    </div>
    
  );
};

export default SigninDetail;

