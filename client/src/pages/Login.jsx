import '../styles/register.css'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import logo from '../assets/HarmonyLogo.png'


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/login', values);
      dispatch(hideLoading())
      if(response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home Page")
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      dispatch(hideLoading())
      toast.error('Something went wrong');
    }
  }




  return (
    <div className='authentication'>
        <img src={logo} alt='Harmony Logo'/>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item label = 'Email' name='email'>
            <Input placeholder='Email'/>
          </Form.Item>

          <Form.Item label = 'Password' name='password'>
            <Input placeholder='Password' type='password'/>
          </Form.Item>

          
          <Button className='primary-button mt-3 my-2 full-width-button' htmlType='submit'>LOGIN</Button>
          <Link to='/register' className='anchor mt-2'>Click here Register</Link>
          

     

        </Form>
      </div>
    </div>
  )
}

export default Login
