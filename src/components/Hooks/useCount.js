import { useState } from 'react'


// export function useCount(startCount = 1) {
// const [count, setCount] = useState(startCount);
export function useCount(startCount) {
  const [count, setCount] = useState(startCount || 1);
  const onChange = e => setCount(e.tartget.value);
  return { count, setCount, onChange }
}