import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './component/Nav.jsx';
import Home from './component/Home.jsx';
// import Visreg from './component/Visreg.jsx';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route exact path="/" element={<Home/>} />
        {/* <Route path="visreg" element={<Visreg/>} /> */}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
)