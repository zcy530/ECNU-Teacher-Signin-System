import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css';
import Home from './pages/home.tsx';
import CourseDetail from './pages/mycourse/courseDetail.tsx';

function App() {
  return (
    <BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/coursedetail' element={<CourseDetail />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
