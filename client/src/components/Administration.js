import React, { Component } from 'react'
import "../css/style.css";

import Axios from 'axios'

export class Administration extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.userId,
            isEmployee: this.props.employee,
            isAdmin: false
        }

        Axios.get(`http://localhost:5000/getEmployee/${this.state.id}`).then((res) => {
            this.setState({
                isAdmin: res.data.isadmin
            })
        }).catch(err =>{
            console.log(err)
        })
    }

    render() {
        if(this.state.isEmployee === "true" && this.state.isAdmin === true) {
            return (
                <React.Fragment>
                    <ul className="ulAdministration">
                        <li className="liAdministration"><a href="/gestionEmployee" className="aAdministration">Gestion du personnel</a></li>
                        <li className="liAdministration"><a href="/gestionUser" className="aAdministration">Gestion des utilisateurs</a></li>
                        <li className="liAdministration"><a href="/gestionClass" className="aAdministration">Gestion des classes</a></li>
                    </ul>
                </React.Fragment>
            )
        }
        else if (this.state.isEmployee === "true" && this.state.isAdmin === false) {
            return (
                <React.Fragment>
                    <ul className="ulAdministration">
                        <li className="liAdministration"><a href="/administration#" className="aAdministrationDisabled">Gestion du personnel</a></li>
                        <li className="liAdministration"><a href="/administration#" className="aAdministrationDisabled">Gestion des utilisateurs</a></li>
                        <li className="liAdministration"><a href="/gestionClass" className="aAdministration">Gestion des classes</a></li>
                    </ul>
                </React.Fragment>
            )
        }
    }
}
export default Administration