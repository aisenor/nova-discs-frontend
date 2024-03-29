import React, { useState, useEffect } from 'react';
import { MdSwipeLeft } from "react-icons/md";

import styles from './Scorecard.module.css'


const ScorecardTemplate = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    date: getCurrentDate(),
    player: '',
    score: '',
  });

  const [selectedDate, setSelectedDate] = useState(getCurrentDate()); // State variable for selected date

  const [checkedBoxes, setCheckedBoxes] = useState(Array(25).fill(false));
  const checkboxValues = [
    1, 2, 3, 4, 5,
    1, 2, 3, 4, 5,
    1, 2, 3, 4, 5,
    1, 2, 3, 4, 5,
    2, 4, 6, 8, 10,
  ];
  const [error, setError] = useState(null); // State variable for tracking errors
  const [successMessage, setSuccessMessage] = useState(null);
  const [submitButtonVisible, setSubmitButtonAble] = useState(true);
  const [submittedScoresCount, setSubmittedScoresCount] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeDate = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSelectedDate(e.target.value)
  };

  const handleCheckboxChange = (index) => {
    setCheckedBoxes((prevCheckedBoxes) => {
      const newCheckedBoxes = [...prevCheckedBoxes];
      newCheckedBoxes[index] = !newCheckedBoxes[index];
      return newCheckedBoxes;
    });
  };

  const checkAllInColumn = (colIndex) => {
    const isColumnChecked = checkedBoxes[colIndex];

    setCheckedBoxes((prevCheckedBoxes) => {
      const newCheckedBoxes = [...prevCheckedBoxes];
      for (let i = colIndex; i < checkboxValues.length; i += 5) {
        newCheckedBoxes[i] = !isColumnChecked; // Toggle the state
      }
      return newCheckedBoxes;
    });
  };

  const uncheckAll = () => {
    setCheckedBoxes(Array(25).fill(false));
  }

  const calculateSum = () => {
    return checkboxValues.reduce((sum, value, index) => {
      if (checkedBoxes[index]) {
        return sum + value;
      }
      return sum;
    }, 0);
  };

  const fetchSubmittedScoresCount = async () => {
    try {
      const response = await fetch(
          `${process.env.REACT_APP_API_URL}/putting_league/?date=${selectedDate}&player=${formData.player}`
      );

      if (response.ok) {
        const submittedScores = await response.json();
        setSubmittedScoresCount(submittedScores.length);
      } else {
        console.error('Failed to fetch submitted scores');
      }
    } catch (error) {
      console.error('Error fetching submitted scores', error);
    }
  };

  useEffect(() => {
    // Check if PDGA number is entered and fetch submitted scores count
    if (formData.player) {
      fetchSubmittedScoresCount();
    }
  }, [formData.player, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scoreData = {
      date: formData.date,
      player: formData.player,
      score: calculateSum(),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/putting_league/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData),
      });

      if (response.ok) {
        console.log('Score posted successfully');
        setError(null);
        setSuccessMessage('Scores saved successfully!');
        setSubmitButtonAble(false);

        uncheckAll();
        fetchSubmittedScoresCount(); // Update submitted scores count
        setTimeout(() => {
          setSuccessMessage(null);
          setSubmitButtonAble(true);
        }, 5000);
      } else {
        const responseData = await response.json();

        if (responseData.player && responseData.player.length > 0) {
          setError(`Invalid PDGA ID. You aren't set up for putting league.`);
        } else {
          console.error('Failed to post score');
          setError('Failed to post score. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error posting score', error);
      setError('Error posting score. Please try again.');
    }
  };

  return (
      <div className={styles.page}>
        {/*<div>*/}
        {/*  <p>Basket setup order <br/>*/}
        {/*    Standard Basket 20' 1pt <br/>*/}
        {/*    Standard Basket 25' 2pt <br/>*/}
        {/*    Standard Basket 30' 3pt <br/>*/}
        {/*    Standard Basket 35' 4pt <br/>*/}
        {/*    Marksman Basket 25' 5pt <br/>*/}
        {/*  </p>*/}
        {/*</div>*/}

        <div className={styles.heading}>
          <h1>Putting League Scorecard</h1>
          <MdSwipeLeft className={styles.swiper}/>
        </div>

        <div className={styles.tableContainer}>

          <table className={styles.styledTable}>
            <thead>
            <tr>
              <th></th>
              {[...Array(5)].map((_, colIndex) => (
                  <th key={colIndex}>Basket {colIndex + 1}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <th>Putt {rowIndex + 1}</th>
                  {[...Array(5)].map((_, colIndex) => {
                    const index = rowIndex * 5 + colIndex;
                    return (
                        <td key={colIndex}>
                          <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={checkedBoxes[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                          </label>
                        </td>
                    );
                  })}
                </tr>
            ))}
            <tr>
              <th></th>
              {[...Array(5)].map((_, colIndex) => (
                  <td key={colIndex}>
                    <button
                        className={`${styles.checkAllButton} ${checkedBoxes[colIndex] ? styles.checkAll : styles.uncheckAll}`}
                        onClick={() => checkAllInColumn(colIndex)}
                    >
                      {checkedBoxes[colIndex] ? 'Uncheck All' : 'Check All'}
                    </button>
                  </td>
              ))}
            </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.totalScore} colSpan={6}>Score: {calculateSum()}</div>
        <div>You have submitted {submittedScoresCount} score(s) for the selected date</div>
        {successMessage && <p className={styles.successBanner}>{successMessage}</p>}

        <form className={styles.funForm} onSubmit={handleSubmit}>
          <label>Date: </label>
          <input
              type="date"
              name="date"
              value={formData.date || selectedDate}
              onChange={handleChangeDate}
              required
          />
          {error && <p className={styles.errorBanner}>{error}</p>}
          <label>PDGA #: </label>
          <input
              type="text"
              name="player"
              value={formData.player}
              onChange={handleChange}
              required
          />

          <div className={styles.form}>
            <button className={styles.clearAllButton} type="button" onClick={uncheckAll}>Clear All</button>
            <button className={`${styles.submitButton} ${submitButtonVisible ? 'enable' : 'disabled'}`}
                    onClick={handleSubmit}>
              Submit
            </button>
          </div>

        </form>

      </div>
  );
};

export default ScorecardTemplate;
