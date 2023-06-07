import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from the API
    fetch(process.env.REACT_APP_GOOGLE_SHEET_API)
      .then((response) => response.json())
      .then((data) => setLeaderboardData(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(process.env.REACT_APP_GOOGLE_SHEET_API)

  // Assign levels to each key
  // Access the environment variable and assign levels to each key
  const levelsString = process.env.REACT_APP_LEVELS || '';
  const levels = Object.fromEntries(
    levelsString.split(',').map((entry) => {
      const [key, value] = entry.split('=');
      return [key, parseInt(value)];
    })
  );

  // Sort the leaderboardData array based on the level assigned to each key in descending order
  leaderboardData.sort((a, b) => levels[b.Key] - levels[a.Key]);

  return (
    <div>
      <div className="agenda-hero-title">
        The Enigma Sequence<br />
        <span className="subtitle-agenda-hero">Leaderboard for your key submissions</span>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <div className="row-content">Timestamp</div>
              </th>
              <th>
                <div className="row-content">Name</div>
              </th>
              {/* <th>
                <div className="row-content">Key</div>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player) => (
              <tr>
                <td>
                  <div className="row-content timing">{player.Timestamp}</div>
                </td>
                <td>
                  <div className="row-content"><strong>{player.Name}</strong></div>
                </td>
                {/* <td>
                  <div className="row-content">{player.key}</div>
                </td> */}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
