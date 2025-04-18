import styles from "./ProgressBar.module.css";

export default function ProgressBar({
  totalGoalsNumber,
  completedGoalsNumber,
}) {
  
  const widthCalculation = () => {
    return totalGoalsNumber === 0
      ? "0%"
      : `${(completedGoalsNumber / totalGoalsNumber) * 100}%`;
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          {completedGoalsNumber} / {totalGoalsNumber}
        </div>
        <div className={styles.barBackground}>
          <div
            className={styles.barFill}
            style={{
              width: widthCalculation(),
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
