import Item from "./Item";
import {useState} from "react";
import axios from "axios";
// @ts-ignore
import get_cookie from "../get_cookie";
import {Button, TextField} from "@mui/material";

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
        <div>
            <TextField value={itemName} onChange={(e) => setItemName(e.target.value)} type="text"
                       label={"Prylnamn t.ex Nycklar"} variant="standard"/>
            <TextField value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} type="text"
                       label={"Prylbeskrivning t.ex 3 nycklar och ett blått band"} variant="standard"/>
            <Button variant="standard" onClick={() => newItem()}>Lägg till</Button>
        </div>
    )
}