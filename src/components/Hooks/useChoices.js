import { useState } from "react";




export function useChoices(openItem) {
  const ourChoice = openItem.choice ? openItem.choice : null;
  const [choice, setChoices] = useState(ourChoice)

  function changeChoices(e) {
    setChoices(e.target.value)
  }
  return { choice, changeChoices }
}