import styles from "./GoalForm.module.css";
import Error from "./Error";

export default function GoalForm({
  onHandleSubmit,
  editIndex,
  onShowError,
  type,
  onTypeChange,
  text,
  onTextChange,
}) {
  return (
    <>
      <form onSubmit={onHandleSubmit} className={styles.form}>
        <div className={styles.inputTypesContainer}>
          <div className={styles.inputButtonContainer}>
            <input
              type="text"
              value={text}
              placeholder="Type your goal..."
              onChange={(e) => {
                onTextChange(e.target.value);
              }}
              className={styles.input}
            ></input>
            <button type="submit" className={styles.button}>
              {editIndex === null ? "Add" : "Update"}
            </button>
          </div>

          <div>
            <ul className={styles.allTypes}>
              <li
                className={`${styles.eachType} ${
                  type?.includes("urgent") ? styles.active : ""
                }`}
                onClick={() => {
                  if (type?.includes?.("urgent")) {
                    // urgent varsa çıkar
                    onTypeChange(type.filter((t) => t !== "urgent"));
                  } else {
                    // yoksa ekle
                    onTypeChange([...type, "urgent"]);
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
                    onTypeChange(type.filter((t) => t !== "important"));
                  } else {
                    // yoksa ekle
                    onTypeChange([...type, "important"]);
                  }
                }}
              >
                Important
              </li>
            </ul>
          </div>
        </div>
        <Error text={text} show={onShowError} />
      </form>
    </>
  );
}
