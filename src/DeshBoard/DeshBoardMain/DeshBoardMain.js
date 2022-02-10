import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  NavLink,
    Outlet,
      } from "react-router-dom";
const drawerWidth = 200;
function DeshBoardMain(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (

    <div  style={{backgroundColor:'#ccc',color:'#fff', height:'100vh'}}>
      <Toolbar />
      <Box sx={{textAlign:'start'}}>
      <Divider />
      <NavLink to="/Home" style={{textDecoration:'none',marginLeft:'20px',fontSize:'20px',color:'#333'}}>Home</NavLink>
      <Divider />
      <NavLink to="AddFood" style={{textDecoration:'none',marginLeft:'20px',fontSize:'20px',color:'#333'}}>Add Food</NavLink>
      <Divider />
      <NavLink to="AddStudent" style={{textDecoration:'none',marginLeft:'20px',fontSize:'20px',color:'#333'}}>Add Student</NavLink>
      <Divider />
      <NavLink to="StudentTable" style={{textDecoration:'none',marginLeft:'20px',fontSize:'20px',color:'#333'}}>Student Table</NavLink>
      <Divider />
      <NavLink to="ServeFood" style={{textDecoration:'none',marginLeft:'20px',fontSize:'20px',color:'#333'}}>Serve Food</NavLink>
      <Divider />
      <NavLink to="ManageFood" style={{textDecoration:'none',marginLeft:'20px',fontSize:'20px',color:'#333'}}>Manage Food</NavLink>
      <Divider />
      </Box>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{backgroundColor:'#123'}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          Yooda Hostel
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
          <Outlet>
            
          </Outlet>
        <Box sx={{ flexGrow: 1 }}>
        </Box>
      </Box>
    </Box>
  );
}

DeshBoardMain.propTypes = {
  window: PropTypes.func,
};

export default DeshBoardMain;