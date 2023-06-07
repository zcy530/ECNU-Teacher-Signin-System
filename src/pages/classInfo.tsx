import React from 'react';
import { Col, Row, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}



const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const ClassInfo: React.FC = () => {
  return (
    <div style={{backgroundColor:'rgb(255,44,233)',textAlign:'center',padding:10}}>
      <Row style={{height:50}}>
        <Col span={4} style={{backgroundColor:'rgb(255,255,90)',borderRadius:10,fontSize:18}}>col-6</Col>
        <Col span={4}>col-6</Col>
        <Col span={4}>col-6</Col>
        <Col span={4}>col-6</Col>
        <Col span={4}>col-6</Col>
        <Col span={4}>col-6</Col>
      </Row>
      <Row gutter={16}>
        <Col span={4}>col-6</Col>
        <Col span={4} >col-6</Col>
        <Col span={4}>col-6</Col>
        <Col span={4}>col-6</Col>
        <Col span={4}>col-6</Col>
        <Col span={4}>col-6</Col>
      </Row>
    </div>
  )

}

export default ClassInfo;