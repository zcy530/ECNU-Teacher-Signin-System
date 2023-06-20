import React, { useEffect, useState } from 'react';
import { Col, Row, Select, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useNavigate } from 'react-router-dom'

export interface Props {
  setCourseId: (id: string) => void;
  setStatus: (status: number) => void;
}  

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

const CourseInfo = (props:Props) => {
  const navigate = useNavigate()
  const date:string[] = ['周一','周二','周三','周四','周五']
  const [term, setTerm] = useState('2023年春季学期')
  const [courseList1, setCourseList1] = useState<courseShow[]>([])
  const [courseList2, setCourseList2] = useState<courseShow[]>([])

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  

  const courseList1_term1:courseShow[] = [
    {
      courseName: '高级编程',
      courseId: 'FRKNP-G74eWf9c4B',
      courseColor: 'rgb(255, 238, 170)'
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '高级编程',
      courseId: 'FRKNP-G74eWf9c4B',
      courseColor: 'rgb(255, 238, 170)'
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
  ]
  
  const courseList2_term1:courseShow[] = [
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '云计算',
      courseId: 'CRXFA-31yemoDAS0',
      courseColor: 'rgb(159, 249, 180)'
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
  ]
  
  const courseList3:courseShow[] = [
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
  ]

  const courseList1_term2:courseShow[] = [
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '计算机逻辑基础',
      courseId: 'FRKNP-G74eWf9c4B',
      courseColor: 'rgb(242, 152, 152)'
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '计算机逻辑基础',
      courseId: 'FRKNP-G74eWf9c4B',
      courseColor: 'rgb(242, 152, 152)'
    },
  ]

  const courseList2_term2:courseShow[] = [
    {
      courseName: 'JAVA面向对象基础',
      courseId: 'CRXFA-31yemoDAS0',
      courseColor: 'rgb(255, 238, 170)'
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
    {
      courseName: '',
      courseId: '',
      courseColor: ''
    },
  ]


  useEffect(() => {
    setCourseList1(term=='2023年春季学期' ? courseList1_term1 : courseList1_term2)

    setCourseList2(term=='2023年春季学期' ? courseList2_term1 : courseList2_term2)
  },[term])
  

  return (
    <div>
        <Select
          defaultValue="2023年春季学期"
          style={{ width: 140, marginRight:20, marginBottom:20 }}
          onChange={(value)=>setTerm(value)}
          options={[
            { value: '2020年春季学期', label: '2020年春季学期' },
            { value: '2020年秋季学期', label: '2020年秋季学期' },
            { value: '2021年春季学期', label: '2021年春季学期' },
            { value: '2021年秋季学期', label: '2021年秋季学期' },
            { value: '2022年春季学期', label: '2022年春季学期' },
            { value: '2022年秋季学期', label: '2022年秋季学期' },
            { value: '2023年春季学期', label: '2023年春季学期' },
            { value: '2023年秋季学期', label: '2023年秋季学期' },
          ]}
        />
        <Select
          defaultValue="第一周"
          style={{ width: 140,marginRight:20,marginBottom:20 }}
          options={[
            { value: '第一周', label: '第一周' },
            { value: '第二周', label: '第二周' },
            { value: '第三周', label: '第三周' },
            { value: '第四周', label: '第四周' },
            { value: '第五周', label: '第五周' },
            { value: '第六周', label: '第六周' },
            { value: '第七周', label: '第七周' },
            { value: '第八周', label: '第八周' },
            { value: '第九周', label: '第九周' },
            { value: '第十周', label: '第十周' },
            { value: '第十一周', label: '第十一周' },
            { value: '第十二周', label: '第十二周' },
          ]}
        />
        <div style={{backgroundColor:'rgb(0, 22, 40,0.03)',textAlign:'center',padding:10,borderRadius:14}}>
          <Row style={{height:60}} >
            <Col span={4} style={{borderRadius:10,fontSize:15}}>课程表</Col>
            {date.map((value, index)=>(
              <Col span={4} style={{fontSize:15}} ><b>{value}</b></Col>
            ))}
          </Row>

          <Row style={{height:80,marginBottom:5}}>
            <Col span={4} style={{borderRadius:10,fontSize:16,padding:10}}>8:00</Col>
            {courseList1.map((value,index)=>(
              value.courseName!='' 
              ? <Col span={4} onClick={()=>{
                props.setStatus(1)
                props.setCourseId(value.courseId)
                }}>
                  <div style={{backgroundColor:`${value.courseColor}`,borderRadius:10,fontSize:16,height:80,padding:10,margin:2}}>
                  {value.courseName}<br/>{value.courseId}
                  </div>
                </Col>
              : <Col span={4}>
                  <div style={{backgroundColor:`${value.courseColor}`,borderRadius:10,fontSize:16,height:80,padding:10,margin:2}}>
                  </div>
                </Col>
            ))}
          </Row>
          <Row style={{height:80,marginBottom:5}}>
            <Col span={4} style={{borderRadius:10,fontSize:18,padding:10}}>10:00</Col>
            {courseList2.map((value,index)=>(
              value.courseName!='' 
              ? <Col span={4} onClick={()=>{
                props.setStatus(1)
                props.setCourseId(value.courseId)
                }}>
                  <div style={{backgroundColor:`${value.courseColor}`,borderRadius:10,fontSize:16,height:80,padding:10,margin:2}}>
                  {value.courseName}<br/>{value.courseId}
                  </div>
                </Col>
              : <Col span={4}>
                  <div style={{backgroundColor:`${value.courseColor}`,borderRadius:10,fontSize:16,height:80,padding:10,margin:2}}>
                  </div>
                </Col>
            ))}
          </Row>

          <Row style={{height:70}}>
            <Col span={4} style={{borderRadius:10,fontSize:18,padding:10}}>13:00</Col>
            {courseList3.map((value,index)=>(
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

          <Row style={{height:70}}>
            <Col span={4} style={{borderRadius:10,fontSize:18,padding:10}}>15:00</Col>
            {courseList3.map((value,index)=>(
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

          <Row style={{height:70}}>
            <Col span={4} style={{borderRadius:10,fontSize:18,padding:10}}>18:00</Col>
            {courseList3.map((value,index)=>(
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
    </div>

  )

}

export default CourseInfo;