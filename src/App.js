import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Menu from './components/Menu';
import RegisterOTP from './components/Register/RegisterOTP';
import LoginOtp from './components/Login/LoginOtp';

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register props={navigate} />} />
        <Route path="/auth/register/verify" element={<RegisterOTP />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/login/verify" element={<LoginOtp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu/:id" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default App;
