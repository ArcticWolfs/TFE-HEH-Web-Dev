import React, { Component } from 'react'
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import Axios from 'axios'
import Modal from "react-modal";

Modal.setAppElement("#root");

export class CreateClass extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            year: "",
            isOpen: true,
            open: false,
            textError: ""
        }
        Axios.get(`http://localhost:5000/getAllEmployees`).then((res) => {
            let nbEmployee=res.data.length;
            if(document.getElementById("selectTutor").childElementCount===1){
                for (let i = 0; i < nbEmployee; i++) {
                    let option = document.createElement('option');
                    option.value = res.data[i].employee_id;
                    option.innerHTML = res.data[i].emailaddress;
                    option.setAttribute('name',res.data[i].emailaddress);
                    document.getElementById("selectTutor").appendChild(option);
                    document.getElementById("selectTutor").onchange = this.onChange;
                }
            }
            
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}>
                    <div id="inscrivezvous">Créer une classe</div>

                   <p><select className="champConnect" id="selectTutor">
                            <option value="none" selected>Tuteur</option>
                        </select>
                    </p>
                    <p><input className="champConnect" placeholder="Nom de la classe" name="name" type="text" value={this.state.name} onChange={this.onChange} pattern="[1-6][A-Z]" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Année (2021-2022)" name="year" type="text" value={this.state.year} onChange={this.onChange} pattern="[0-9]{4}[-][0-9]{4}" onFocus={this.setRequired}/></p>

                    <button onClick={this.toggleModal} className="boutonModal btn btn-outline-light">Annuler</button>
                    <button onClick={this.onClick} className="boutonModal btn btn-outline-light">Créer</button>
                </Modal>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {this.state.textError}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" class="boutonModal btn btn-outline-light">
                        Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment> 
        )
    }

    setRequired = (event) => {
        event.target.required = true;
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    toggleModal = () => {
        this.setState({
            isOpen: false
        })
        this.props.toCreate();
        document.location.reload();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClick = () =>{

        const Security = require("../Security");
        const security = new Security();

        let v_tutor = document.getElementById("selectTutor").value;
        let v_name = this.state.name;
        let v_year = this.state.year;

        try
        {
            v_name = v_name.trim();
            v_year = v_year.trim();

            let testOk = false;

            if (security.nameClassVerification(v_name) === false) {
                if (security.yearClassVerification(v_year) === false) {
                    testOk=true;
                }
            }

            if (testOk === true)
            {
                Axios.post(`http://localhost:5000/createClass`, {
                    tutor_id: v_tutor,
                    name: v_name,
                    year: v_year
                })
                .then((res) => {
                    console.log(res.data.class_id);
                    if(res.data.class_id){
                        this.toggleModal()
                        document.location.reload()
                    }
                    else {
                        this.handleOpen()
                        this.setState({textError: "Nom de classe déjà utilisé"})
                    } 
                })
                .catch(function (err){
                    console.log(err)
                }) 
            }
            else
            {
                console.log("Bad character detected aborting the query, please try again!");
                this.handleOpen()
                if (this.state.name === "" || this.state.year==="" ){
                    this.setState({textError: "Un champ obligatoire n'a pas été complété"})
                }
                else this.setState({textError: "Caractère(s) invalide(s) utilisé(s)"})
            }
        }
        catch (err)
        {
            console.error("Error while creating a class" + err.message);
        }
    }
    
}
export default CreateClass