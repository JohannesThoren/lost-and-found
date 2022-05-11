import {useState} from "react";
import axios from "axios";
import getCookie from "../getCookie";

export default function Item(props: { item: { name: string, description: string, uuid: string } }) {

    const [isEditMode, setEditMode] = useState(false)
    const [itemName, setItemName] = useState(props.item.name)
    const [itemDescription, setItemDescription] = useState(props.item.description)

    const save = async () => {
        setEditMode(false)

        let data = {
            description: itemDescription,
            name: itemName,
            item_uuid: props.item.uuid
        }
        let response = await axios.put(`http://localhost:3001/item/update/${getCookie('token')}`, data)
    }

    return (
        <>
            {isEditMode ? (
                <div>
                    <input onChange={(e) => {
                        setItemName(e.target.value)
                    }} value={itemName}/>
                    <input onChange={(e) => {
                        setItemDescription(e.target.value)
                    }} value={itemDescription}/>
                    <button onClick={() => save()}>Spara</button>
                </div>
            ) : (
                <div>
                    <h2>{itemName}</h2>
                    <p>{itemDescription}</p>
                    <button onClick={() => {
                        setEditMode(true)
                    }}>Redigera
                    </button>
                    <button>Ta bort</button>
                </div>
            )}

        </>
    )
}