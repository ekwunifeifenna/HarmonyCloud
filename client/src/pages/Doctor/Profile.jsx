import React from 'react';
import Layout from '../../components/Layout';
import { Button, Col, Form, Input, DatePicker, Select, Checkbox, Descriptions } from 'antd'
import { TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Country, State, City } from 'country-state-city';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/profile.css';


const Profile = () => {

  const dispatch = useDispatch();
  const { userId } = useParams(); // Get doctorId from URL
  const { user } = useSelector(state => state.user);
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  //Add edit mode for the profile
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const onFinish = async (values) => {
    try {
        dispatch(showLoading())
        console.log(userId, values)
        // const response = await axios.post('/api/doctor/update-doctor-info', { ...values, userId: userId }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, });
        const response = await axios.post('/api/doctor/update-doctor-info', { ...values, _id: userId }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, });

        dispatch(hideLoading())
        if (response.data.success) {
            toast.success(response.data.message);
            setDoctor(response.data.data);
            setEditMode(!editMode);
        } else {
            toast.error(response.data.message);
        }

    } catch (error) {
        dispatch(hideLoading())
        toast.error('Something went wrong');
    }
};


useEffect(() => {
  const getDoctorData = async () => {
      try {
          dispatch(showLoading())
          const response = await axios.post("/api/doctor/get-doctor-info-by-user-id", { userId: userId,},
        //   {token: localStorage.getItem("token")}, 
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          });

          dispatch(hideLoading())
          if(response.data.success){
              setDoctor(response.data.data);
          }        
      } catch (error) {
          dispatch(hideLoading())
                
          
      }

  }
  getDoctorData();



}, [userId, dispatch, navigate]);


  return (
    <Layout>
        <h1 className="page-title">Therapist Profile</h1>
        <hr />

        {doctor && (
      <>
        {!editMode ? (
          // <div>
          //   <p><strong>User ID:</strong> {doctor.userId}</p>
          //   <p><strong>Tax Type:</strong> {doctor.taxType.join(', ')}</p>
          //   <p><strong>Therapist Type:</strong> {doctor.therapistType.join(', ')}</p>
          //   <p><strong>Therapist Level:</strong> {doctor.therapistLevel}</p>
          //   <p><strong>Company Name:</strong> {doctor.companyName}</p>
          //   <p><strong>FEIN:</strong> {doctor.fein}</p>
          //   <p><strong>NPI:</strong> {doctor.npi}</p>
          //   <p><strong>Provider ID:</strong> {doctor.providerID}</p>
          //   <p><strong>State License Number:</strong> {doctor.stateLicenseNumber}</p>
          //   <p><strong>CAQH ID:</strong> {doctor.caqhID}</p>
          //   <p><strong>First Name:</strong> {doctor.firstName}</p>
          //   <p><strong>Middle Name:</strong> {doctor.middleName}</p>
          //   <p><strong>Last Name:</strong> {doctor.lastName}</p>
          //   <p><strong>Date of Birth:</strong> {doctor.dateOfBirth}</p>
          //   <p><strong>Education:</strong> {doctor.education.join(', ')}</p>
          //   <p><strong>Gender:</strong> {doctor.gender.join(', ')}</p>
          //   <p><strong>SSN:</strong> {doctor.ssn}</p>
          //   <p><strong>Languages:</strong> {doctor.languages.join(', ')}</p>
          //   <p><strong>Email:</strong> {doctor.email}</p>
          //   <p><strong>Phone Number:</strong> {doctor.phoneNumber}</p>
          //   <p><strong>Address 1:</strong> {doctor.address1}</p>
          //   <p><strong>Address 2:</strong> {doctor.address2}</p>
          //   <p><strong>Country:</strong> {doctor.country}</p>
          //   <p><strong>State:</strong> {doctor.state}</p>
          //   <p><strong>City:</strong> {doctor.city}</p>
          //   <p><strong>Hire Date:</strong> {doctor.hireDate}</p>
          //   <p><strong>Role:</strong> {doctor.role}</p>
          //   {/* Add more paragraphs for the other fields */}
          //   <Button onClick={toggleEditMode}>Edit Profile</Button>
          // </div>

          <div>
            <Descriptions title="Therapist Info" bordered>
              <Descriptions.Item label="User ID">{doctor.userId}</Descriptions.Item>
              <Descriptions.Item label="Tax Type">{doctor.taxType.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="Therapist Type">{doctor.therapistType.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="Therapist Level">{doctor.therapistLevel}</Descriptions.Item>
              <Descriptions.Item label="Company Name">{doctor.companyName}</Descriptions.Item>
              <Descriptions.Item label="FEIN">{doctor.fein}</Descriptions.Item>
              <Descriptions.Item label="NPI">{doctor.npi}</Descriptions.Item>
              <Descriptions.Item label="Provider ID">{doctor.providerID}</Descriptions.Item>
              <Descriptions.Item label="State License Number">{doctor.stateLicenseNumber}</Descriptions.Item>
              <Descriptions.Item label="CAQH ID">{doctor.caqhID}</Descriptions.Item>
              <Descriptions.Item label="First Name">{doctor.firstName}</Descriptions.Item>
              <Descriptions.Item label="Middle Name">{doctor.middleName}</Descriptions.Item>
              <Descriptions.Item label="Last Name">{doctor.lastName}</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">{doctor.dateOfBirth}</Descriptions.Item>
              <Descriptions.Item label="Education">{doctor.education.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="Gender">{doctor.gender.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="SSN">{doctor.ssn}</Descriptions.Item>
              <Descriptions.Item label="Languages">{doctor.languages.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="Email">{doctor.email}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">{doctor.phoneNumber}</Descriptions.Item>
              <Descriptions.Item label="Address 1">{doctor.address1}</Descriptions.Item>
              <Descriptions.Item label="Address 2">{doctor.address2}</Descriptions.Item>
              <Descriptions.Item label="Country">{doctor.country}</Descriptions.Item>
              <Descriptions.Item label="State">{doctor.state}</Descriptions.Item>
              <Descriptions.Item label="City">{doctor.city}</Descriptions.Item>
              <Descriptions.Item label="Hire Date">{doctor.hireDate}</Descriptions.Item>
              <Descriptions.Item label="Role">{doctor.role}</Descriptions.Item>
            </Descriptions>
            <Button onClick={toggleEditMode}>Edit Profile</Button>
          </div>


        ) : (

            //Look at a way to make this form section a component instead
            <Form onFinish={onFinish} initialValues={doctor}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="taxType" label="Tax Type">
              <Input />
            </Form.Item>
            <Form.Item name="therapistType" label="Therapist Type">
              <Input />
            </Form.Item>
            <Form.Item name="therapistLevel" label="Therapist Level">
              <Input />
            </Form.Item>
            <Form.Item name="companyName" label="Company Name">
              <Input />
            </Form.Item>
            <Form.Item name="fein" label="FEIN">
              <Input />
            </Form.Item>
            <Form.Item name="npi" label="NPI">
              <Input />
            </Form.Item>
            <Form.Item name="providerID" label="Provider ID">
              <Input />
            </Form.Item>
            <Form.Item name="stateLicenseNumber" label="State License Number">
              <Input />
            </Form.Item>
            <Form.Item name="caqhID" label="CAQH ID">
              <Input />
            </Form.Item>
            <Form.Item name="firstName" label="First Name">
              <Input />
            </Form.Item>
            <Form.Item name="middleName" label="Middle Name">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker />
            </Form.Item>
            <Form.Item name="education" label="Education">
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender">
              <Input />
            </Form.Item>
            <Form.Item name="ssn" label="SSN">
              <Input />
            </Form.Item>
            <Form.Item name="languages" label="Languages">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item name="address1" label="Address 1">
              <Input />
            </Form.Item>
            <Form.Item name="address2" label="Address 2">
              <Input />
            </Form.Item>
            <Form.Item name="country" label="Country">
              <Input />
            </Form.Item>
            <Form.Item name="state" label="State">
              <Input />
            </Form.Item>
            <Form.Item name="city" label="City">
              <Input />
            </Form.Item>
            <Form.Item name="hireDate" label="Hire Date">
              <DatePicker />
            </Form.Item>
            <Form.Item name="role" label="Role">
              <Input />
            </Form.Item>
            {/* Add more Form.Item components for the other fields */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className='primary-button'>Save</Button>
              <Button onClick={toggleEditMode} className='secondary-button'>Cancel</Button>
            </Form.Item>
          </Form>
        )}
      </>
    )}


    </Layout>
  );
};

export default Profile;
