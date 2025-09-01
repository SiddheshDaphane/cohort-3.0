import { useState } from 'react'
import './App.css'

function useCounter() {
  const [count, setCount] = useState(0)

  function IncreaseNum() {
    setCount(count + 1)
  }
  return {
    num: count, 
    setNum: IncreaseNum // "setNum" key has "IncreaseNum" function and that's why I called "SetNum" in "App" component. 
  }

}

function App() {  
  const {num, setNum} = useCounter(0) 
  // const {siddhesh, daphane} = useCounter(0) (cannot do this. Need to use say key as defined in hook in return statement.)

  return (
    <div>
      <button onClick={setNum}>Increase {num}</button>
     </div>
  )
}

export default App
