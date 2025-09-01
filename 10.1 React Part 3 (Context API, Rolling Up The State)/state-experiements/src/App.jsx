import { useContext } from 'react';
import { useState, createContext, useCallback } from 'react'
import './App.css'

const BulbContext = createContext();

function App() {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <div>
      <BulbContext.Provider value={{
        bulb: bulbOn,
        setBulb: setBulbOn
      }}>
        <LightBuld />
      </BulbContext.Provider>
    </div>
  )
}

function LightBuld() { 

  return <div>
    <BulbState /> 
    <ToggleBulbState />
  </div>
}

function BulbState() { 
  const { bulb } = useContext(BulbContext)

  return <div>
    {bulb ? "Bulb On" : "Bulb off"}
  </div>
}

function ToggleBulbState() {
  const { bulb, setBulb } = useContext(BulbContext)

  function toggle() {
    // setBulbOn(currentState => !currentState);
    return setBulb(!bulb)
  }

  return <div>
    <button onClick={toggle}>Toggle the bulb</button>
  </div>
}

export default App
