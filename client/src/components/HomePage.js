import React, { Component } from 'react'
import "../css/style.css";

export class HomePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname: null,
            lastname: null,
            emailAddress: null,
            password: null,
            confirmPassword: null,
            address: null,
            student: null,
            phoneNumberTutor1: null,
            phoneNumberTutor2: null,
            emailTutor1: null,
            emailTutor2: null
        }
    }

    render() {
        return (
            <div>
                <h1>Bienvenue</h1>
            </div>
        )
    }
}
export default HomePage