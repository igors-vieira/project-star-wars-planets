import React from 'react';
import './css/App.css';
import Table from './components/Table';
import StarProvider from './context/StarProvider';
// import logo from './css/projectIntro.svg';

function App() {
  return (
    <StarProvider>
      <div className="image">
        <img src="https://sm.ign.com/ign_pt/screenshot/default/star-wars-logo_k6qf.jpg" alt="StarWarsImg" width="500" />
      </div>
      <Table />
    </StarProvider>
  );
}

export default App;
