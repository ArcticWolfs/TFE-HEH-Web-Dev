import React, { Component } from 'react'

import Axios from 'axios'

export class AddUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: null,
            surname: null,
            emailaddress: null,
            password: null,
            confirmpassword: null,
            address: null,
            student: null,
            phonenumbertutor1: null,
            phonenumbertutor2: null,
            emailaddresstutor1: null,
            emailaddresstutor2: null
        }
    }

    render() {
        return (
            <div>
                <h1>Inscription</h1>

                <p><input placeholder="Prénom" name="name" type="text" value={this.state.name} onChange={this.onChange} /></p>
                <p><input placeholder="Nom" name="surname" type="text" value={this.state.surname} onChange={this.onChange} /></p>
                <p><input placeholder="Email" name="emailaddress" type="text" value={this.state.emailaddress} onChange={this.onChange} /></p>
                <p><input placeholder="Mot de passe" name="password" type="text" value={this.state.password} onChange={this.onChange} /></p>
                <p><input placeholder="Confirmation du mot de passe" name="confirmpassword" type="text" value={this.state.confirmpassword} onChange={this.onChange} /></p>
                <p><input placeholder="Addresse" name="address" type="text" value={this.state.address} onChange={this.onChange} /></p>
                <p><input placeholder="Etudiant" name="student" type="boolean" value={this.state.student} onChange={this.onChange} /></p>
                <p><input placeholder="Téléphone du tuteur 2" name="phonenumbertutor1" type="text" value={this.state.phonenumbertutor1} onChange={this.onChange} /></p>
                <p><input placeholder="Téléphone du tuteur 1" name="phonenumbertutor2" type="text" value={this.state.phonenumbertutor2} onChange={this.onChange} /></p>
                <p><input placeholder="Mail du tuteur 1" name="emailaddresstutor1" type="text" value={this.state.emailaddresstutor1} onChange={this.onChange} /></p>
                <p><input placeholder="Mail du tuteur 2" name="emailaddresstutor2" type="text" value={this.state.emailaddresstutor2} onChange={this.onChange} /></p>
               
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
            user_id: null,
            class_id: null,
            name: this.state.name,
            surname: this.state.surname,
            emailaddress: this.state.emailaddress,
            password: this.state.password,
            address: this.state.address,
            inscriptiondate: null,
            student: this.state.student,
            phonenumbertutor1: this.state.phonenumbertutor1,
            phonenumbertutor2: this.state.phonenumbertutor2
            /*emailaddresstutor1: this.state.emailaddresstutor1,
            emailaddresstutor2: this.state.emailaddresstutor2*/
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