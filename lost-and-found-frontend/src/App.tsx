import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import ProfilePage from "./views/ProfilePage";
import getCookie from "./getCookie";
import axios from "axios";

interface IProps {
}

interface IState {
    isSignedIn: boolean
}



export default class App extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isSignedIn: false
        }
    }

    signIn() {
        this.setState({isSignedIn: true})
    }

    async componentDidMount() {
        let token = getCookie("token")
        let response = await axios.get(`http://localhost:3001/user/me/${token}`)
        if(response.data != {} || response.data != false || response.data != undefined) {
            this.signIn()
        }
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"}>
                            <Route index element={<Home isSignedIn={this.state.isSignedIn}/>}/>
                            <Route path={"/signin"} element={<SignIn signIn={this.signIn}/>}></Route>
                            <Route path={"/me"} element={<ProfilePage/>}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
