import React from 'react';
import './css/style.css';
import WebRoute from './components/WebRoute';
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <WebRoute>

      </WebRoute>
    </div>
  );
}

export default App;
