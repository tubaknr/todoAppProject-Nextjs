import { useState } from "react";

export function useGoalManager() {
  const [goals, setGoals] = useState([]);
  const [showError, setShowError] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [text, setText] = useState("");
  const [type, setType] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed === "") {
      setShowError(true);
      return;
    }
      
    // düzenleme modundayken yeni madde ekleme yapma
    if (editIndex !== null) {
      const updatedGoalsList = [...goals];
      updatedGoalsList[editIndex].goalText = trimmed; // yeni girilen metin
      setGoals(updatedGoalsList);
      setEditIndex(null); //düzenleme modundan çıkış
    }
      
    // düzenleme mdunda değil, yeni madde ekleniyor
    else {
      setGoals((prevGoalsList) => [
        ...prevGoalsList,
        { goalText: trimmed, completed: false, types: type },
      ]);
    }
      
    setText("");
    setType([]);
    setShowError(false);
  };

  const toggleComplete = (index) => {
    setGoals((prevGoalList) =>
      prevGoalList.map((goal, i) =>
        i === index ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteItem = (index) => {
    setGoals((prevGoalList) => prevGoalList.filter((_, i) => i !== index));
    if (index === editIndex) {
      // düzenleme yaptığı maddeyi düzenleme modundayken silerse
      setEditIndex(null); // düzenlemeyi iptal et
      setText("");
    }
  };

  const editItem = (index) => {
    setText(goals[index].goalText);
    setEditIndex(index);
    setType(goals[index].types || []);
  };

  return {
    goals,
    text,
    type,
    editIndex,
    showError,
    setText,
    setType,
    handleSubmit,
    toggleComplete,
    deleteItem,
    editItem,
  };
}
