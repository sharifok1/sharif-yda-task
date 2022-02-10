// import logo from './logo.svg';
import { Route,  BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import AddFood from './DeshBoard/AddFood/AddFood';
import AddStudent from './DeshBoard/AddStudent/AddStudent';
import DeshBoardMain from './DeshBoard/DeshBoardMain/DeshBoardMain';
import ManageFood from './DeshBoard/ManageFood/ManageFood';
import ServeFood from './DeshBoard/ServeFood/ServeFood';
import StudentTable from './DeshBoard/StudentTable/StudentTable';
import Shared from './Home/Shared/Shared';
import Home from './Home/Home';
import StudentStatus from './Home/StudentStatus/StudentStatus';
import FoodList from './Home/FoodList/FoodList';


function App() {
  return (
    <div className="App">
          <Router>
              <Shared></Shared>
            <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/Home' element={<Home></Home>}></Route>
            <Route path='/StudentStatus' element={<StudentStatus></StudentStatus>}></Route>
            <Route path='/FoodList' element={<FoodList></FoodList>}></Route>
            <Route path="/DeshBoard" element={<DeshBoardMain></DeshBoardMain>}>
              <Route path="AddFood" element={<AddFood></AddFood>}></Route>
              <Route path="AddStudent" element={<AddStudent></AddStudent>}></Route>
              <Route exact path="" element={<StudentTable></StudentTable>}></Route>
              <Route path="StudentTable" element={<StudentTable></StudentTable>}></Route>
              <Route path="ServeFood" element={<ServeFood></ServeFood>}></Route>
              <Route path="ManageFood" element={<ManageFood></ManageFood>}></Route>
              
            </Route>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
