import React, {useState} from "react";
import axios from "axios";
import base64 from "base-64";
import {useNavigate} from "react-router";
import {Button, Paper, TextField, Typography} from "@mui/material";

export default function SignInAndRedirect(props: {signIn:() => void }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const signin = async () => {
        axios.post("http://localhost:3001/user/auth", {username: base64.encode(username), password: base64.encode(password)}).then((res) => {
            document.cookie = `token=${res.data}`
            props.signIn()
            navigate("/me")
        })
    }

    return (
        <>
            <Paper variant={"outlined"} className={"sign-in"}>
                <Typography variant={"h3"}>Lost n' Found</Typography>
                <Typography variant={"subtitle2"}>Logga In på "mina sidor" med ditt användarnamn och lösenord</Typography>
                <TextField variant={"standard"} onChange={(event) => {setUsername(event.target.value)}} type={"text"} label={"Användarnamn"}/> <br/>
                <TextField variant={"standard"} onChange={(event) => {setPassword(event.target.value)}} type={"password"} label={"Lösenord"}/> <br/>
                <Button variant={"contained"} onClick={async () => await signin()}>Logga In</Button>
            </Paper>
        </>
    );
}