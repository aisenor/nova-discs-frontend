import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Standings from './pages/Standings';
import Scorecard from './pages/Scorecard';
import Players from './pages/Players';
import MyScores from './pages/MyScores';
import Navbar from './components/Navbar';
import Stamps from "./pages/Stamps";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    // Update the URL as needed
      fetch(`${process.env.REACT_APP_API_URL}/`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/standings" element={<Standings data={data} />} />
        <Route path="/scorecard" element={<Scorecard data={data} />} />
        <Route path="/players" element={<Players data={data} />} />
        <Route path="/my_scores" element={<MyScores data={data} />} />
        <Route path="/stamps" element={<Stamps data={data} />} />
      </Routes>
    </Router>
  );
}

export default App;