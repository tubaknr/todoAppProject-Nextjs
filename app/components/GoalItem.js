import styles from "./GoalItem.module.css";
import { RxCross1 } from "react-icons/rx";
import { IoPencilOutline } from "react-icons/io5";
import { memo } from "react";

function GoalItem({ goal, index, onToggle, onDelete, onFix }) {
  const handleToggle = () => onToggle(index);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(index);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // bu tıklanmayı tamamlanma gibi algılama, li'e iletme
    onFix(index);
  };

  return (
    <>
      <div>
        <li
          key={index}
          className={`${styles.goal} ${goal.completed ? styles.completed : ""}`}
          onClick={() => handleToggle}
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
                    <li key={index} className={styles.itemType}>
                      {type}
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <span className={styles.pencil} onClick={handleEdit}>
            <IoPencilOutline />
          </span>
          <span className={styles.delete} onClick={handleDelete}>
            <RxCross1 />
          </span>
        </li>
      </div>
    </>
  );
}

export default memo(GoalItem); // GoalItem yalnızca props değiştiğinde render edilir
