import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
// @ts-ignore
import getCookie from "../getCookie";
import QRCode from "react-qr-code";

export default function Item(props: {
    item: { name: string, description: string, uuid: string, code: string }
}) {

    const [isEditMode, setEditMode] = useState(false)
    const [itemName, setItemName] = useState(props.item.name)
    const [itemDescription, setItemDescription] = useState(props.item.description)
    const navigate = useNavigate()
    const save = async () => {
        setEditMode(false)

        let data = {
            description: itemDescription,
            name: itemName,
            item_uuid: props.item.uuid
        }
        let response = await axios.put(`http://localhost:3001/item/update/${getCookie('token')}`, data)
        window.location.reload()
    }

    const deleteItem = async () => {
        await axios.delete(`http://localhost:3001/item/delete/${props.item.uuid}/${getCookie('token')}`)
        window.location.reload()
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
                    <p>Pryl Kod: {props.item.code}</p>
                    <QRCode value={`http://${window.location.hostname}/code/${props.item.code}`}/>
                    <button onClick={() => {
                        setEditMode(true)
                    }}>Redigera
                    </button>
                    <button onClick={() => deleteItem()}>Ta Bort</button>

                </div>
            )}

        </>
    )
}