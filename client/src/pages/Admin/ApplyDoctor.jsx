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
import '../../styles/applyDoctor.css';

const ApplyDoctor = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    dayjs.extend(customParseFormat);

    //The countries, cities and states
    const countries = Country.getAllCountries();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);


    const dateFormat = 'YYYY-MM-DD';


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

    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/admin/apply-doctor-account', { ...values, userId: user._id }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, });
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

    const onLanguageCheckboxChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };


    //The Tax Type Dropdown
    const taxItems = [
        '1099',
        'W2',
    ];




    //The Therapist Type dropdown

    const therapistItems = [
        'RBT (Assistant)',
        'BCBA',
        'BCaBA',
        'Anaylst/LMHC',
    ]

    const genderItems = [
        'Male',
        'Female',
        'Non-Binary',
        'Other',
        'Prefer not to say'
    ]

    const languageOptions = [
        {
            label: 'English',
            value: 'English',
        },
        {
            label: 'Spanish',
            value: 'Spanish',
        },
        {
            label: 'Other',
            value: 'Other',
        },
    ];



    return (
        <Layout>
            <h1 className='page-title'>Add Therapist</h1>
            <hr />
            {/* <h1 className='card-title mt-3'>Personal Credentials</h1> */}

            <Form layout='vertical' onFinish={onFinish}>


                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Tax Type' name='taxType' rules={[{ required: true }]} >
                        <Select placeholder='Tax Type' >
                            {taxItems.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                        </Select>

                    </Form.Item>

                </Col>




                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Therapist type' name='therapistType' rules={[{ required: true }]} >
                        <Select placeholder='Therapist Type' >
                            {therapistItems.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                        </Select>

                    </Form.Item>

                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Therapist Level' name='therapistLevel' >
                        <div className="d-flex gap-10">
                            <Input placeholder='Therapist Level' />
                            <p>Optional: Only needed if you defined a Therapist Type with a level, BCBA = Level 1, BCaBA = Level 3</p>
                        </div>

                    </Form.Item>

                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Company Name' name='companyName'  >
                        <Input placeholder='Company Name' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='FEIN' name='fein'  >
                        <Input placeholder='FEIN' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='NPI' name='npi'  >
                        <Input placeholder='NPI' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Provider ID' name='providerID'  >
                        <Input placeholder='Provider ID' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='State License Number' name='stateLicenseNumber'  >
                        <Input placeholder='State License Number' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='CAQH ID' name='caqh id'  >
                        <Input placeholder='CAQH ID' />
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





                <hr />
                <h1 className='card-title mt-3'>Personal Credentials</h1>



                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Date Of Birth' name='dateOfBirth' rules={[{ required: true }]} >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Education' name='education'  >
                        <Input placeholder='Education' />
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

                <hr />

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item label='Languages' name='languages'  >
                        <Checkbox.Group options={languageOptions} onChange={onLanguageCheckboxChange} />
                    </Form.Item>

                </Col>






                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Email' name='email' rules={[{ required: true }]} >
                        <Input placeholder='Email' />
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Phone Number' name='phoneNumber' rules={[{ required: true }]} >
                        <Input placeholder='Phone Number' />
                    </Form.Item>
                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Address 1' name='address1' rules={[{ required: true }]}>
                        <Input placeholder='Address 1' />
                    </Form.Item>

                </Col>

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item  label='Address 2' name='address2'>
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

                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item required label='Hire Date' name='hireDate' rules={[{ required: true }]} >
                        <DatePicker
                            initialValues={dayjs().format(dateFormat)}
                        />
                    </Form.Item>

                </Col>

                <div className="d-flex gap-10">
                    <Button className='primary-button' htmlType='submit'>SAVE THERAPIST</Button>
                    <Button className='secondary-button' onClick={() => navigate('/')}>CANCEL</Button>
                </div>
            </Form>
        </Layout>
    );
};

export default ApplyDoctor;



