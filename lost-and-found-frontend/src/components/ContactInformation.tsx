import Contact from "./Contact";
import {Avatar, Button, ButtonGroup, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import React from "react";
import AddContactInfo from "./AddContactInfo";

export default function ContactInformation(props: { contactinfo: { type: string, value: string, id: number }[] }) {


    return (
        <>

            <div className="contact-information">
                <Typography variant={"h4"}>Din Kontakt Information</Typography>
                <List>
                    {props.contactinfo.map((ci, index) => {
                        return (
                            <ListItem key={'ci'+index}>

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
                                <ButtonGroup>
                                    <Button variant={"contained"}>Redigera</Button>
                                    <Button color={"warning"}>Ta Bort</Button>
                                </ButtonGroup>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
            <AddContactInfo/>
        </>

    )
}