import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <span className="octofit-logo">💪</span>
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container mt-4">
              <div className="hero-section">
                <h1>Welcome to OctoFit Tracker</h1>
                <p className="lead">Track your fitness activities, join teams, and compete on the leaderboard!</p>
              </div>
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">👤 Users</h5>
                      <p className="card-text">Manage user profiles and fitness levels</p>
                      <Link to="/users" className="btn btn-primary">View Users</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">🏃 Activities</h5>
                      <p className="card-text">Track all logged fitness activities</p>
                      <Link to="/activities" className="btn btn-primary">View Activities</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">💪 Workouts</h5>
                      <p className="card-text">Browse personalized workout plans</p>
                      <Link to="/workouts" className="btn btn-primary">View Workouts</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">👥 Teams</h5>
                      <p className="card-text">Create and join fitness teams</p>
                      <Link to="/teams" className="btn btn-primary">View Teams</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">🏆 Leaderboard</h5>
                      <p className="card-text">Compete for the top spot</p>
                      <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
