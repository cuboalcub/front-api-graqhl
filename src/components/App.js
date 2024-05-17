import { Component } from 'react';
import '../styles/App.css';
import GatosList from './GatosList';
import CrearGatos from './CrearGatos';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Login from './Login';

const App = () => {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Routes>
            <Route path="/" element={<GatosList/>} />
            <Route
              path="/create"
              element={<CrearGatos/>}
            />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </div>
  
  );
};

export default App;
