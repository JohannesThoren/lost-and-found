import React from "react";
import Nav from "../components/Nav";
import {Paper, Typography} from "@mui/material";
import CodeInput from "../components/CodeInput";

interface IProps {
    isSignedIn: boolean,
    setSignOut: () => void
}

interface IStates {
}

export default class Home extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);

    }



    render() {
        return (
            <>
                <Nav setSignedOut={this.props.setSignOut} isSignedIn={this.props.isSignedIn}/>
                <CodeInput/>
            </>
        );
    }
}