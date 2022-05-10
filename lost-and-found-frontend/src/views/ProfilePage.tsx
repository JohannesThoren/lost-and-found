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
            userData: {username: "", email: "", password: "", uuid: "", token: ""}
        }
    }

    async getUserData() {
        let response = await axios.get(`http://localhost:3001/user/me/${this.state.token}`)
        console.log(response)

        if(response.data != undefined || response.data != {}) {
            this.setState({token: response.data.token, userData: response.data})
        }
    }

    async getUserItems() {

    }

    async getUserContactInfo() {

    }

    async componentDidMount() {
        await this.getUserData()
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

