import styles from "./Buttons.module.css";

export default function Buttons({onSetShowAll, onSetShowMatrix}) {
  return (
    <>
      <div>
        
          <button
            onClick={() => {
              onSetShowAll(true);
              onSetShowMatrix(false);
            }}
            className={styles.allButton}
          >
            All
          </button>
          <button
            onClick={() => {
              onSetShowAll(false);
              onSetShowMatrix(true);
            }}
            className={styles.matrixButton}
          >
            Matrix
          </button>
        
      </div>
    </>
  );
}
