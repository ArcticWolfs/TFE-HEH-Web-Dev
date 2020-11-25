import React, { Component } from 'react'
import "../css/style.css";

import Axios from 'axios'

export class AccountPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.userId,
            class: null,
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            confirmPassword: null,
            address: null,
            inscription: null,
            student: null,
            phoneNumberTutor1: null,
            phoneNumberTutor2: null,
            emailTutor1: null,
            emailTutor2: null

        }
        Axios.get(`http://localhost:5000/getUser/${this.state.id}`).then((res) => {
            this.setState({
                class: res.data.class_id,
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                email: res.data.emailaddress,
                address: res.data.address,
                inscription: res.data.inscriptiondate.split("T",1),
                student: res.data.student,
                phoneNumberTutor1: res.data.phonenumbertutor1,
                phoneNumberTutor2: res.data.phonenumbertutor2,
                emailTutor1: res.data.emailtutor1,
                emailTutor2: res.data.emailtutor2
                
            })
        }).catch(err =>{
            this.setState ({
                name: '',
                address: '',
                classification: 'Salaried',
                method: 'Physical',
                schedule: 'Monthly'
            })
            console.log(err)
        })
    }

    render() {
        if (this.state.student===true){
            return (
                <React.Fragment>
                    <div id="myAccount">
                        <div id="borderStudent">
                        <h1>Mon compte</h1>
                        <table>
                            <tr>
                                <td><p>Prénom : </p></td>
                                <td><p><input className="champModify" name="firstname" type="text" readOnly="readonly" value={this.state.firstname} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Nom : </p></td>
                                <td><p><input className="champModify" name="lastname" type="text" readOnly="readonly" value={this.state.lastname} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Email : </p></td>
                                <td><p><input className="champModify" name="emailAddress" type="email" readOnly="readonly" value={this.state.email} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Adresse : </p></td>
                                <td><p><input className="champModify" name="address" type="text" readOnly="readonly" value={this.state.address} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Classe : </p></td>
                                <td><p><input className="champModify" name="classe" type="text" readOnly="readonly" value={this.state.class} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Téléphone tuteur 1 : </p></td>
                                <td><p><input className="champModify" name="phoneNumberTutor1" type="text" readOnly="readonly" value={this.state.phoneNumberTutor1} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Téléphone tuteur 2 : </p></td>
                                <td><p><input className="champModify" name="phoneNumberTutor2" type="text" readOnly="readonly" value={this.state.phoneNumberTutor2} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Email tuteur 1 : </p></td>
                                <td><p><input className="champModify" onKeyDown={this.onKeyDown} name="emailTutor1" type="email" readOnly="readonly" value={this.state.emailTutor1} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Email tuteur 2 : </p></td>
                                <td><p><input className="champModify" onKeyDown={this.onKeyDown} name="emailTutor2" type="email" readOnly="readonly" value={this.state.emailTutor2} onChange={this.onChange} /></p></td>
                            </tr>
                        </table>
                        
                        <p>Inscription : {this.state.inscription}</p>

                        <button onClick={this.deleteAccount} className="boutonModal btn btn-outline-danger">Supprimer</button>
                        <button onClick={this.toModify} className="boutonModal btn btn-outline-light">Modifier</button>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <div id="myAccount">
                        <div id="borderParent">
                        <h1>Mon compte</h1>
                        <table>
                            <tr>
                                <td><p>Prénom : </p></td>
                                <td><p><input className="champModify" name="firstname" type="text" readOnly="readonly" value={this.state.firstname} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Nom : </p></td>
                                <td><p><input className="champModify" name="lastname" type="text" readOnly="readonly" value={this.state.lastname} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Email : </p></td>
                                <td><p><input className="champModify" name="emailAddress" type="email" readOnly="readonly" value={this.state.email} onChange={this.onChange} /></p></td>
                            </tr>
                            <tr>
                                <td><p>Adresse : </p></td>
                                <td><p><input className="champModify" name="address" type="text" readOnly="readonly" value={this.state.address} onChange={this.onChange} /></p></td>
                            </tr>
                        </table>
                        
                        <p>Inscription : {this.state.inscription}</p>

                        <button onClick={this.deleteAccount} className="boutonModal btn btn-outline-danger">Supprimer</button>
                        <button onClick={this.toModify} className="boutonModal btn btn-outline-light">Modifier</button>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
    
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    deleteAccount = () =>{
        Axios.delete(`http://localhost:5000/deleteUser/${this.state.id}`, {

        })
        .then(function (res) {
            localStorage.clear()
            sessionStorage.clear()
            document.location.reload()
            console.log(res);
        })
        .catch(function (err){
            console.log(err)
        })
    }

    toModify = () => {

    }
}
export default AccountPage