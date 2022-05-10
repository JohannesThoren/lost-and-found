import React from "react";
import axios from "axios";
import base64 from "base-64";
import {useNavigate, useRoutes} from "react-router";

import SignInAndRedirect from "../components/SignInAndRedirect";
interface IProps {
    signIn:() => void
}

interface IStates {
    username: "",
    password: ""

}

export default class SignIn extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }



    render() {
        return (
            <>
                <SignInAndRedirect signIn={this.props.signIn}/>
            </>
        )
    }
}

