import React from 'react';
import { Col, Row, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export type courseShow = {
  courseName: string;
  courseId: string;
  courseColor: string;
}

const date:string[] = ['周一','周二','周三','周四','周五']

const courseList1:courseShow[] = [
  {
    courseName: '大学物理',
    courseId: 'SE0102',
    courseColor: 'rgb(159, 249, 180)'
  },
  {
    courseName: '马克思基本原理',
    courseId: 'MY0022',
    courseColor: 'rgb(255, 238, 170)'
  },
  {
    courseName: '马克思基本原理',
    courseId: 'MY0022',
    courseColor: 'rgb(255, 238, 170)'
  },
  {
    courseName: '',
    courseId: '',
    courseColor: ''
  },
  {
    courseName: '马克思基本原理',
    courseId: 'MY0022',
    courseColor: 'rgb(255, 238, 170)'
  },
]

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const ClassInfo: React.FC = () => {
  return (
    <div style={{backgroundColor:'rgb(0, 22, 40,0.03)',textAlign:'center',padding:10,borderRadius:10}}>
      <Row style={{height:40}}>
        <Col span={4} style={{borderRadius:10,fontSize:18}}>课程表</Col>
        {date.map((value, index)=>(
          <Col span={4} style={{fontSize:16}}><b>{value}</b></Col>
        ))}
      </Row>
      <Row style={{height:70}}>
        <Col span={4} style={{borderRadius:10,fontSize:18,padding:10}}>8:00</Col>
        {courseList1.map((value,index)=>(
          value.courseName!='' 
          ? <Col span={4}>
              <div style={{backgroundColor:`${value.courseColor}`,borderRadius:10,fontSize:16,height:70,padding:10,margin:2}}>
               {value.courseName}<br/>{value.courseId}
              </div>
            </Col>
          : <Col span={4}>
              <div style={{backgroundColor:`${value.courseColor}`,borderRadius:10,fontSize:16,height:70,padding:10,margin:2}}>
              </div>
            </Col>
        ))}
      </Row>
    </div>
  )

}

export default ClassInfo;