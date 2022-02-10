import { Box } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import './AddFood.css'

const AddFood = () => {
    const { register, handleSubmit, reset} = useForm();
    const onSubmit = data =>{
      console.log(data)
    const url = 'https://morning-lowlands-71578.herokuapp.com/foods'
    axios.post(url, data)
    .then(res=>{
        if(res.data.insertedId){
            alert('food added successfully')
            reset();
        }
    })
  }
    return (
        <div>
        <h1>Add a Food</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Box> <br /> 
        <input className='reg-filed' {...register("foodName")} placeholder="Add a Food" type='text' required/>   <br />
        <input className="reg-filed" {...register("id")} placeholder="enter food code" type='text' required/>   <br />
        <input className="reg-filed" {...register("foodPrice")} placeholder="add price" type='number' required/>   <br />
        <input className="reg-btn" type="submit" value="Add this food" /> <br />

        </Box>
        </form>
    </div>
    );
};

export default AddFood;