import React, { Component } from 'react'
import "../css/style.css";

import Axios from 'axios'

export class Administration extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul>
                <li><a>Gestion du personnel</a></li>
                <li><a>Gestion des utilisateurs</a></li>
                <li><a>Gestion des classes</a></li>
            </ul>
        )
    }
}
export default Administration