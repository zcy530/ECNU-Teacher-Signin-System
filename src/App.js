import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css';
import Home from './pages/home.tsx';
import CourseDetail from './pages/mycourse/courseDetail.tsx';
import Login from './pages/login/login.tsx';

function App() {
  return (
    <BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
