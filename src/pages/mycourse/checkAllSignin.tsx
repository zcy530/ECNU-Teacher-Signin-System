import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Descriptions, Input, InputRef, Radio, RadioChangeEvent, Row, Select, Space, Statistic, TimePicker } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Table, { ColumnsType, TableProps } from 'antd/es/table';
import { StringLiteral } from 'typescript';
import { FilterConfirmProps } from 'antd/es/table/interface';

export interface Props {
  courseId: string;
  setStatus: (status: number) => void;
}  

interface DataType {
    roll_call_record_id: number;
    course_id: string;
    week: number;
    professor_id: number;
    method: string;
    start_time: string;
    end_time: string;
    term: string;
}

const CheckAllSignin = (props:Props) => {

    const [data,setData] = useState<DataType[]>([])
    const [signway,setSignway] = useState<string>('face')
    const [week, setWeek] = useState<number>(1);
    const [kouling, setKouling] = useState<string>('')

    useEffect(() => {
        fetch(`http://8.130.86.79:8072/signin-service/course/signup?courseId=${props.courseId}&professorId=5103909&term=2023年春季学期`, {
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

      const columns: ColumnsType<DataType> = [
        {
          title: '请假课时',
          dataIndex: 'week',
          defaultSortOrder:'ascend',
          sorter: (a, b) => a.week - b.week,
        },
        {
          title: '请假学期',
          dataIndex: 'term',
        },
        {
          title: '签到方式',
          dataIndex: 'method',
        },
        {
          title: '开始时间',
          dataIndex: 'start_time',
        },
        {
          title: '结束时间',
          dataIndex: 'end_time',
        },
        {
          title: '操作',
          dataIndex: 'option',
          key: 'option',
          width: '20%',
          render: () => (
            <Space size="middle">
              <Button type='primary' onClick={()=>{props.setStatus(3)}}>查看详情</Button>
            </Space>
          ),
        },
      ];

      const handleChange = (value: string) => {
        setSignway(value)
        console.log(`selected ${value}`);
      };

      const handleWeekChange = (value: string) => {
        setWeek(parseInt(value))
        console.log(`selected ${value}`);
      };

      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

      const postHandler = () => {
        const signin = {
            "course_id": props.courseId,
            "week": week,
            "professor_id": 5103909,
            "method": signway=='password'?kouling:signway,
            "start_time": "2023-06-21 10:00:00",
            "end_time": "2023-06-21 11:00:00",
            "term": "2023年春季学期"
        }
          fetch('http://8.130.86.79:8072/signin-service/course/sign/add', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(signin)
          })
          .then(response => response.json())
          .then((value)=> {
            console.log(value);
          })
      }

      

  return (
    <div>
    
    <h2>发起签到</h2>
    <div style={{marginBottom:15,fontSize:14}}>请选择签到方式</div>
    <Select
        defaultValue="签到方式"
        style={{ width: 230 }}
        onChange={handleChange}
        options={[
            { value: 'face', label: '人脸识别签到' },
            { value: 'location', label: '定位签到' },
            { value: 'password', label: '口令签到' },
        ]}
    />

    {signway=='password' && <Input style={{width:230,marginLeft:20}} placeholder="Basic usage" onChange={(e)=>setKouling(e.target.value)}/>}

    <div style={{marginBottom:15,marginTop:15, fontSize:14}}>请选择签到时间</div>
    <TimePicker.RangePicker />

    <div style={{marginBottom:15,marginTop:15, fontSize:14}}>请选择签到课时</div>
    <Select
        defaultValue="第1周"
        style={{ width: 230 }}
        onChange={handleWeekChange}
        options={[
            { value: '1', label: '第1周' },
            { value: '2', label: '第2周' },
            { value: '3', label: '第3周' },
            { value: '4', label: '第4周' },
            { value: '5', label: '第5周' },
            { value: '6', label: '第6周' },
            { value: '7', label: '第7周' },
            { value: '8', label: '第8周' },
            { value: '9', label: '第9周' },
            { value: '10', label: '第10周' },
            { value: '11', label: '第11周' },
            { value: '12', label: '第12周' },
            { value: '13', label: '第13周' },
            { value: '14', label: '第14周' },
            { value: '15', label: '第15周' },
            { value: '16', label: '第16周' },
        ]}
    />
    <div style={{marginTop:15}}><Button type='primary' onClick={()=>postHandler()}>发起签到</Button></div>
    


    <h2 style={{marginTop:30}}>该课程所有的签到详情</h2>
    <Table columns={columns} dataSource={data} onChange={onChange} />
    <Button type='primary' style={{marginTop:0}} onClick={()=>props.setStatus(1)}>返回课程详情页面</Button>
    </div>
    
  );
};

export default CheckAllSignin;

