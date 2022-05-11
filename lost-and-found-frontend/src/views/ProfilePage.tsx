import React from "react";
import getCookie from '../getCookie.js'
import axios from "axios";

interface IProps {
}

interface IStates {
    token: string
    userData: {username: string, email: string, password: string, uuid: string, token: string}
}

export default class ProfilePage extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            token: getCookie("token"),
            userData: {username: "", email: "", password: "", uuid: "", token: ""},
            items: [{name: "", description: "", uuid: ""}]
        }
    }

    async getUserData() {
        let response = await axios.get(`http://localhost:3001/user/me/${this.state.token}`)
        console.log(response)

        if(response.data != undefined || response.data != {}) {
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

    }

    async componentDidMount() {
        let user_data = await this.getUserData()
        let items = await this.getUserItems()

        this.setState({userData: user_data, items: items, token: this.state.token})
    }

    render() {
        return (
            <>
                <div className={"profile-info"}>
                    <h1>Hello {this.state.userData.username}!</h1>
                </div>
            </>
        )
    }
}
