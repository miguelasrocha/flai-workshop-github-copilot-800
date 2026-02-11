import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Users - Processed data:', usersData);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Users - Error fetching data:', error);
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
          <p className="mt-3 text-muted">Loading users...</p>
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

  const getFitnessLevelBadge = (level) => {
    const levelLower = (level || '').toLowerCase();
    if (levelLower === 'beginner') return 'bg-info';
    if (levelLower === 'intermediate') return 'bg-warning';
    if (levelLower === 'advanced') return 'bg-danger';
    return 'bg-secondary';
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white">
          <h2 className="mb-0">👤 Users</h2>
        </div>
        <div className="card-body">
          {users.length === 0 ? (
            <div className="alert alert-info" role="alert">
              <h5 className="alert-heading">No Users Found</h5>
              <p className="mb-0">There are no users to display yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Fitness Level</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index}>
                      <td><strong>{user.username || 'N/A'}</strong></td>
                      <td>{user.email || 'N/A'}</td>
                      <td>{user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A'}</td>
                      <td>
                        <span className={`badge ${getFitnessLevelBadge(user.fitness_level)}`}>
                          {user.fitness_level || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Users: <strong>{users.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Users;
