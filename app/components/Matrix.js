import styles from "./Matrix.module.css";

export default function Matrix({ goalsList }) {
  return (
    <>
      <div className={styles.allMatrix}>
        <ul>
          <div className={styles.upperRow}>
            <ul className={styles.eachBox}>
              Urgent & Important
              {goalsList
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
              {goalsList
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
              {goalsList
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
              {goalsList
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
    </>
  );
}
