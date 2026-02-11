import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts - Processed data:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading workouts...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    const difficultyLower = (difficulty || '').toLowerCase();
    if (difficultyLower === 'beginner') return 'bg-success';
    if (difficultyLower === 'intermediate') return 'bg-warning';
    if (difficultyLower === 'advanced') return 'bg-danger';
    return 'bg-secondary';
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-danger text-white">
          <h2 className="mb-0">💪 Workouts</h2>
        </div>
        <div className="card-body">
          {workouts.length === 0 ? (
            <div className="alert alert-info" role="alert">
              <h5 className="alert-heading">No Workouts Found</h5>
              <p className="mb-0">There are no workouts to display yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout.id || index}>
                      <td><strong>{workout.name || 'N/A'}</strong></td>
                      <td>{workout.description || 'No description'}</td>
                      <td>
                        <span className="badge bg-secondary">{workout.category || 'N/A'}</span>
                      </td>
                      <td>
                        <span className={`badge ${getDifficultyBadge(workout.difficulty_level)}`}>
                          {workout.difficulty_level || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info">{workout.duration || 0} min</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Workouts: <strong>{workouts.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
