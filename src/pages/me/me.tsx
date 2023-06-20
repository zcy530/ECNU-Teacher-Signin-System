import React from 'react';
import { Button, Col, Descriptions, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Me: React.FC = () => {

    const navigate = useNavigate()
    
    return(
        <div>
        <h2>用户信息</h2>
        <Descriptions title="" layout="vertical" style={{backgroundColor:'rgb(0,0,0,0.02)',borderRadius:10,padding:30}} labelStyle={{fontSize:17}}>
            <Descriptions.Item label="教师名称">杨秀英</Descriptions.Item>
            <Descriptions.Item label="电话">17645511424</Descriptions.Item>
            <Descriptions.Item label="地址">上海市普陀区</Descriptions.Item>
            <Descriptions.Item label="研究方向">人工智能，自然语言处理</Descriptions.Item>
            <Descriptions.Item label="教师ID">5103909</Descriptions.Item>
            <Descriptions.Item label="密码">password</Descriptions.Item>
    
        </Descriptions>
        <h2>数据统计</h2>
        <div style={{backgroundColor:'rgb(0,0,0,0.02)',borderRadius:10,padding:30}}>
        <Row gutter={16} style={{marginBottom:20}}>
            <Col span={12}>
              <Statistic title="学生统计" value={1223} />
            </Col>
            <Col span={12}>
              <Statistic title="课程统计" value={10} />
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Statistic
                    title="签到率"
                    value={95.2}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
            </Col>
            <Col span={12}>
                <Statistic
                    title="旷课率"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                />
            </Col>
        </Row>
        </div>
        <Button type='primary' style={{marginTop:20}} onClick={()=>{
            navigate('/login')
        }}>退出登陆</Button>
       </div>
    )
}

export default Me;