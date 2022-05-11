import Item from "./Item";
import {useState} from "react";
import axios from "axios";
import getCookie from "../getCookie";

export default function NewItem() {
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")

    const newItem = async () => {
        let response = await axios.post(`http://localhost:3001/item/new/${getCookie('token')}`, {
            item_name: itemName,
            item_description: itemDescription
        })
        console.log(response)
    }

    return (
        <>
            <input value={itemName} onChange={(e) => setItemName(e.target.value)} type="text"
                   placeholder={"Prylnamn t.ex Nycklar"}/>
            <input value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} type="text"
                   placeholder={"Prylbeskrivning t.ex 3 nycklar och ett blått band"}/>
            <button onClick={() => newItem()}>Lägg till</button>
        </>
    )
}