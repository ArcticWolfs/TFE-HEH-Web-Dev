import React, { Component } from 'react'
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Axios from 'axios'
import Modal from "react-modal";

Modal.setAppElement("#root");

export class ModifyClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "",
            tutor_id: "",
            name: "",
            year: "",
            isOpen: true,
            isOpen2: false,
            textError: ""
        }

        Axios.get(`http://localhost:5000/getAllClass`).then((res) => {
            let nbClass=res.data.length;
            if(document.getElementById("selectClass").childElementCount===0){
                for (let i = 0; i < nbClass; i++) {
                    let option = document.createElement('option');
                    option.value = res.data[i].class_id;
                    option.innerHTML = res.data[i].name;
                    option.setAttribute('name',res.data[i].name);
                    if(i===0)option.setAttribute('selected',true);
                    document.getElementById("selectClass").appendChild(option);
                    
                }
            }
            this.setState({
                id: res.data[0].class_id || "",
                tutor_id: res.data[0].tutor_id || "",
                name: res.data[0].name || "",
                year: res.data[0].year || ""
            }, () => {
                Axios.get(`http://localhost:5000/getAllEmployees`).then((res2) => {
                    let nbEmployee=res2.data.length;
                    if(document.getElementById("selectTutor").childElementCount===1){
                        for (let i = 0; i < nbEmployee; i++) {
                            let option = document.createElement('option');
                            option.value = res2.data[i].employee_id;
                            option.innerHTML = res2.data[i].emailaddress;
                            option.setAttribute('name',res2.data[i].emailaddress);
                            if(res2.data[i].employee_id === this.state.tutor_id)option.setAttribute('selected',true);
                            document.getElementById("selectTutor").appendChild(option);
                        }
                    }
                }).catch(err => console.log(err))
            }) 
        }).catch(err =>{
            console.log(err)
        })
        
    }

    render() {

        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlaymodif"
                    closeTimeoutMS={500}>
                    <div id="inscrivezvous">Modification</div>

                    <p>
                        <select className="champConnect" id="selectClass" onChange={this.onChange}>
                        </select>
                    </p>
                    <p>
                        <select className="champConnect" id="selectTutor" onChange={this.onChange}>
                            <option value="none">None</option>
                        </select>
                    </p>
                    <p><input className="champConnect" placeholder="Année (2021-2022)" name="year" type="text" value={this.state.year} onChange={this.onChange} pattern="[0-9]{4}[-][0-9]{4}" onFocus={this.setRequired}/></p>
                    
                    <button onClick={this.toggleModal} className="boutonModal btn btn-outline-light">Annuler</button>
                    <button onClick={this.handleClickOpen} className="boutonModal btn btn-outline-light">Supprimer</button>
                    <button onClick={this.onClick} className="boutonModal btn btn-outline-light">Modifier</button>
                </Modal>

                <Dialog
                    open={this.state.isOpen2}
                    onClose={this.handleIsClose2}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {this.state.textError}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleIsClose2} color="primary" class="boutonModal btn btn-outline-light">
                        Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {"Attention"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Êtes-vous sûr de vouloir supprimer cette classe : {this.state.name} ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" class="boutonModal btn btn-outline-light">
                        Annuler
                        </Button>
                        <Button onClick={this.deleteClass} color="primary" class="boutonModal btn btn-outline-light">
                        Supprimer
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment> 
        )
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    setRequired = (event) => {
        event.target.required = true;
    }

    handleIsOpen2 = () => {
        this.setState({ isOpen2: true });
    };

    handleIsClose2 = () => {
        this.setState({ isOpen2: false });
    };

    toggleModal = () => {
        this.setState({
            isOpen: false
        })
        this.props.toModify()
        document.location.reload();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            if(event.target.id==="selectClass"){
                Axios.get(`http://localhost:5000/getClassById/${event.target.value}`).then((res) => {
                    this.setState({
                        id: res.data[0].class_id || "",
                        tutor_id: res.data[0].tutor_id || "",
                        name: res.data[0].name || "",
                        year: res.data[0].year || ""
                    }, () => {
                        for(let i=0;i<document.getElementById("selectTutor").options.length;i++){
                            if(this.state.tutor_id.toString()===document.getElementById("selectTutor").options[i].value.toString()) document.getElementById("selectTutor").value=document.getElementById("selectTutor").options[i].value;
                        }
                    }) 
                }).catch(err =>{
                    console.log(err)
                })
            }
        })
    }

    deleteClass = () => {
        Axios.delete(`http://localhost:5000/deleteClass/${this.state.id}`, {

        })
        .then(function (res) {
            document.location.reload()
            console.log(res);
        })
        .catch(function (err){
            console.log(err)
        })
    }

    onClick = () =>{

        const Security = require("../Security");
        const security = new Security();

        let v_tutor = document.getElementById("selectTutor").value;
        let v_class_id = document.getElementById("selectClass").value;
        let v_year = this.state.year;

        try
        {
            v_year = v_year.trim();

            let testOk = false;

            if (security.yearClassVerification(v_year) === false) {
                testOk=true;
            }

            if (testOk === true)
            {
                Axios.put(`http://localhost:5000/modifyClass`, {
                    tutor_id: v_tutor,
                    class_id: v_class_id,
                    year: v_year
                })
                .then((res) => {
                    if(res.data === "Class Updated"){
                        this.toggleModal()
                        document.location.reload()
                    }
                    else {
                        this.handleIsOpen2()
                        this.setState({textError: "Erreur lors de la modification de la classe"})
                    } 
                })
                .catch(function (err){
                    console.log(err)
                }) 
            }
            else
            {
                console.log("Bad character detected aborting the query, please try again!");
                this.handleIsOpen2()
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
export default ModifyClass
