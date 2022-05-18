import React, {useState} from "react";
import {api_delete} from "../api-calls";
import get_cookie from "../get_cookie";
import {Avatar, Button, ButtonGroup, ListItemAvatar, ListItemText} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import {useNavigate} from "react-router";

export default function Contact(props: { contactinfo: { type: string, value: string, id: number } }) {

    const [isEditMode, setEditMode] = useState(false);
    const [value, setValue] = useState(props.contactinfo.value);
    const [type, setType] = useState(props.contactinfo.type);
    const del = async () => {
        await api_delete(`/contact/delete/${props.contactinfo.id}/${get_cookie('token')}`)
        window.location.reload()
    }

    return (
        <>
            <ListItemAvatar>
                <Avatar>
                    {props.contactinfo.type == "phone" && (
                        <LocalPhoneIcon/>
                    )}
                    {props.contactinfo.type == "email" && (
                        <EmailIcon/>
                    )}
                    {props.contactinfo.type == "social media" && (
                        <PublicIcon/>
                    )}
                </Avatar>
            </ListItemAvatar>

            <ListItemText primary={props.contactinfo.value}/>
            <ButtonGroup>

                <Button onClick={async () => await del()} color={"warning"}>Ta Bort</Button>
            </ButtonGroup>

        </>
    )
}