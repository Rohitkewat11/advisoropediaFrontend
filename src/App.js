import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Home} from "./component/home/home";
import { Login } from "./component/login/login";
import { Register } from "./component/register/register";
import { DashBoard } from "./component/dashboard/dashboard";
import { Details } from "./component/details/details";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />2
          <Route path="dashboard" element={<DashBoard />}/>
          <Route path="dashboard/details" element={<Details />}/>
          <Route path="*" element={<><h2>Invalid Requested.</h2></>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
