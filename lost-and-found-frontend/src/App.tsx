import {useState} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/SignIn";

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false)

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"}>
                        <Route index element={<Home isSignedIn={isSignedIn}/>}/>
                        <Route path={"/signin"} element={<SignIn/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
