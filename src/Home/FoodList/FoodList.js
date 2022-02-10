import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const FoodList = () => {const size = 8;
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage]=useState(0)
    const [foods, setFoods]= useState();
  
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
        },[currentPage])

        const handleChange =(event,value)=>{
            setCurrentPage(value-1); }
    return (
        <div>
            <h1 style={{marginTop:'10px'}}>Cheack food Code for <br /> withdraw your food</h1>
          <table style={{width:'90%', border: '1px solid black'}} align={'center'}>
            <tbody>
            <tr>
                <th>ID (Food Code)</th>
                <th>Food Items</th>
                <th>Price</th>

            </tr>
            {
                foods?.map(food=> <tr key={food._id}>
                
                <td style={{padding:'8px 0'}}>{food.id}</td>
                <td style={{padding:'8px 0'}}>{food.foodName}</td>
                <td style={{padding:'8px 0'}}>BDT {food.foodPrice}</td>
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

export default FoodList;