import React, { Fragment } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Main from './main';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
              <Routes>
              <Route path='/' element={<Main/>}/>
              
              </Routes>
          </BrowserRouter>
    </Fragment>
  );
}

export default App;
