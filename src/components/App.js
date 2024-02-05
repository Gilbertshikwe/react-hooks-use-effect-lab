import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  // State for managing current question id and score
  const [currentQuestionId, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);

  // Get the current question based on the currentQuestionId
  const currentQuestion = quiz.find((q) => q.id === currentQuestionId);

  // Function to handle user's answer
  function handleQuestionAnswered(correct) {
    // Update current question id and score based on the user's answer
    if (currentQuestionId < quiz.length) {
      setCurrentQuestion((currentQuestionId) => currentQuestionId + 1);
    } else {
      setCurrentQuestion(null);
    }
    if (correct) {
      setScore((score) => score + 1);
    }
  }

  // JSX to render the main content
  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;

