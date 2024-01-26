import React, { useState } from 'react';
import styles from './MyScoresTemplate.module.css';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const MyScoresTemplate = () => {
    const [playerId, setPlayerId] = useState('');
    const [scores, setScores] = useState([]);
    const [error, setError] = useState(null); // New state for error handling
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleInputChange = (e) => {
        setPlayerId(e.target.value);
    };

    const fetchPuttingLeagueScores = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/putting_league/?player=${playerId}`);
            if (!response.ok) {
                throw new Error(`Error fetching putting league scores: ${response.status}`);
            }

            const data = await response.json();

            // Sort by date in descending order, then by score in ascending order
            const sortedScores = data.sort((a, b) => {
                // Sort by score in descending order
                if (a.score < b.score) return 1;
                if (a.score > b.score) return -1;

                // If scores are equal, sort by date in descending order
                if (a.date < b.date) return 1;
                if (a.date > b.date) return -1;

                return 0; // If scores and dates are equal
            });
            setScores(sortedScores);
        } catch (error) {
            console.error(error.message);
            setError(`Player with ID ${playerId} not found.`);
            setScores([]); // Clear scores in case of an error
        }
    };

    const handleHeaderClick = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedScoresByColumn = scores.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        // Handle undefined values
        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;

        // Use the default comparison for strings and numbers
        if (sortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
        }
    });

    return (
        <div>
            <div className={styles.page}>
                <div className={styles.funForm}>
                    <label>Enter PDGA ID:</label>
                    <input type="text" value={playerId} onChange={handleInputChange}/>
                    <button className={styles.buttonStyle} onClick={fetchPuttingLeagueScores}>Fetch Scores</button>
                </div>
            </div>

            {error && <p style={{color: 'red'}}>{error}</p>}

            <div className={styles.page}>
                {scores.length > 0 && (
                    <table className={styles.styledTable}>
                        <thead>
                        <tr>
                            <th onClick={() => handleHeaderClick('date')}>
                                Date {sortColumn === 'date' && (sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
                            </th>
                            <th onClick={() => handleHeaderClick('score')}>
                                Score {sortColumn === 'score' && (sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedScoresByColumn.map((score) => (
                            <tr key={score.id}>
                                <td>{score.date}</td>
                                <td>{score.score}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
};

export default MyScoresTemplate;
