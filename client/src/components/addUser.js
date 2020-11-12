import React, { Component } from 'react'

import Axios from 'axios'

export class AddUser extends Component {

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
                <h1>Inscription</h1>

                <p><input placeholder="Prénom" name="firstname" type="text" value={this.state.firstname} onChange={this.onChange} /></p>
                <p><input placeholder="Nom" name="lastname" type="text" value={this.state.lastname} onChange={this.onChange} /></p>
                <p><input placeholder="Email" name="emailAddress" type="text" value={this.state.emailAddress} onChange={this.onChange} /></p>
                <p><input placeholder="Mot de passe" name="password" type="text" value={this.state.password} onChange={this.onChange} /></p>
                <p><input placeholder="Confirmation du mot de passe" name="confirmPassword" type="text" value={this.state.confirmPassword} onChange={this.onChange} /></p>
                <p><input placeholder="Addresse" name="address" type="text" value={this.state.address} onChange={this.onChange} /></p>
                <p><input id="isStudent" placeholder="Etudiant" name="student" type="checkbox" value={this.state.student} onChange={this.onChange} />Étudiant</p>
                <p><input placeholder="Téléphone du tuteur 2" name="phoneNumberTutor1" type="text" value={this.state.phoneNumberTutor1} onChange={this.onChange} /></p>
                <p><input placeholder="Téléphone du tuteur 1" name="phoneNumberTutor2" type="text" value={this.state.phoneNumberTutor2} onChange={this.onChange} /></p>
                <p><input placeholder="Mail du tuteur 1" name="emailTutor1" type="text" value={this.state.emailTutor1} onChange={this.onChange} /></p>
                <p><input placeholder="Mail du tuteur 2" name="emailTutor2" type="text" value={this.state.emailTutor2} onChange={this.onChange} /></p>
               
                <button onClick={this.onClick} className="btn btn-success">S'inscrire</button>
            </div>
        )
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    onClick = () =>{
        this.isStudent = 0;
        if(document.getElementById('isStudent').checked == true){
            this.isStudent = 1;
        }
        Axios.post(`http://localhost:5000/users`, {   
            user_id: null,
            class_id: null,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            emailAddress: this.state.emailAddress,
            password: this.state.password,
            address: this.state.address,
            inscriptiondate: null,
            student: this.isStudent,
            phoneNumberTutor1: this.state.phoneNumberTutor1,
            phoneNumberTutor2: this.state.phoneNumberTutor2,
            emailTutor1: this.state.emailTutor1,
            emailTutor2: this.state.emailTutor2
        })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err){
            console.log(err)
        }) 
    }
    
}
export default AddUser