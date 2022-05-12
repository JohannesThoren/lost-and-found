import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
// @ts-ignore
import get_cookie from "../get_cookie";
import QRCode from "react-qr-code";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton, TextField,
    Typography
} from "@mui/material";

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
        let response = await axios.put(`http://localhost:3001/item/update/${get_cookie('token')}`, data)
        window.location.reload()
    }

    const deleteItem = async () => {
        await axios.delete(`http://localhost:3001/item/delete/${props.item.uuid}/${get_cookie('token')}`)
        window.location.reload()
    }

    return (
        <Card sx={{display: 'flex'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    {isEditMode ? (
                            <>
                                <Box>
                                    <TextField value={itemName} variant={"standard"} label={"Namn"} onClick={(e) => {
                                        setItemName(e.target.value)
                                    }}/>
                                </Box>
                                <Box>
                                    <TextField value={itemDescription} variant={"standard"} label={"Beskrivning"}
                                               onClick={(e) => {
                                                   setItemDescription(e.target.value)
                                               }}/>
                                </Box>
                            </>
                        ) :
                        (
                            <>
                                <Typography component="div" variant="h5">
                                    {itemName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {itemDescription}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Pryl Kod: {props.item.code}
                                </Typography>
                            </>

                        )}
                </CardContent>
                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                    {isEditMode ? (
                        <Button variant="contained" onClick={async () => await save()}>Spara</Button>
                    ) : (

                        <ButtonGroup>
                            <Button variant="contained" onClick={() => setEditMode(true)} aria-label="previous">
                                Redigera
                            </Button>
                            <Button variant="outlined" onClick={async () => {
                                await deleteItem()
                            }} aria-label="play/pause">
                                Ta Bort
                            </Button>
                        </ButtonGroup>
                    )}
                </Box>
            </Box>
            <QRCode value={`http://${window.location.hostname}/code/${props.item.code}`} size={100}/>
        </Card>
    )
}