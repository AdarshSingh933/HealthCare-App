import React from "react";
import styles from "../styles/Register.module.css";
import { Form, Input, message} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register(){
    const navigate = useNavigate();
    const onFinishHandler= async(values)=>{
      console.log(values);
       try{
        const res = await axios.post('http://localhost:8080/api/v1/user/register', values);
          console.log(res);
          if(res.data.success){
            message.success('Register successfully');
            navigate('/login');
          }else{
            message.error(res.data.message);
          }
       }catch(error){
          console.log(error);
          message.error("Something went wrong");
       }
    }
    return (
        <>
          <div className={styles.formContainer} >
            <Form layout="vertical" className={styles.registerForm} onFinish={onFinishHandler}>
                <h3>Register Form</h3>
                <Form.Item label="Name" name="name">
                    <Input type="text" placeholder="abc" required />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email" placeholder="abc@gmail.com" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" placeholder="User Name" required />
                </Form.Item>
                <Link to="/login" className="m-2">
                    Already user login here
                </Link>
                <button className="btn btn-primary" type="submit">Register</button>
            </Form>
          </div>
        </>
    );
}

export default Register;