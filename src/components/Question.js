import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  // State for managing time remaining
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect to handle the timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup function to clear the timer when the component unmounts or when the question changes
      return () => {
        clearTimeout(timerId);
      };
    } else {
      // Time is up, reset timeRemaining and trigger onAnswered with false
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered, question]); // Dependencies to watch for changes

  // Function to handle user's answer
  function handleAnswer(isCorrect) {
    // Reset timeRemaining when an answer is selected
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  // JSX to render the question and answer options
  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
