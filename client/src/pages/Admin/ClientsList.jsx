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

const ClientsList = () => {
    const [clients, setClients] = useState([]);
    const dispatch = useDispatch();

    const getClientsData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-clients', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setClients(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());

        }
    }


    const changeClientStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/admin/change-client-account-status', {clientId: record._id, userId: record.userId, status: status}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success('Client status updated successfully');
                getClientsData();
            }
        } catch (error) {
            toast.error('Error changing client status');
            
            dispatch(hideLoading());

        }
    }

    useEffect(() => {
        getClientsData()
    }, []);


    const columns = [
        {
            title: 'Director',
            dataIndex: 'director',
        },
        {
            title: 'Guardian Full Name',
            dataIndex: 'guardianFullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Custom Client Number',
            dataIndex: 'customClientNumber',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
        },
        {
            title: 'Middle Name',
            dataIndex: 'middleName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'SSN',
            dataIndex: 'ssn'
        },
        {
            title: 'Address1',
            dataIndex: 'address1'
        },
        {
            title: 'Address2',
            dataIndex: 'address2'
        },
        {
            title: 'City',
            dataIndex: 'city'
        },
        {
            title: 'State',
            dataIndex: 'state'
        },
        {
            title: 'Country',
            dataIndex: 'country'
        },
        {
            title: 'Zip',
            dataIndex: 'zip'
        },

        //primary payer
        {
            title: 'Primary Payer',
            dataIndex: 'primaryPayer',
        },
        {
            title: 'Insurance ID',
            dataIndex: 'insuranceID',
        },
        {
            title: 'Group Policy Number',
            dataIndex: 'groupPolicyNumber',
        },
        {
            title: 'Insurance Copayment',
            dataIndex: 'insuranceCopayment',
        },
        {
            title: 'Relationship to Patient',
            dataIndex: 'relationshipToPatient',
        },
        {
            title: 'Insurance Number for 837p',
            dataIndex: 'insuranceNumberFor837p',
        },
        {
            title: 'Insured First Name',
            dataIndex: 'insuredFirstName',
        },
        {
            title: 'Insured Middle Name',
            dataIndex: 'insuredMiddleName',
        },
        {
            title: 'Insured Last Name',
            dataIndex: 'insuredLastName',
        },
        {
            title: 'Primary Insured Gender',
            dataIndex: 'primaryInsuredGender',
        },
        {
            title: 'Insured Address',
            dataIndex: 'insuredAddress',
        },
        {
            title: 'Insured Country',
            dataIndex: 'insuredCountry',
        },
        {
            title: 'Insured State',
            dataIndex: 'insuredState',
        },
        {
            title: 'Insured City',
            dataIndex: 'insuredCity',
        },
        {
            title: 'Insured ZIP',
            dataIndex: 'insuredZIP',
        },
        {
            title: 'Primary Issued Date Of Birth',
            dataIndex: 'primaryIssuedDateOfBirth',
        },
        {
            title: 'Insured Phone Number',
            dataIndex: 'insuredPhoneNumber',
        },
        
         //Secondary payer
         {
            title: 'Secondary Payer',
            dataIndex: 'secondaryPayer',
        },
        {
            title: 'Insurance ID',
            dataIndex: 'insuranceID',
        },
        {
            title: 'Group Policy Number',
            dataIndex: 'groupPolicyNumber',
        },
        {
            title: 'Insurance Copayment',
            dataIndex: 'insuranceCopayment',
        },
        {
            title: 'Relationship to Patient',
            dataIndex: 'relationshipToPatient',
        },
        {
            title: 'Insurance Number for 837p',
            dataIndex: 'insuranceNumberFor837p',
        },
        {
            title: 'Insured First Name',
            dataIndex: 'insuredFirstName',
        },
        {
            title: 'Insured Middle Name',
            dataIndex: 'insuredMiddleName',
        },
        {
            title: 'Insured Last Name',
            dataIndex: 'insuredLastName',
        },
        {
            title: 'Secondary Insured Gender',
            dataIndex: 'secondaryInsuredGender',
        },
        {
            title: 'Insured Address',
            dataIndex: 'insuredAddress',
        },
        {
            title: 'Insured Country',
            dataIndex: 'insuredCountry',
        },
        {
            title: 'Insured State',
            dataIndex: 'insuredState',
        },
        {
            title: 'Insured City',
            dataIndex: 'insuredCity',
        },
        {
            title: 'Insured ZIP',
            dataIndex: 'insuredZIP',
        },
        {
            title: 'Secondary Issued Date Of Birth',
            dataIndex: 'secondaryIssuedDateOfBirth',
        },
        {
            title: 'Insured Phone Number',
            dataIndex: 'insuredPhoneNumber',
        },

        //Referral, Coordinator & Service Details
        {
            title: 'Client Diagnosis Codes'
        },
        {
            title: 'Referring Physician NPI',
            dataIndex: 'referringPhysicianNPI',
        },
        {
            title: 'Referring Physician Taxonomy',
            dataIndex: 'referringPhysicianTaxonomy',
        },
        {
            title: 'Referring Physician Taxonomy Number',
            dataIndex: 'referringPhysicianTaxonomyNumber',
        },
        {
            title: 'Referring Physician First Name',
            dataIndex: 'referringPhysicianFirstName',
        },
        {
            title: 'Referring Physician Middle Name',
            dataIndex: 'referringPhysicianMiddleName',
        },
        {
            title: 'Referring Physician Last Name',
            dataIndex: 'referringPhysicianLastName',
        },
        {
            title: 'Referring Physician Phone',
            dataIndex: 'referringPhysicianPhone',
        },
        {
            title: 'Referring Physician FAX',
            dataIndex: 'referringPhysicianFAX',
        },
        {
            title: 'Referring Physician Email',
            dataIndex: 'referringPhysicianEmail',
        },
        {
            title: 'Referral Exiration Date',
            dataIndex: 'referralExpirationDate',
        },
        {
            title: 'MD License Number',
            dataIndex: 'mdLicenseNumber',
        },
        {
            title: 'Service Location',
            dataIndex: 'serviceLocation',
        },
        {
            title: 'Start of Service at',
            dataIndex: 'startOfServiceAt',
        },
        {
            title: 'Initial Assessment at',
            dataIndex: 'initialAssessmentAt',
        },
        {
            title: 'Initial BASP at',
            dataIndex: 'initialBASPAt',
        },
        {
            title: 'Coordinator Approval at',
            dataIndex: 'coordinatorApprovalAt',
        },
        {
            title: 'Coordinator Full Name',
            dataIndex: 'coordinatorFullName',
        },
        {
            title: 'Coordinator Email',
            dataIndex: 'coordinatorEmail',
        },
        {
            title: 'Coordinator Phone Number',
            dataIndex: 'coordinatorPhoneNumber',
        },
        {
            title: 'Support Plan at',
            dataIndex: 'supportPlanAt',
        },
        {
            title: 'Weekly BCBA/BCaBA/Analyst Hours',
            dataIndex: 'weeklyBCBABCaBAAnalystHours',
        },
        {
            title: 'Weekly RBT/Assistant Hours',
            dataIndex: 'weeklyRBTAssistantHours',
        },
        {
            title: 'Termination Date',
            dataIndex: 'terminationDate',
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

    return(
        <Layout>
            <div className="d-flex align-items-center justify-content-between">
                <h1 className='page-header'>Clients List</h1>   
                <Link to='/admin/add-client' className='link-button'>Add Client</Link>
                
                </div>
            
            <Table columns={columns} dataSource={clients} />
        </Layout>
    )



}
export default ClientsList;
