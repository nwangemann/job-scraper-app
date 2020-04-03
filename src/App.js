import React from 'react';
import './App.scss';
import './reset.css'
import routes from './routes'
import Header from './Components/Header/Header'

function App() {
  return (
    <div className="App">
     <Header />
      <div className="content">
      {routes}
      </div>
    </div>
  );
}

export default App;
