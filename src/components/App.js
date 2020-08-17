import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import Clinic from './clinic/Clinic';
import Header from './Header';
import Chatbot from './chatbot/Chatbot';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div style={{overflowY: 'hidden'}}>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/about' component={About} />
          <Route exact path='/clinic' component={Clinic} />
          <Chatbot />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
