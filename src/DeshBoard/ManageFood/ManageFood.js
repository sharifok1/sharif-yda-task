import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ManageFood = () => {
    
    const size = 8;
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage]=useState(0)
    const [foods, setFoods]= useState();
    const [num,setNum]=useState(0);
//for total data length
useEffect(()=>{
    const url="http://localhost:5000/foods";
    fetch(url)
    .then(res=>res.json())
    .then(data=>setPages(Math.ceil(data.count/size)))
    },[pages]);

    useEffect(()=>{
        const url = `http://localhost:5000/foods?currentPage=${currentPage}&&size=${size}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>{setFoods(data.result);})
        },[currentPage,num])

        const handleChange =(event,value)=>{
            setCurrentPage(value-1); }

        // delete handler//
        const deleteHandler= id =>{
            const doYou = window.confirm('You are going to delete this item')
        if(doYou){
            fetch(`http://localhost:5000/foods/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                setNum(num=>num+1)
                alert('successfully revoved this food')
            }})
        }}
        
    return (
        <div>
            <h1 style={{marginTop:'-10px'}}>Food Managment Table</h1>
          <table style={{width:'100%', border: '1px solid black'}}>
            <tbody>
            <tr>
                <th style={{padding:'8px 0'}}>ID</th>
                <th style={{padding:'8px 0'}}>Items Name</th>
                <th style={{padding:'8px 0'}}>Price</th>
                <th style={{padding:'8px 0'}}>Manage</th>  
            </tr>
            {
                foods?.map(food=> <tr key={food._id}>
                
                <td style={{padding:'8px 0'}}>{food.id}</td>
                <td style={{padding:'8px 0'}}>{food.foodName}</td>
                <td style={{padding:'8px 0'}}>BDT {food.foodPrice}</td>

                <td style={{padding:'8px 0'}}><button onClick={()=>deleteHandler(food._id)}>Delete</button></td>
            </tr>)
            }
            </tbody>
            </table>
            <Stack spacing={1}
            sx={{alignItems:'center',mt:10}}
            >
                <Pagination 
                    count={pages} 
                    variant="outlined" 
                    color="primary"
                    onChange={handleChange}
                    />
            </Stack>
        </div>
    );
};

export default ManageFood;