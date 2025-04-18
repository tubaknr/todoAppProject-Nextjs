"use client";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import styles from "./TodoInput.module.css";
import GoalsList from "./GoalsList";
import Error from "./Error";

export default function TodoInput() {
  const [text, setText] = useState("");
  const [goals, setGoals] = useState([]);
  const [showError, setShowError] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [type, setType] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);

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
        { goalText: text.trim(), completed: false, types: type },
      ]);
    }
    setText("");
    setShowError(false);
    setType([]);
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
    setType(goals[index].types || []);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputTypesContainer}>
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

          <div className={styles.typesContainer}>
            <ul className={styles.allTypes}>
              <li
                className={`${styles.eachType} ${
                  type?.includes("urgent") ? styles.active : ""
                }`}
                onClick={() => {
                  if (type?.includes?.("urgent")) {
                    // urgent varsa çıkar
                    setType(type.filter((t) => t !== "urgent"));
                  } else {
                    // yoksa ekle
                    setType([...type, "urgent"]);
                  }
                }}
              >
                Urgent
              </li>

              <li
                className={`${styles.eachType} ${
                  type?.includes?.("important") ? styles.active : ""
                }`}
                onClick={() => {
                  if (type.includes("important")) {
                    // varsa çıkar
                    setType(type.filter((t) => t !== "important"));
                  } else {
                    // yoksa ekle
                    setType([...type, "important"]);
                  }
                }}
              >
                Important
              </li>
            </ul>
          </div>
        </div>

        <Error text={text} show={showError} />
      </form>

      <div className={styles.container}>
        <ProgressBar
          totalGoalsNumber={goals.length}
          completedGoalsNumber={goals.filter((goal) => goal.completed).length}
        />

        <h1 className={styles.header}>My Todo List</h1>

        <div className={styles.pages}>
          <button
            onClick={() => {
              setShowAll(true);
              setShowMatrix(false);
            }}
            className={styles.allButton}
          >
            All
          </button>
          <button
            onClick={() => {
              setShowAll(false);
              setShowMatrix(true);
            }}
            className={styles.matrixButton}
          >
            Matrix
          </button>
        </div>
        {showAll && (
          <div className={styles.goalsWrapper}>
            <GoalsList
              goalsList={goals}
              onToggle={toggleComplete}
              onDelete={deleteItem}
              fixText={editItem}
            />
          </div>
        )}
        {showMatrix && (
          <div className={styles.allMatrix}>
            <ul className={styles.matrixUl}>
              <div className={styles.upperRow}>
                <ul className={styles.eachBox}>
                  Urgent & Important
                  {goals
                    .filter(
                      (goal) =>
                        goal.types?.includes("urgent") &&
                        goal.types?.includes("important")
                    )
                    .map((g, i) => (
                      <li key={i}>{g.goalText}</li>
                    ))}
                </ul>

                <ul className={styles.eachBox}>
                  Important & Not Urgent
                  {goals
                    .filter(
                      (goal) =>
                        !goal.types?.includes("urgent") &&
                        goal.types?.includes("important")
                    )
                    .map((g, i) => (
                      <li key={i}>{g.goalText}</li>
                    ))}
                </ul>
              </div>
              <div className={styles.bottomRow}>
                <ul className={styles.eachBox}>
                  Urgent & Not Important
                  {goals
                    .filter(
                      (goal) =>
                        goal.types?.includes("urgent") &&
                        !goal.types?.includes("important")
                    )
                    .map((g, i) => (
                      <li key={i}>{g.goalText}</li>
                    ))}
                </ul>
                <ul className={styles.eachBox}>
                  Not Important & Not Urgent
                  {goals
                    .filter(
                      (goal) =>
                        !goal.types?.includes("urgent") &&
                        !goal.types?.includes("important")
                    )
                    .map((g, i) => (
                      <li key={i}>{g.goalText}</li>
                    ))}
                </ul>
              </div>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
