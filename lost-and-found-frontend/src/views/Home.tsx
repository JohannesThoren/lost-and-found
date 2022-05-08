import React from "react";
import Nav from "../components/Nav";

interface IProps {
    isSignedIn: boolean
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
                <Nav isSignedIn={this.props.isSignedIn}/>
            </>
        );
    }
}