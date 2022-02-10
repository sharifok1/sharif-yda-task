import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./ServeFood.css"

const ServeFood = () => {
    const size = 8;
    const [students, setStudents]= useState()
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage]=useState(0)
    const [addDate,setAddDate]=useState('')
    const [shift,setShift]=useState('')
    const [roll,setRoll]=useState('')
    const [foodCode,setFoodCode]=useState('')
    const [render,setRender]=useState(0)
    const [newServ,setnewServ]=useState()
    // search data//
    const { register, handleSubmit} = useForm();
    const onSubmit = data =>{
        setAddDate(data.date)
        setShift(data.shift)
        setRoll(data.roll) 
    }
    useEffect(()=>{
        const url=`https://morning-lowlands-71578.herokuapp.com/findServed?roll=${roll}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setnewServ(data));
    },[roll])

console.log(addDate,shift,roll);
    //for total data length
    useEffect(()=>{
        const url="https://morning-lowlands-71578.herokuapp.com/servedStudent";
        fetch(url)
        .then(res=>res.json())
        .then(data=>setPages(Math.ceil(data.count/size)))
        },[])
    useEffect(()=>{
    const url = `https://morning-lowlands-71578.herokuapp.com/servedStudent?currentPage=${currentPage}&&size=${size}&addDate=${addDate}&shift=${shift}&roll=${roll}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{setStudents(data.result);})
    },[currentPage,render,roll])
    // console.log(students);
   const handleChange =(event,value)=>{
       setCurrentPage(value-1);
    //    console.log(currentPage);
   }
   const newServedHandler=(served,_id)=>{
    console.log(_id, foodCode,shift, addDate);

    const url = "https://morning-lowlands-71578.herokuapp.com/servedStudent/served"
             fetch(url,{
               method:'PUT',
               headers:{
                'content-type':"application/json"
              },
              body:JSON.stringify({id:_id,served:served,foodCode:foodCode,shift:shift,date:addDate})
            })
            .then(res=>{
                if(res.status)
                alert('successfully served')
                setRender(1)
            })   
        }
    return (
        <div>
            <div>
                <h2 style={{marginTop:'-10px'}}>Serve Daily food</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="input-field">  
                <div>
                    <input className="serve-in" {...register("date")} placeholder="date" type='date' required/>   
                    <select className='serve-in' {...register("shift")} placeholder='status'>
                    <option value="shift">shift</option>
                    <option value="breakfast">breakfast</option>
                    <option value="lunch">lunch</option>
                    <option value="dinner">dinner</option>
                    </select>  
                    <input className="serve-in" {...register("roll")} placeholder="roll" type='number' required/>  
                    <input className="serve-in" type="submit" value="Search Student" />
                </div> 
                <div className='status-part'>
                   {
                       newServ?.map(student=><div
                       key={student._id}
                       >
                           <h3>Student Name:{student.fullName}</h3>
                           <h3>Roll: {student.roll}</h3>
                           <Box style={{backgroundColor:'#0ff'}}>Status:{student.served?student.served:<p>Not Served</p>}</Box>
                       </div>)
                   }
                </div> 
                
                </Box>
        </form>
            </div>

           <table style={{width:'100%', border: '1px solid black'}}>
            <tbody>
            <tr>
                <th>Date</th>
                <th>Shift</th>  
                <th>Name</th>
                <th>Roll</th>
                <th>Class</th>
                <th>Food(Code)</th>   
                <th>Status</th>  
            </tr>
            {
                students?.map(student=> <tr key={student.id} setRender={setRender}>
                <td>
                    {
                        student.date?<span>{student.date}</span>:
                        <span>{addDate}</span>
                    }
                </td>
                <td>{
                student.shift?<span>{student.shift}</span>:<span>{shift}</span>
                }</td>
                 <td>{student.fullName}</td>
                <td>{student.roll}</td>
                <td>{student.class}</td>
                <td>{student.foodCode?<span style={{padding:'5px'}}>{student.foodCode}</span>:
                     <form>
                         <input style={{border:'none',padding:'5px'}} type='number' onChange={e=>setFoodCode(e.target.value)} placeholder="enter food code" required/>
                    </form>}
                </td>
                <td> {
                    student.served?<span>{student.served}</span> :
                    <Button
                    onClick={()=>newServedHandler('alreadyServed',student._id)}
                    >Serve Now</Button>
                     }
                </td>
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

export default ServeFood;