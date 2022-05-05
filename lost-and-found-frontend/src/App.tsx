import { useState } from 'react'
import SignIn from "./components/SignIn.";
import CodeInput from "./components/CodeInput";


function App() {
  return (
    <div className="App">
      <SignIn/>
        <CodeInput/>
    </div>
  )
}

export default App
