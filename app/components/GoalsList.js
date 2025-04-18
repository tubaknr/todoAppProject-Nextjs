import styles from "./GoalsList.module.css";
import GoalItem from "./GoalItem";

export default function GoalsList({ goalsList, onToggle, onDelete, fixText }) {
  return (
    <>
      <div>
        <ul className={styles.list}>
          {goalsList.map((goal, index) => (
            <GoalItem
              goal={goal}
              index={index}
              onToggle={onToggle}
              onDelete={onDelete}
              onFix={fixText}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
