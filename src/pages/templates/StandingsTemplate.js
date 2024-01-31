import React from 'react';

import styles from './StandingsTemplate.module.css';


const StandingsTemplate = ({ data }) => {

  const renderDayTable = (date, playerScores, hotRound) => (
      <div key={date}>
        <h2>{date}</h2>
        <h3>
          {hotRound[date] ? `${Object.keys(hotRound[date])[0]}: ${hotRound[date][Object.keys(hotRound[date])[0]]} ` : 'N/A'}
        </h3>

        {/*<h2>{hotRound}</h2>*/}
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
      {data && data.top_3_daily && data.top_5 && data.hot_round ? (
        <div className={styles.standings}>
          {renderTop5Table(data.top_5)}

          {Object.entries(data.top_3_daily).map(([date, playerScores]) =>
            renderDayTable(date, playerScores, data.hot_round)
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StandingsTemplate;
