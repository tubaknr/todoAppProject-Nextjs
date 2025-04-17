"use client";
import { useState } from "react";
import styles from "./TodoInput.module.css";
import GoalsList from "./GoalsList";
import Error from "./Error";
import ProgressBar from "./ProgressBar";

export default function TodoInput() {
  const [text, setText] = useState("");
  const [goals, setGoals] = useState([]);
  const [showError, setShowError] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      setShowError(true);
      return;
    }
    if (editIndex !== null) {
      // düzenleme modundayken yeni madde ekleme yapma
      const updatedGoalsList = [...goals];
      updatedGoalsList[editIndex].goalText = text.trim(); // yeni girilen metin
      setGoals(updatedGoalsList);
      setEditIndex(null); //düzenleme modundan çıkış
    } else {
      // düzenleme mdunda değil, yeni madde ekleniyor
      setGoals((prevGoalsList) => [
        ...prevGoalsList,
        { goalText: text.trim(), completed: false },
      ]);
    }
    setText("");
    setShowError(false);
  };

  const toggleComplete = (index) => {
    setGoals((prevGoalList) =>
      prevGoalList.map((goal, i) =>
        i === index ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };
  const deleteItem = (index) => {
    setGoals((prevGoalList) => prevGoalList.filter((_, i) => i !== index));
    if (index === editIndex) {
      // düzenleme yaptığı maddeyi düzenleme modundayken silerse
      setEditIndex(null); // düzenlemeyi iptal et
      setText("");
    }
  };

  const editItem = (index) => {
    setText(goals[index].goalText);
    setEditIndex(index);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputButtonContainer}>
          <input
            type="text"
            value={text}
            placeholder="Type your goal..."
            onChange={(e) => {
              setText(e.target.value);
            }}
            className={styles.input}
          ></input>
          <button type="submit" className={styles.button}>
            {editIndex === null ? "Add" : "Update"}
          </button>
        </div>

        <Error text={text} show={showError} />
      </form>

      <div className={styles.container}>
        <ProgressBar
          totalGoalsNumber={goals.length}
          completedGoalsNumber={goals.filter((goal) => goal.completed).length}
        />
        <h1 className={styles.header}>My Todo List</h1>
        <div className={styles.goalsWrapper}>
          <GoalsList
            goalsList={goals}
            onToggle={toggleComplete}
            onDelete={deleteItem}
            fixText={editItem}
          />
        </div>
      </div>
    </>
  );
}
