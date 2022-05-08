import React from "react";
import axios from "axios";
import base64 from "base-64";

interface IProps {
    setIsSignedIn: void
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

    async signin() {
        axios.post("http://localhost:3001/user/auth", {username: base64.encode(this.state.username), password: base64.encode(this.state.password)}).then((res) => {
            document.cookie = `token=${res.data}`
            console.log(res)
        })
    }

    render() {
        return (
            <>
                <div>
                    <input onChange={(event) => {this.setState({username: event.target.value})}} type={"text"} placeholder={"Användarnamn"}/> <br/>
                    <input onChange={(event) => {this.setState({password: event.target.value})}} type={"password"} placeholder={"Lösenord"}/> <br/>
                    <button onClick={() => this.signin()}>Logga In</button>
                </div>
            </>
        );
    }
}