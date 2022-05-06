import {useState} from 'react'
import SignIn from "./components/SignIn.";
import CodeInput from "./components/CodeInput";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";

import "./style/style.css"
import CodeInputParams from "./components/CodeInputParams";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"}>
                    <Route index element={<Home/>}/>
                    <Route path={"/code"} element={<CodeInput/>}/>
                    <Route path={"/code/:code"} element={<CodeInputParams/>}/>
                    <Route path={"/signin"} element={<SignIn/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App
