import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Shared = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static"
        style={{backgroundColor:'#123'}}
        >
            <Toolbar variant="dense">
            
            <Typography variant="h6" color="inherit" component="div" sx={{m:2, mx:2}}>
                    <NavLink to="/StudentStatus" style={{color:'#ddd',textDecoration:'none'}}>Student Status</NavLink> 
            </Typography>
            <Typography variant="h6" color="inherit" component="div" sx={{m:2, mx:2}}>
                    <NavLink to="/FoodList" style={{color:'#ddd',textDecoration:'none'}} >Food List</NavLink> 
            </Typography>
            <Typography variant="h6" color="inherit" component="div" sx={{m:2, mx:2}}>
                    <NavLink to="/DeshBoard" style={{color:'#ddd',textDecoration:'none'}} >Dashboard</NavLink> 
            </Typography>
            </Toolbar>
        </AppBar>
        </Box>
    );
};

export default Shared;