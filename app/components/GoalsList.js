import styles from "./GoalsList.module.css";
import GoalItem from "./GoalItem";

export default function GoalsList({ goalsList, onToggle, onDelete, fixText }) {
  return (
    <>
      <div className={styles.div}>
        <ul className={styles.list}>
          {goalsList.map((goal, index) => (
            <GoalItem
              goal={goal}
              idx={index}
              onToggle={onToggle}
              onDelete={onDelete}
              onFix={fixText}
              key={index}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
