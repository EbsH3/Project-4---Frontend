import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Vacancies from './components/Vacancies';
import Employers from './components/Employers';
import Salaries from './components/Salaries';
import Tips from './components/Tips';
import Feedback from './components/Feedback';
import Navbar from './components/Navbar';

import './styles/App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/vacancies' element={<Vacancies />} />
          <Route path='/employers' element={<Employers />} />
          <Route path='/salaries' element={<Salaries />} />
          <Route path='/tips' element={<Tips />} />
          <Route path='/feedback/add' element={<Feedback />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
