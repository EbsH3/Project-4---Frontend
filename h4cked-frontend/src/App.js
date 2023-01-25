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
import SingleEmployer from './components/SingleEmployer';
import Fancy from './components/Fancy';
import EditVacancy from './components/EditVacancy';
import Sectors from './components/Sectors';

import './styles/App.css';
import { requirePropFactory } from '@mui/material';

window.Buffer = window.Buffer || requirePropFactory('buffer').Buffer;

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/vacancies' element={<Vacancies />} />
          <Route path='/fancy' element={<Fancy />} />
          <Route path='/employers' element={<Employers />} />
          <Route path='/edit' element={<EditVacancy />} />
          <Route path='/employers/:id' element={<SingleEmployer />} />
          <Route path='/salaries' element={<Salaries />} />

          <Route path='/sectors' element={<Sectors />} />

          <Route path='/tips' element={<Tips />} />
          <Route path='/employers/:id/feedback' element={<Feedback />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
