import React from "react";
// @ts-ignore
import get_cookie from '../get_cookie.js'
import axios from "axios";
import ItemsView from "../components/ItemsView";
import ContactInformation from "../components/ContactInformation";
import {Box, Grid, Paper, Typography} from "@mui/material";
import Nav from "../components/Nav";

import {api_get} from '../api-calls.js'

interface IProps {
    isSignedIn: boolean;
    signOut: () => void
}

interface IStates {
    token: string
    userData: { username: string, email: string, password: string, uuid: string, token: string },
    items: { name: "", description: "", uuid: "", code: "" }[]
    contactInformation: { type: string, value: string, id: number }[]

}

export default class ProfilePage extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            token: get_cookie("token"),
            userData: {username: "", email: "", password: "", uuid: "", token: ""},
            items: [],
            contactInformation: []
        }
    }

    async getUserData() {
        let response = await api_get(`/user/me/${this.state.token}`)

        if (response.data != undefined || response.data != {}) {
            return response
        }
    }

    async getUserItems() {
        let response = await api_get(`/user/me/items/${this.state.token}`)

        if (response.data != undefined || response.data != {}) {
            return response
        }
    }

    async getUserContactInfo() {
        let response = await api_get(`/user/me/contact/${get_cookie("token")}`)

        if (response.data != undefined || response.data != {}) {
            return response
        }
    }

    async componentDidMount() {
        let user_data = await this.getUserData()
        let items = await this.getUserItems()
        let contact_info = await this.getUserContactInfo()
        this.setState({
            contactInformation: contact_info,
            userData: user_data,
            items: items,
            token: this.state.token
        })
    }

    render() {
        return (
            <>
                <Nav isSignedIn={this.props.isSignedIn} setSignedOut={this.props.signOut}/>
                <Grid sx={{padding: "1rem"}} spacing={{xs: 1}} container columns={{xs: 3}}>
                    <Grid item xs={1} className={"profile-info"}>
                        <Paper sx={{padding: '.5rem'}} variant={"outlined"}>
                            <Typography variant={"h4"}>Hej {this.state.userData.username}!</Typography>
                            <Typography>Detta är din profil sida, här kan du hitta bland annat dina prylar men också den
                                kontakt
                                information du har angivit. Om du har några funderingar kontakta oss gärna.</Typography>
                            <ContactInformation contactinfo={this.state.contactInformation}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper sx={{padding: '.5rem'}} className={"items"} variant={"outlined"}>
                            <ItemsView items={this.state.items}/>
                        </Paper>
                    </Grid>

                </Grid>
            </>

        )
    }
}

