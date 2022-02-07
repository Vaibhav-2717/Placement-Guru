import React from "react";
import { Row, Col, Form, Input, Button , message } from "antd";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
function Register() {
     const dispatch = useDispatch()
    function register(values){
       if(!values.username.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       )){
         message.error('Email pattern is not valid')
       }else if(values.password.length<6){
        alert("Password must be at least 6 characters long.");  
       }
        else if(values.password!==values.confirmpassword){
                 message.error('passwords not matched')
        }else{
            console.log(values)
            dispatch(registerUser(values))
        }

    }

  return (
    <div className="register">
      <Row justify="center" className='flex align-items-center'>
      <Col lg={5}><h1 className="heading1" data-aos='slide-right'>Dream</h1></Col>
        <Col lg={10} sm={24} className="bs p-5 register-form">
          <h3>Register</h3>
          <hr />
          <Form layout="vertical" onFinish={register}>
            <Form.Item
              label="Email"
              name="username"
              rules={[{ required: true }]}
            >
              <Input type="email"/>
            </Form.Item>

            <Form.Item
              label="password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input type="password"/>
            </Form.Item>

            <Form.Item
              label="confirm password"
              name="confirmpassword"
              rules={[{ required: true }]}
            >
              <Input type="password"/>
            </Form.Item>

            <Button htmlType="submit" className='mb-3' >Register</Button> <br />

            <Link to='/login' className='mt-3'>Already registered ? , Click here to login</Link>
          </Form>
        </Col>
        <Col lg={4}><h1 className='heading2'  data-aos='slide-left'>Jobs</h1></Col>
      </Row>
    </div>
  );
}

export default Register;
