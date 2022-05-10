import React, {useState} from "react";
import axios from "axios";
import base64 from "base-64";
import {useNavigate} from "react-router";

export default function SignInAndRedirect(props: {signIn:() => void }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const signin = async () => {
        axios.post("http://localhost:3001/user/auth", {username: base64.encode(username), password: base64.encode(password)}).then((res) => {
            document.cookie = `token=${res.data}`
            console.log(res)
        })

        props.signIn()

        navigate("/me")
    }

    return (
        <>
            <div>
                <input onChange={(event) => {setUsername(event.target.value)}} type={"text"} placeholder={"Användarnamn"}/> <br/>
                <input onChange={(event) => {setPassword(event.target.value)}} type={"password"} placeholder={"Lösenord"}/> <br/>
                <button onClick={async () => await signin()}>Logga In</button>
            </div>
        </>
    );
}