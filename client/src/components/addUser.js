import React, { Component } from 'react'

import Axios from 'axios'

export class AddUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: null,
            surname: null,
            email: null,
            password: null,
            confirmPassword: null,
            address: null,
            student: null,
            phoneNumberTutor1: null,
            phoneNumberTutor2: null,
            emailAddressTutor1: null,
            emailAddressTutor2: null
        }
    }


    render() {
        return (
            <div>
                <h1>Inscription</h1>

                <p>Prénom : <input name="name" type="text" value={this.state.name} onChange={this.onChange} /></p>
                <p>Nom : <input name="surname" type="text" value={this.state.surname} onChange={this.onChange} /></p>
                <p>Email : <input name="email" type="text" value={this.state.email} onChange={this.onChange} /></p>
                <p>Mot de Passe : <input name="password" type="text" value={this.state.password} onChange={this.onChange} /></p>
                <p>Confirmation du mot de passe : <input name="confirmPassword" type="text" value={this.state.confirmPassword} onChange={this.onChange} /></p>
                <p>Adresse : <input name="address" type="text" value={this.state.address} onChange={this.onChange} /></p>
                <p>Etudiant : <input name="student" type="boolean" value={this.state.student} onChange={this.onChange} /></p>
                <p>Téléphone du tuteur 1 : <input name="phoneNumberTutor1" type="text" value={this.state.phoneNumberTutor1} onChange={this.onChange} /></p>
                <p>Téléphone du tuteur 2 : <input name="phoneNumberTutor2" type="text" value={this.state.phoneNumberTutor2} onChange={this.onChange} /></p>
                <p>Mail du tuteur 1 : <input name="emailAddressTutor1" type="text" value={this.state.emailAddressTutor1} onChange={this.onChange} /></p>
                <p>Mail du tuteur 2 : <input name="emailAddressTutor2" type="text" value={this.state.emailAddressTutor2} onChange={this.onChange} /></p>
               
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
        Axios.post(`http://localhost:5000/users`, {
            name: "Martin",
            surname: "Martin"
        
        
            /*user_id: null,
            class_id: null,
            name: this.state.name,
            surname: this.state.surname,
            emailaddress: this.state.email,
            password: this.state.password,
            address: this.state.address,
            inscriptiondate: null,
            student: this.state.student,
            phonenumbertutor1: this.state.phoneNumberTutor1,
            phonenumbertutor2: this.state.phoneNumberTutor2,
            emailaddresstutor1: this.state.emailaddresstutor1,
            emailaddresstutor2: this.state.emailAddressTutor2*/
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