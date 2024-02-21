import '../styles/register.css'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'


const Login = () => {
  const {loading} = useSelector((state) => state.alert);
  console.log(loading)
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/user/login', values);
      if(response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home Page")
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      toast.error('Something went wrong');
    }
  }




  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item label = 'Email' name='email'>
            <Input placeholder='Email'/>
          </Form.Item>

          <Form.Item label = 'Password' name='password'>
            <Input placeholder='Password' type='password'/>
          </Form.Item>

          <Button className='primary-button mt-3 my-2' htmlType='submit'>LOGIN</Button>
          <Link to='/register' className='anchor mt-2'>Click here Register</Link>

        </Form>
      </div>
    </div>
  )
}

export default Login