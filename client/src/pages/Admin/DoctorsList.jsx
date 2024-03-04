import React from 'react';
import Layout from '../../components/Layout';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const DoctorsList = () => {

    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();

    const getDoctorsData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-doctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());

        }
    }

    const changeDoctorStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/admin/change-doctor-account-status', {doctorId: record._id, userId: record.userId, status: status}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success('Doctor status updated successfully');
                getDoctorsData();
            }
        } catch (error) {
            toast.error('Error changing doctor status');
            
            dispatch(hideLoading());

        }
    }

    useEffect(() => {
        getDoctorsData()
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => <span className="normal-text">{record.firstName} {record.lastName}</span>
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },

        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === 'pending' && <h1 className="anchor" onClick={()=>changeDoctorStatus(record, 'approved')}>Approve</h1>}
                    {record.status === 'approved' && <h1 className="anchor" onClick={()=>changeDoctorStatus(record, 'blocked')}>Block</h1>}
                </div>
            )
        }

    ]
    return (
        <Layout>
            <div className="d-flex align-items-center justify-content-between">
                <h1 className='page-header'>Therapist List</h1>   
                <Link to='/admin/apply-doctor' className='link-button'>Add Therapist</Link>
                
                </div>
            
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    );
};

export default DoctorsList;
