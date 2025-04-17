"use client";
import { useEffect, useState } from "react";
import styles from "./Error.module.css";

export default function Error({ text, show }) {
  
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (text.trim() === "") {
      setError("Please enter a goal before adding.");
    } else {
      setError("");
    }
  }, [text]);
  
  if (!show) {
    return null;
  }
  return <>{error && <p className={styles.error}>{error}</p>}</>;
}
