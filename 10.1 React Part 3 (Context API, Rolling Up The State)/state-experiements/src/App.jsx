import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div>
      <LightBuld />
    </div>
  )
}

function LightBuld() { {/* created a state variable in parent componenet and then I am passing this to children components.  */}
  const [bulbOn, setBulbOn] = useState(true);

  return <div>
    <BulbState bulbOn = {bulbOn}/> {/* passing "bulbOn" as a prop in childern component. Look at the syntax */}
    <ToggleBulbState bulbOn={bulbOn} setBulbOn= {setBulbOn}/>
  </div>
}

function BulbState({bulbOn}) { {/* because "bulbOn" is props, I cannot pass it like BulbState(bulbOn). If I pass like this, it means "bulbOn" is function and not a prop. */}
  return <div>
    {bulbOn ? "Bulb On" : "Bulb off"}
  </div>
}

function ToggleBulbState({bulbOn, setBulbOn}) {

  function toggle() {
    return setBulbOn(!bulbOn)
  }

  return <div>
    <button onClick={toggle}>Toggle the bulb</button>
  </div>
}

export default App
