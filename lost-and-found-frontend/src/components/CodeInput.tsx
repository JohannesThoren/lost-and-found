import {Button, Link, Paper, TextField, Typography} from "@mui/material";
import React, {useState} from "react";

export default function (params: {}) {

    let [code, setCode] = useState("")

    return (
        <Paper className={"code-input"} variant={"outlined"}>
            <Typography variant={"h2"}>Prylkod</Typography>
            <Typography variant={"subtitle1"}>När du skrivr in prylkoden så kommer du att få kontakt information till
                ägaren av den prylen du har hittat. Prylkoden hittar du på prylen eller genom att skanna QR Koden på
                prylen du har hittat.</Typography>
            <TextField onChange={(e)=> {setCode(e.target.value)}} variant={"standard"} label={"Prylkod"} sx={{width: "100%"}}></TextField>
            <Link href={`http://${window.location.host}/code/${code}`}  underline={"none"} variant={"button"}>Hämta Kontakt Information</Link>
        </Paper>
    )
}