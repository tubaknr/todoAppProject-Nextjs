"use client";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import styles from "./TodoApp.module.css";
import GoalsList from "./GoalsList";
import GoalForm from "./GoalForm";
import Buttons from "./Buttons";
import Matrix from "./Matrix";
import { useGoalManager } from "../hooks/useGoalManager";

export default function TodoApp() {
  const [showAll, setShowAll] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);

  const goalManager = useGoalManager();

  return (
    <>
      <GoalForm
        onHandleSubmit={goalManager.handleSubmit}
        onShowError={goalManager.showError}
        editIndex={goalManager.editIndex}
        text={goalManager.text}
        onTextChange={goalManager.setText}
        type={goalManager.type}
        onTypeChange={goalManager.setType}
      />

      <div className={styles.generalContainer}>
        <ProgressBar
          totalGoalsNumber={goalManager.goals.length}
          completedGoalsNumber={
            goalManager.goals.filter((goal) => goal.completed).length
          }
        />

        <h1 className={styles.header}>My Todo List</h1>

        <div className={styles.buttons}>
          <Buttons onSetShowAll={setShowAll} onSetShowMatrix={setShowMatrix} />
        </div>
        {showAll && (
          <div className={styles.goalsWrapper}>
            <GoalsList
              goalsList={goalManager.goals}
              onToggle={goalManager.toggleComplete}
              onDelete={goalManager.deleteItem}
              fixText={goalManager.editItem}
            />
          </div>
        )}
        {showMatrix && (
          <Matrix
            goalsList={goalManager.goals}
            toggleComplete={goalManager.toggleComplete}
          />
        )}
      </div>
    </>
  );
}
