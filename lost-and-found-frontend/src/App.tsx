import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import ProfilePage from "./views/ProfilePage";
// @ts-ignore
import get_cookie from "./get_cookie";
import axios from "axios";

import delete_cookie from "./delete_cookie"
import GetContactInfo from "./views/GetContactInfo";

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
        this.signIn = this.signIn.bind(this)
        this.signOut = this.signOut.bind(this)
    }

    signOut() {
        this.setState({isSignedIn: false})
        delete_cookie("token")
    }

    signIn() {
        this.setState({isSignedIn: true});
    }

    async componentDidMount() {
        let token = get_cookie("token")
        let response = await axios.get(`http://localhost:3001/user/me/${token}`)
        if(response.data != false) {
            this.signIn()
        }
    }


    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>

                        <Route path={"/"}>
                            <Route index element={<Home setSignOut={this.signOut} isSignedIn={this.state.isSignedIn}/>}/>
                            <Route path={"/signin"} element={<SignIn signIn={this.signIn}/>}></Route>
                            <Route path={"/me"} element={<ProfilePage isSignedIn={this.state.isSignedIn} signOut={this.signOut}/>}></Route>
                            <Route path={"/code/:code"} element={<GetContactInfo isSignedIn={this.state.isSignedIn} setSignedOut={this.signOut}/>}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
