import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const getUsersData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-users',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if(response.data.success) {
                setUsers(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            
        }
    }




    useEffect(() => {
        getUsersData()
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                    <h1 className="anchor">Block</h1>
                </div>
            )
        }

    ]
    
  return (
    <Layout>
        <div className='d-flex align-items-center justify-content-between'>
        <h1 className='page-header'>Users List</h1>
        <Link to='/admin/add-client' className='link-button'>Add User</Link>


        </div>
      
      <Table columns={columns} dataSource={users}/>
    </Layout>
  );
};

export default UsersList;
