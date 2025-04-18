import styles from "./GoalsList.module.css";
import { RxCross1 } from "react-icons/rx";
import { IoPencilOutline } from "react-icons/io5";

export default function GoalsList({ goalsList, onToggle, onDelete, fixText }) {
  return (
    <>
      <div className={styles.div}>
        <ul className={styles.list}>
          {goalsList.map((goal, index) => (
            <li
              key={index}
              className={`${styles.goal} ${
                goal.completed ? styles.completed : ""
              }`}
              onClick={() => onToggle(index)}
            >
              <span
                className={`${styles.circle} ${
                  goal.completed ? styles.checked : ""
                }`}
              >
                {goal.completed && "✔"}
              </span>
              <span className={styles.goalText}>{goal.goalText}</span>

              <div className={styles.itemTypes}>
                <ul className={styles.typesList}>
                  {goal.types.length !== 0
                    ? goal.types.map((type, index) => (
                      <li key={index} className={styles.itemType}>{type}</li>
                    ))
                    : null}
                </ul>
              </div>

              <span
                className={styles.pencil}
                onClick={(e) => {
                  e.stopPropagation(); // bu tıklanmayı tamamlanma gibi algılama, li'e iletme
                  fixText(index);
                }}
              >
                <IoPencilOutline />
              </span>
              <span
                className={styles.delete}
                onClick={(e) => {
                  e.stopPropagation(); // tamamlanma gibi algılama
                  onDelete(index);
                }}
              >
                <RxCross1 />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
