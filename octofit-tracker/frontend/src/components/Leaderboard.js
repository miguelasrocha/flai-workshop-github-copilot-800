import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard - Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard - Processed data:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard - Error fetching data:', error);
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
          <p className="mt-3 text-muted">Loading leaderboard...</p>
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

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-dark">
          <h2 className="mb-0">🏆 Leaderboard</h2>
        </div>
        <div className="card-body">
          {leaderboard.length === 0 ? (
            <div className="alert alert-info" role="alert">
              <h5 className="alert-heading">No Leaderboard Data Found</h5>
              <p className="mb-0">There is no leaderboard data to display yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Total Points</th>
                    <th>Activities</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    const rowClass = rank <= 3 ? 'table-warning' : '';
                    return (
                      <tr key={entry.id || index} className={rowClass}>
                        <td>
                          <h4 className="mb-0">{getMedalEmoji(rank)}</h4>
                        </td>
                        <td><strong>{entry.user_name || entry.user || 'N/A'}</strong></td>
                        <td>
                          <span className="badge bg-primary fs-6">{entry.total_points || 0} pts</span>
                        </td>
                        <td>
                          <span className="badge bg-info">{entry.activity_count || 0} activities</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Competitors: <strong>{leaderboard.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
