// import { Table } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./StudentTable.css"
import { Button, Checkbox } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const StudentTable = () => {
    
    const size = 8;
    const [students, setStudents]= useState();
    const [active, setActive]= useState([]);
    const [inActive, setInActive]= useState([]);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage]=useState(0)
    const [num,setNum]=useState(0);
    //for total data length
    useEffect(()=>{
        const url="https://morning-lowlands-71578.herokuapp.com/students";
        fetch(url)
        .then(res=>res.json())
        .then(data=>setPages(Math.ceil(data.count/size)))
        },[pages])

    useEffect(()=>{
    const url = `https://morning-lowlands-71578.herokuapp.com/students?currentPage=${currentPage}&&size=${size}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{setStudents(data.result);})
    },[currentPage,num])
    const handleChange =(event,value)=>{
       setCurrentPage(value-1);
    }

//    delete handler////
        const deleteHandler= id =>{
            const doYou = window.confirm('You are going to remove this student from list')
        if(doYou){
            fetch(`https://morning-lowlands-71578.herokuapp.com/students/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                setNum(num=>num+1)
                alert('student removed successfully')
            }})
        }}

        ///handleStatus
        const makeActiveHandler=()=>{
            // let activeElement=[]
        }
        const makeInActiveHandler=()=>{
            // let inActiveElement=[]
        }
    return (
        <div>
            <h1 style={{marginTop:'-10px'}}>Student Managment Table</h1>
          <table style={{width:'100%', border: '1px solid black'}}>
            <tbody>
            <tr>
                <th>Roll</th>
                <th>Name</th>
                <th>Class</th>
                <th>Update</th>
                <th>Status</th>  
                <th>Manage</th>  
            </tr>
            {
                students?.map(student=> <tr key={student.id}>
                
                <td>{student.roll}</td>
                <td>{student.fullName}</td>
                <td>{student.class}</td>
                <td>
                <Checkbox
                onChange={e=>setInActive(e.target.value)}
                /> 
                </td>
                <td>{student.status}</td>
                <td><button onClick={()=>deleteHandler(student._id)}>Delete</button></td>
            </tr>)
            }
            
            </tbody>
            </table>
            <Button style={{backgroundColor:'#064b9e',color:'#fff', margin:'20px',width:'150px'}} onClick={()=>makeActiveHandler()}>Make Active</Button>
            <Button style={{backgroundColor:'#064b9e',color:'#fff', margin:'20px',width:'150px'}} onClick={()=>makeInActiveHandler()}>Make inInactive</Button>
            <Stack spacing={1}
            sx={{alignItems:'center',mt:5}}
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

export default StudentTable;