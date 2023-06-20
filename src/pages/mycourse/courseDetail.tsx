import React, { useEffect, useState } from 'react';
import { Button, Col, Descriptions, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Table, { ColumnsType, TableProps } from 'antd/es/table';

export interface Props {
  courseId: string;
  setStatus: (status: number) => void;
}  

export type course = {
    courseId: string;
    name: string;
    longitude: number;
    latitude: number;
    startTime: string;
    endTime: string;
    weekday: string;
}

interface DataType {
  key:number;
  name: string;
  studentId: number;
  normal: number;
  late: number;
  leave: number;
  absent: number;
}

const data:DataType[] = [
  {
      "key":1,
      "name": "杜安琪",
      "studentId": 1017453074,
      "normal": 17,
      "late": 0,
      "leave": 0,
      "absent": 0
  },
  {
      "key":2,
      "name": "金子异",
      "studentId": 1017483979,
      "normal": 14,
      "late": 1,
      "leave": 1,
      "absent": 1
  },
  {
      "key":3,
      "name": "姜宇宁",
      "studentId": 1017709423,
      "normal": 15,
      "late": 0,
      "leave": 2,
      "absent": 0
  },
  {
      "key":4,
      "name": "王詩涵",
      "studentId": 1019443148,
      "normal": 15,
      "late": 2,
      "leave": 0,
      "absent": 0
  },
  {
      "key":5,
      "name": "戴宇宁",
      "studentId": 1020174882,
      "normal": 17,
      "late": 0,
      "leave": 0,
      "absent": 0
  },
  {
      "key":6,
      "name": "高璐",
      "studentId": 1020848154,
      "normal": 13,
      "late": 3,
      "leave": 1,
      "absent": 0
  },
  {
      "key":7,
      "name": "许嘉伦",
      "studentId": 1021265390,
      "normal": 12,
      "late": 3,
      "leave": 2,
      "absent": 0
  },
  {
      "key":8,
      "name": "魏詩涵",
      "studentId": 1022881496,
      "normal":17,
      "late": 0,
      "leave": 0,
      "absent": 0
  },
  {
      "key":9,
      "name": "于安琪",
      "studentId": 1023383515,
      "normal": 15,
      "late": 0,
      "leave": 2,
      "absent": 0
  },
  {
      "key":10,
      "name": "薛震南",
      "studentId": 1023760421,
      "normal": 12,
      "late": 0,
      "leave": 5,
      "absent": 0
  },
  {
      "key":11,
      "name": "朱岩",
      "studentId": 10205101485,
      "normal": 16,
      "late": 0,
      "leave": 1,
      "absent": 1
  },
  {
    "key":9,
    "name": "张彩仪",
    "studentId": 1023383515,
    "normal": 15,
    "late": 0,
    "leave": 2,
    "absent": 0
},
]

const columns: ColumnsType<DataType> = [
  {
    title: '名字',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: '学号',
    dataIndex: 'studentId',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.studentId - b.studentId,
  },
  {
    title: '正常出勤次数',
    dataIndex: 'normal',
    sorter: (a, b) => a.normal - b.normal,
  },
  {
    title: '迟到次数',
    dataIndex: 'late',
    sorter: (a, b) => a.late - b.late,
  },
  {
    title: '请假次数',
    dataIndex: 'leave',
    sorter: (a, b) => a.leave - b.leave,
  },
  {
    title: '缺勤次数',
    dataIndex: 'absent',
    sorter: (a, b) => a.absent - b.absent,
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const CourseDetail = (props:Props) => {

  const courseFake:course = {
    "courseId": "",
    "name": "",
    "longitude": 0,
    "latitude": 0,
    "startTime": "",
    "endTime": "",
    "weekday": ""
}

  const [courseInfo, setCourseInfo] = useState<course>(courseFake);

  useEffect(() => {
    fetch(`http://8.130.86.79:8072/office-service/course/info?courseId=${props.courseId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
    .then(response => response.json())
    .then((value)=> {
      console.log(value);
      setCourseInfo(value);
    })
  },[])

  return (
    <div>
    
    <h2>课程信息</h2>
    
    <Descriptions title="" layout="vertical" style={{backgroundColor:'rgb(0,0,0,0.02)',borderRadius:10,padding:30}} labelStyle={{fontSize:15}}>
        <Descriptions.Item label="课程名称">{courseInfo.name}</Descriptions.Item>
        <Descriptions.Item label="课程编号">{courseInfo.courseId}</Descriptions.Item>
        <Descriptions.Item label="课程位置（经度）">{courseInfo.longitude}</Descriptions.Item>
        <Descriptions.Item label="课程位置（纬度）">{courseInfo.latitude}</Descriptions.Item>
        <Descriptions.Item label="上课时间">{courseInfo.startTime}</Descriptions.Item>
        <Descriptions.Item label="下课时间">{courseInfo.endTime}</Descriptions.Item>
    </Descriptions>
    <div style={{marginTop:20,marginBottom:50}}>
        <Button type="primary" style={{marginRight:20}} onClick={()=>props.setStatus(0)}>返回课程表</Button> 
        <Button type="primary" style={{marginRight:20}} onClick={()=>props.setStatus(2)}>发起签到和查看签到</Button> 
        <Button type="primary">导入缺课名单</Button>
    </div>
    
    <h2>课程点名列表</h2>
    <Table columns={columns} dataSource={data} onChange={onChange} />

    </div>
    
  );
};

export default CourseDetail;

