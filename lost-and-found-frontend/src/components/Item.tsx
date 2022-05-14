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
    Card, CardActions,
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
        <Card variant={"outlined"} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'max(30vw,25rem)',
            padding: '1rem'
        }}>
            <Box>
                {isEditMode ?
                    <>
                        <CardHeader
                            title={"Redigera Prylinformation"}
                            subheader={"Nu kan du redigera prylinformationen. alltså prylens namn och beskrivning"}
                        />

                        <CardContent>

                            <TextField
                                label={"Name"}
                                value={itemName}
                                variant={"standard"}
                                onChange={(e) => setItemName(e.target.value)}
                            />

                            <TextField
                                label={"Description"}
                                value={itemDescription}
                                variant={'standard'}
                                onChange={(e) => setItemDescription(e.target.value)}
                            />

                        </CardContent>

                        <CardActions>
                            <ButtonGroup>
                                <Button onClick={save}>Save</Button>
                                <Button onClick={() => setEditMode(false)}>Cancel</Button>
                            </ButtonGroup>
                        </CardActions>
                    </>
                    :
                    <>
                        <CardHeader
                            title={props.item.name}
                            subheader={props.item.description}
                        />

                        <CardContent>
                            <Typography variant={"body2"}>
                                Prylkod: {props.item.code}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ButtonGroup>
                                <Button variant={"contained"} onClick={() => setEditMode(true)}>Redigera</Button>
                                <Button color={"warning"} onClick={deleteItem}>Ta Bort</Button>
                            </ButtonGroup>
                        </CardActions>

                    </>
                }


            </Box>

            <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <QRCode value={`http://${window.location.host}/code/${props.item.code}`} size={150}/>
            </Box>

        </Card>
    )
}