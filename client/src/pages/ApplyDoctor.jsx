import React from 'react';
import Layout from '../components/Layout';
import { Button, Col, Form, Input, Row } from 'antd'
import { TimePicker } from 'antd';

const ApplyDoctor = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
    };
  return (
    <Layout>
      <h1 className='page-title'>Apply Doctor</h1>
      <hr />
      <h1 className='card-title mt-3'>Personal Credentials</h1>
      
      <Form layout='vertical' onFinish={onFinish}>
        <Row gutter={20}>
            
            <Col span={8} xs={24} sm={24}  lg={8}>
                <Form.Item required label='First Name' name='firstName' rules={[{required: true}]} />
                    <Input placeholder='First Name' />

            </Col>
            <Col span={8} xs={24} sm={24}  lg={8}>
                <Form.Item required label='Last Name' name='lastName' rules={[{required: true}]} />
                    <Input placeholder='Last Name' />

            </Col>
            <Col span={8} xs={24} sm={24}  lg={8}>
                <Form.Item required label='Phone Number' name='phoneNumber' rules={[{required: true}]} />
                    <Input placeholder='Pnone Number' />

            </Col>
            <Col span={8} xs={24} sm={24}  lg={8}>
                <Form.Item required label='Address' name='address' rules={[{required: true}]} />
                    <Input placeholder='address' />

            </Col>
 
        </Row>

        <hr />
        <h1 className='card-title mt-3'>Professional Credentials</h1>

        <Row gutter={20}>

            <Col span={8} xs={24} sm={24}  lg={8}>
                <Form.Item required label='Specialization' name='specialization' rules={[{required: true}]} />
                    <Input placeholder='Specialization' />

            </Col>
            <Col span={8} xs={24} sm={24}  lg={8}>
                <Form.Item required label='Experience' name='experience' rules={[{required: true}]} />
                    <Input placeholder='Experience' type='number' />
            </Col>

            <Col span={8} xs={24} sm={24}  lg={8}>
                <Form.Item required label='Fee per Consultation' name='feePerConsultation' rules={[{required: true}]} />
                    <Input placeholder='Fee per Consultation' type='number' />
            </Col>


            <Col span={8} xs={24} sm={24}  lg={8}>
            <Form.Item required label='Time' name='time' rules={[{required: true}]} />
            <TimePicker.RangePicker />
            </Col>


        </Row>

        <div className="d-flex justify-content-end">
            <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
