import styles from "./Matrix.module.css";

/**
 * @typedef {Object} Goal
 * @property {number} id
 * @property {string} goalText
 * @property {boolean} completed
 * @property {string[]} types
 */

/**
 * @param {{ goalsList: Goal[], toggleComplete: (id: number) => void }} props
 */
export default function Matrix({ goalsList, toggleComplete }) {
  return (
    <div className={styles.allMatrix}>
      <div className={styles.upperRow}>
        <ul className={styles.eachBox}>
          Urgent & Important
          {goalsList
            .filter(
              (goal) =>
                goal.types?.includes("urgent") &&
                goal.types?.includes("important")
            )
            .map((g) => (
              <li
                key={g.id}
                className={`${styles.goal} ${g.completed ? styles.active : ""}`}
                onClick={() => toggleComplete(g.id)}
              >
                {g.goalText}
              </li>
            ))}
        </ul>

        <ul className={styles.eachBox}>
          Important & Not Urgent
          {goalsList
            .filter(
              (goal) =>
                !goal.types?.includes("urgent") &&
                goal.types?.includes("important")
            )
            .map((g) => (
              <li
                key={g.id}
                className={`${styles.goal} ${g.completed ? styles.active : ""}`}
                onClick={() => toggleComplete(g.id)}
              >
                {g.goalText}
              </li>
            ))}
        </ul>
      </div>

      <div className={styles.bottomRow}>
        <ul className={styles.eachBox}>
          Urgent & Not Important
          {goalsList
            .filter(
              (goal) =>
                goal.types?.includes("urgent") &&
                !goal.types?.includes("important")
            )
            .map((g) => (
              <li
                key={g.id}
                className={`${styles.goal} ${g.completed ? styles.active : ""}`}
                onClick={() => toggleComplete(g.id)}
              >
                {g.goalText}
              </li>
            ))}
        </ul>

        <ul className={styles.eachBox}>
          Not Important & Not Urgent
          {goalsList
            .filter(
              (goal) =>
                !goal.types?.includes("urgent") &&
                !goal.types?.includes("important")
            )
            .map((g) => (
              <li
                key={g.id}
                className={`${styles.goal} ${g.completed ? styles.active : ""}`}
                onClick={() => toggleComplete(g.id)}
              >
                {g.goalText}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
