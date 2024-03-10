import React from 'react';
import Layout from '../../components/Layout';
import { Button, Col, Form, Input, DatePicker, Select, Checkbox } from 'antd'
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

const AddClient = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    dayjs.extend(customParseFormat);

    const directorItems = [
        'Ifenna Ekwunife',
        'Magnus Ekwunife',
    ]

    const genderItems = [
        'Male',
        'Female',
        'Non-Binary',
        'Other',
        'Prefer not to say'
    ]

    const relationshipItems = [
        'Self',
        'Spouse',
        'Child',
        'Other',
    ]

    const serviceLocationItems = [
        'ADT',
        'Adult Health Care Facility',
        'Assisted Living Facility',
        'Independent Clinic',
        'Community Mental Health Center',
        'CSU',
        'Daycare',
        'Medical Facility',
        'Home',
        'Group Home',
        'Hospital Inpatient',
        'Office',
        'School',
        'Other Place',
    ]

    const primaryPayerOptions = [
        {
            label: 'Medicaid (M)',
            value: 'Medicaid (M)',
        },
        {
            label: 'Medicaid Waiver (MW)',
            value: 'Medicaid Waiver (MW)',
        },
        {
            label: 'Private Payer (PP)',
            value: 'Private Payer (PP)',
        },
    ];

    //The countries, cities and states
    const countries = Country.getAllCountries();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const dateFormat = 'YYYY-MM-DD';

    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/admin/add-client-account', { ...values, userId: user._id }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, });
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error('Something went wrong');
        }
    };


    useEffect(() => {
        if (selectedCountry) {
            setStates(State.getStatesOfCountry(selectedCountry));
        } else {
            setStates([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            setCities(City.getCitiesOfState(selectedState));
        } else {
            setCities([]);
        }
    }, [selectedState]);



    const onPrimaryPayerCheckboxChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };




    return (
        <Layout>
            <h1 className='page-title'>Add Client</h1>

            <hr />

            <Form layout='vertical' onFinish={onFinish}>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Director' name='director' rules={[{ required: true }]} >
                        <Select placeholder='Director' >
                            {directorItems.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                        </Select>

                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Guardian Full Name' name='guardianFullName'  >
                        <Input placeholder='Guardian Full Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Email' name='email'  >
                        <Input placeholder='Email' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Phone Number' name='phoneNumber'  >
                        <Input placeholder='Phone Number' />
                    </Form.Item>

                </Col>

                <hr />
                <h1 className='card-title mt-3'>Client Details</h1>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Custom Client Number' name='custonClientNumber' >
                        <div className="d-flex gap-10">
                            <Input placeholder='Custom Client Number' />
                            <p>Optional: the system automatically assignms a Client Number</p>
                        </div>

                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Date Of Birth' name='dateOfBirth' >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='First Name' name='firstName' rules={[{ required: true }]}>
                        <Input placeholder='First Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Middle Name' name='middleName'  >
                        <Input placeholder='Middle Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Last Name' name='lastName' rules={[{ required: true }]}>
                        <Input placeholder='Last Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Gender' name='gender' >
                        <Select placeholder='Gender' >
                            {genderItems.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                        </Select>

                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='SSN' name='SSN'  >
                        <Input placeholder='SSN' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Address 1' name='address1'>
                        <Input placeholder='Address 1' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Address 2' name='address2'>
                        <Input placeholder='Address 2' />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item name="country" label="Country">
                        <Select placeholder="Select a country" onChange={setSelectedCountry} showSearch className='country-state-city'>
                            {countries.map((country) => (
                                <Select.Option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item name="state" label="State">
                        <Select placeholder="Select a state" disabled={!selectedCountry} onChange={setSelectedState} showSearch>
                            {states.map((state) => (
                                <Select.Option key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item name="city" label="City">
                        <Select placeholder="Select a city" disabled={!selectedState} showSearch className='country-state-city'>
                            {cities.map((city) => (
                                <Select.Option key={city.name} value={city.name}>
                                    {city.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>

                <hr />
                <h1 className='card-title mt-3'>Primary Payer</h1>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Primary Payer' name='primaryPayer' rules={[{ required: true }]}>
                        <Checkbox.Group options={primaryPayerOptions} onChange={onPrimaryPayerCheckboxChange} />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insurance ID' name='insuranceID'  >
                        <Input placeholder='Insurance ID' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Group Policy #' name='groupPolicyNumber'  >
                        <Input placeholder='Group Policy #' />
                    </Form.Item>

                </Col>

                {/* NEED TO RESEARCH HOW THIS IS ACTUALLY DONE   */}

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insurance Copayment' name='insuranceCopayment'  >
                        <Input placeholder='Insurance Copayment' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Relationship to Patient' name='relationshipToPatient'  >
                        <Select placeholder='Relationship to Patient' >
                            {relationshipItems.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                        </Select>

                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insurance Number for 837p' name='insuranceNumberFor837p'  >
                        <Input placeholder='Insurance Number for 837p' />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured First Name' name='insuredFirstName'  >
                        <Input placeholder='Insured First Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured Middle Name' name='insuredMiddleName'  >
                        <Input placeholder='Insured Middle Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured Last Name' name='insuredLastName'  >
                        <Input placeholder='Insured Last Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Primary Insured Gender' name='primaryInsuredGender' >
                        <Select placeholder='Primary Insured Gender' >
                            {genderItems.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                        </Select>

                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured Address' name='insuredAddress'>
                        <Input placeholder='Address 1' />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item name="insuredCountry" label="Insured Country">
                        <Select placeholder="Insured Country" onChange={setSelectedCountry} showSearch className='country-state-city'>
                            {countries.map((country) => (
                                <Select.Option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item name="insuredState" label="Insured State">
                        <Select placeholder="Insured State" disabled={!selectedCountry} onChange={setSelectedState} showSearch>
                            {states.map((state) => (
                                <Select.Option key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item name="insuredCity" label="Insured City">
                        <Select placeholder="Insured City" disabled={!selectedState} showSearch className='country-state-city'>
                            {cities.map((city) => (
                                <Select.Option key={city.name} value={city.name}>
                                    {city.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured ZIP' name='insuredZIP'  >
                        <Input placeholder='Insured ZIP' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Primary Issued Date Of Birth' name='primaryIssuedDateOfBirth' >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured Phone Number' name='insuredPhoneNumber'  >
                        <Input placeholder='Insured Phone Number' />
                    </Form.Item>

                </Col>



                <hr />
                <h1 className='card-title mt-3'>Secondary Payer</h1>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Secondary Payer' name='secondaryPayer'>
                        <Checkbox.Group options={primaryPayerOptions} onChange={onPrimaryPayerCheckboxChange} />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insurance ID' name='insuranceID'  >
                        <Input placeholder='Insurance ID' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Group Policy #' name='groupPolicyNumber'  >
                        <Input placeholder='Group Policy #' />
                    </Form.Item>

                </Col>

                {/* NEED TO RESEARCH HOW THIS IS ACTUALLY DONE   */}

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insurance Copayment' name='insuranceCopayment'  >
                        <Input placeholder='Insurance Copayment' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Relationship to Patient' name='relationshipToPatient'  >
                        <Select placeholder='Relationship to Patient' >
                            {relationshipItems.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                        </Select>

                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insurance Number for 837p' name='insuranceNumberFor837p'  >
                        <Input placeholder='Insurance Number for 837p' />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured First Name' name='insuredFirstName'  >
                        <Input placeholder='Insured First Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured Middle Name' name='insuredMiddleName'  >
                        <Input placeholder='Insured Middle Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured Last Name' name='insuredLastName'  >
                        <Input placeholder='Insured Last Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Secondary Insured Gender' name='secondaryInsuredGender' >
                        <Select placeholder='Primary Insured Gender' >
                            {genderItems.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                        </Select>

                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured Address ' name='insuredAddress'>
                        <Input placeholder='Address 1' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item name="insuredCountry" label="Insured Country">
                        <Select placeholder="Insured Country" onChange={setSelectedCountry} showSearch className='country-state-city'>
                            {countries.map((country) => (
                                <Select.Option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item name="insuredState" label="Insured State">
                        <Select placeholder="Inhsured State" disabled={!selectedCountry} onChange={setSelectedState} showSearch>
                            {states.map((state) => (
                                <Select.Option key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item name="insuredCity" label="insured City">
                        <Select placeholder="Insured City" disabled={!selectedState} showSearch className='country-state-city'>
                            {cities.map((city) => (
                                <Select.Option key={city.name} value={city.name}>
                                    {city.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured ZIP' name='insuredZIP'  >
                        <Input placeholder='Insured ZIP' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Primary Issued Date Of Birth' name='primaryIssuedDateOfBirth'>
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Insured Phone Number' name='insuredPhoneNumber'  >
                        <Input placeholder='Insured Phone Number' />
                    </Form.Item>

                </Col>

                <hr />
                <h1 className='card-title mt-3'>Client Diagnosis Codes</h1>


                <hr />
                <h1 className='card-title mt-3'>Referral, Coordinator & Service Details</h1>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Referring Physician NPI' name='referringPhysicianNPI'  >
                        <Input placeholder='Refeffing Physician NPI' />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Referring Physician Taxonomy' name='referringPhysicianTaxonomy'  >
                        <Input placeholder='Refeffing Physician Taxonomy' />
                    </Form.Item>

                </Col>
                
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Referring Physician Taxonomy #' name='referringPhysicianMedicaidNumber'  >
                        <Input placeholder='Referring Physician Medicaid #' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Referring Physician First Name' name='referringPhysicianFirstName'  >
                        <Input placeholder='Referring Physician First Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Referring Physician Middle Name' name='referringPhysicianMiddleName'  >
                        <Input placeholder='Referring Physician Middle Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Referring Physician Last Name' name='referringPhysicianLastName'  >
                        <Input placeholder='Referring Physician Last Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Referring Physician Phone' name='referringPhysicianPhone'  >
                        <Input placeholder='Referring Physician Last Phone' />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Referring Physician FAX' name='referringPhysicianFAX'  >
                        <Input placeholder='Referring Physician FAX' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Referring Physician Email' name='referringPhysicianLastEmail'  >
                        <Input placeholder='Referring Physician Email' />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Referral Exiration Date' name='referralExpirationDate' rules={[{ required: true }]} >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='MD License #' name='MDLicenseNumber'  >
                        <Input placeholder='MD License #' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Service Location' name='serviceLocation'  >
                        <Select placeholder='Choose a Service Location' >
                            {serviceLocationItems.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                        </Select>

                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Start of Service at' name='startOfServiceAt' >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Initial Assessment at' name='initialAssessmentAt' >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Initial BASP at' name='initialBASPAT' >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Coordinator Approval at' name='coordinatorApprovalAt' >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Coordinator Full Name' name='coordinatorFullName'  >
                        <Input placeholder='Coordinator Full Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Coordinator Email' name='coordinatorEmail'  >
                        <Input placeholder='Coordinator Email' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Coordinator Phone Number' name='coordinatorPhoneNumber'  >
                        <Input placeholder='Coordinator Phone Number' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Support Plan at' name='supportPlanAt' >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>

                <hr />

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Weekly BCBA/BCaBA/Analyst Hours' name='weeklyBCBABCaBAAnalystHours' >
                        <div className="d-flex gap-10">
                            <Input placeholder='Weekly BCBA/BCaBA/Analyst Hours' type='number' />
                            <p>Used to enforce limit at the client level, this could be controlled at the company level in Settings</p>
                        </div>

                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Weekly RBT/Assistant Hours' name='weeklyRBTAssistantHours' >
                        <div className="d-flex gap-10">
                            <Input placeholder='Weekly RBT/Assistant Hours' type='number' />
                            <p>Used to enforce limit at the client level, this could be controlled at the company level in Settings</p>
                        </div>

                    </Form.Item>

                </Col>

                <hr />

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item  label='Termination Date' name='terminationDate'  >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>

                <div className="d-flex gap-10">
                    <Button className='primary-button' htmlType='submit'>CREATE CLIENT</Button>
                    <Button className='secondary-button' onClick={() => navigate('/')}>CANCEL</Button>
                </div>


            </Form>


        </Layout>
    );
};

export default AddClient;

