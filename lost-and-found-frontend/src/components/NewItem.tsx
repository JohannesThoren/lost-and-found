import Item from "./Item";
import {useState} from "react";
import axios from "axios";
// @ts-ignore
import get_cookie from "../get_cookie";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";

export default function NewItem() {
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")

    const newItem = async () => {
        let response = await axios.post(`http://localhost:3001/item/new/${get_cookie('token')}`, {
            item_name: itemName,
            item_description: itemDescription
        })
        console.log(response)
        window.location.reload()
    }

    return (
        <>
            <Typography variant={"h4"}>Lägg till en ny pryl</Typography>
            <Typography variant={"subtitle1"}>Skriv in ett namn och en beskrivning för din pryl.</Typography>
            <Grid container columns={{xs: 5}} spacing={{xs: 1}} sx={{alignItems:'center'}}>
                <Grid item xs={2}>
                    <TextField sx={{width: '100%'}} value={itemName} onChange={(e) => setItemName(e.target.value)} type="text"
                               label={"Prylnamn t.ex Nycklar"} variant="outlined"/>
                </Grid>
                <Grid item xs={2}>
                    <TextField sx={{width: '100%'}} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} type="text"
                               label={"Prylbeskrivning t.ex 3 nycklar och ett blått band"} variant="outlined"/>
                </Grid>
                <Grid item xs={1}>
                    <Button sx={{width: '100%'}} variant="contained" onClick={() => newItem()}>Lägg till</Button>
                </Grid>
            </Grid>
        </>

    )
}