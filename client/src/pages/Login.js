import React from "react";
import styles from "../styles/Register.module.css";
import { Form, Input,message} from "antd";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../redux/features/alertSlice";
import { Link,Navigate,useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinishHandler=async(values)=>{
        try{
            dispatch(showLoading());
            const res = await axios.post('http://localhost:8080/api/v1/user/login',values);
            dispatch(hideLoading());
            if(res.data.success){
                localStorage.setItem('token',res.data.token);   
               message.success('Login Successfully');
               return <Navigate to="/" />;
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            dispatch(hideLoading());
           console.log(error);
           message.error("Something went wrong");
        }
     }
     return (
         <>
           <div className={styles.formContainer} >
             <Form layout="vertical" className={styles.registerForm} onFinish={onFinishHandler}>
                 <h3>Login Form</h3>
                 <Form.Item label="Email" name="email">
                     <Input type="email" placeholder="abc@gmail.com" required />
                 </Form.Item>
                 <Form.Item label="Password" name="password">
                     <Input type="password" placeholder="User Name" required />
                 </Form.Item>
                 <Link to="/register" className="m-2">
                    Not a user|Register here
                 </Link>
                 <button className="btn btn-primary" type="submit">Login</button>
             </Form>
           </div>
         </>
     );
}

export default Login;