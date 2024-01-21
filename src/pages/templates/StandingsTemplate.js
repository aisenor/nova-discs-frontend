import React, { useState, useEffect } from 'react';

import styles from './StandingsTemplate.module.css';


const StandingsTemplate = ({ data }) => {

  const renderDayTable = (date, playerScores) => (
    <div key={date}>
      <h2>{date}</h2>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {playerScores.map(([playerID, score]) => (
            <tr key={playerID}>
              <td>{playerID}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTop5Table = (top5Players) => (
    <div>
      <h2>Top 5 Players</h2>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {top5Players.map(([playerID, score]) => (
            <tr key={playerID}>
              <td>{playerID}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={styles.page}>
      {data && data.top_3_daily && data.top_5 ? (
        <div className={styles.standings}>
          {renderTop5Table(data.top_5)}

          {Object.entries(data.top_3_daily).map(([date, playerScores]) =>
            renderDayTable(date, playerScores)
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StandingsTemplate;
