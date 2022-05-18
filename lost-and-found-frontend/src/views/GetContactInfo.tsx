import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import axios from "axios";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import Nav from "../components/Nav";
import {str_api_root} from "../api-calls";

export default function (props: { isSignedIn: boolean, setSignedOut: () => void }) {
    let {code} = useParams();
    let [contactinfo, setContactInfo] = useState([])
    let [username, setUsername] = useState("")
    let [item, setItemInfo] = useState({
        name: undefined,
        description: undefined,
    })

    useEffect(() => {
        get_contact_info()

    }, [])

    const get_contact_info = () => {
        let res = axios.get(`${str_api_root}/item/code/${code}`).then((res) => {
            setContactInfo(res.data.contact_info)
            setUsername(res.data.contact_info[0].username)
            setItemInfo(res.data.item)
        })
    }

    return (
        <>
            <Nav isSignedIn={props.isSignedIn} setSignedOut={props.setSignedOut}/>
            <Paper variant={"outlined"} className={"contact-info-screen"}>
                <Box>
                    <Typography variant={"h2"}>{item.name}</Typography>
                    <Typography variant={"subtitle1"}>{item.description}</Typography>
                </Box>
                <Box>
                    <Typography variant={"h6"}>Ägare och Kontakt information</Typography>
                    <Typography>Denna pryl ägs utav {username} och går att kontakta på följande sätt</Typography>
                    <List>
                        {contactinfo.map((ci, index) => {
                            return (
                                <ListItem key={index}>

                                    <ListItemAvatar>
                                        <Avatar>
                                            {ci.type == "phone" && (
                                                <LocalPhoneIcon/>
                                            )}
                                            {ci.type == "email" && (
                                                <EmailIcon/>
                                            )}
                                            {ci.type == "social media" && (
                                                <PublicIcon/>
                                            )}
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText primary={ci.value}/>
                                </ListItem>
                            )
                        })}
                    </List>

                </Box>
            </Paper>
        </>

    )
}