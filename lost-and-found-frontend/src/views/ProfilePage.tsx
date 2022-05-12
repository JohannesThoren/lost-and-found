import React from "react";
// @ts-ignore
import get_cookie from '../get_cookie.js'
import axios from "axios";
import ItemsView from "../components/ItemsView";
import ContactInformation from "../components/ContactInformation";

interface IProps {
}

interface IStates {
    token: string
    userData: { username: string, email: string, password: string, uuid: string, token: string },
    items: {name: "", description: "", uuid: "", code: ""}[]
    contactInformation: { type: string, value: string, id: number }[]

}

export default class ProfilePage extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            token: get_cookie("token"),
            userData: {username: "", email: "", password: "", uuid: "", token: ""},
            items: [],
            contactInformation:[]
        }
    }

    async getUserData() {
        let response = await axios.get(`http://localhost:3001/user/me/${this.state.token}`)
        console.log(response)

        if (response.data != undefined || response.data != {}) {
            return response.data
        }
    }

    async getUserItems() {
        let response = await axios.get(`http://localhost:3001/user/me/items/${this.state.token}`)
        console.log(response)

        if (response.data != undefined || response.data != {}) {
            return response.data
        }
    }

    async getUserContactInfo() {
        let response = await axios.get(`http://localhost:3001/user/me/contact/${get_cookie("token")}`)
        console.log(response)

        if (response.data != undefined || response.data != {}) {
            return response.data
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
                <div className={"profile-info"}>
                    <div>
                        <h1>Hej {this.state.userData.username}!</h1>
                        <p>Detta är din profil sida, här kan du hitta bland annat dina prylar men också den kontakt
                            information du har angivit. Om du har några funderingar kontakta oss gärna.</p>
                    </div>
                    <div>

                        <ItemsView items={this.state.items}/>
                        <ContactInformation contactinfo={this.state.contactInformation}/>
                    </div>
                </div>
            </>
        )
    }
}

