import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Student.css'
const StudentStatus = () => {
    const size = 12;
    const [students, setStudents]= useState();
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage]=useState(0)
    const [roll, setRoll]=useState();
    console.log(roll);

    //for total data length
    useEffect(()=>{
        const url=`http://localhost:5000/students?roll=${roll}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setPages(Math.ceil(data.count/size)))
        },[pages,roll])

    useEffect(()=>{
    const url = `http://localhost:5000/students?currentPage=${currentPage}&&size=${size}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{setStudents(data.result);})
    },[currentPage])
    const handleChange =(event,value)=>{
       setCurrentPage(value-1);
    }

    return (
        <div>
            <h1 style={{marginTop:'10px'}}>Student Managment Table</h1>
            <form>
                  <input onChange={e=>setRoll(e.target.value)}
                  style={{width:'50%',padding:'10px',marginBottom:'20px',fontSize:'large'}}
                  type="text" placeholder='enter student roll for details' />
              </form>
          <table style={{width:'90%', border: '1px solid black'}} align="center">
              
            <tbody className='student-table'>
            <tr>
                <th>Roll</th>
                <th>Name</th>
                <th>Class</th>
                <th>Hall</th>
                <th>Status</th>  
            </tr>
            {
                students?.map(student=> <tr key={student.id}>
                <td>{student.roll}</td>
                <td>{student.fullName}</td>
                <td>{student.class}</td>
                <td> {student.hallName}</td>
                <td>{student.status}</td>  
            </tr>)
            }
            
            </tbody>
            </table>
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

export default StudentStatus;