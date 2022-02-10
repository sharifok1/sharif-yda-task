import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddStudent = () => {
    const { register, handleSubmit, reset} = useForm();
    const onSubmit = data =>{
      // save student data for management
    const url = 'https://morning-lowlands-71578.herokuapp.com/students'
    axios.post(url, data)
    .then(res=>{
        if(res.data.insertedId){
            // alert('student added successfully confirmed')
            // reset();
        }
    });

    // save data sefarate for serve food
    const urls = 'https://morning-lowlands-71578.herokuapp.com/servedStudent'
      axios.post(urls, data)
      .then(res=>{
          if(res.data.insertedId){
              alert('student added successfully confirmed')
              reset();
          }
      })
    
  }
    return (
        <div>
        <br />
       <h3 >
           Add Student 
       </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
    <div className='studentformPage'>
    <input className='reg-filed' {...register("fullName")} placeholder='Student full name' required />
    <input className='reg-filed' {...register("roll")} placeholder='roll' type="text" required />
    <input className='reg-filed' {...register("age")} placeholder='age' required />
    <input className='reg-filed' {...register("class")} placeholder='class' required />
    <input className='reg-filed' {...register("hallName")} placeholder='hall name' required />
    <select className='reg-filed' {...register("status")} placeholder='status'>
      <option  value="Active">Active</option>
      <option className='formOption' value="inActive">inActive</option>
    </select>
    <input className='reg-btn' type="submit" />
    </div>
  </form>
   </div>
    );
};

export default AddStudent;