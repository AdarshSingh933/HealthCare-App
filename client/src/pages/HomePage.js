import React,{useEffect} from "react";
import axios from 'axios';
import Layout from "../components/Layout";

function HomePage(){
    const getUserData = async()=>{
        try{
            const res = await axios.post('http://localhost:8080/api/v1/user/getUserData',{},{
                headers:{
                    Authorization:"Bearer " + localStorage.getItem('token'),
                }
            })
        }catch(error){
            console.log("error in gettingUserData",error);
        }
    }
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <>
        <Layout>
           <h1>HomePage</h1>
        </Layout>
        </>
    );
}

export default HomePage;