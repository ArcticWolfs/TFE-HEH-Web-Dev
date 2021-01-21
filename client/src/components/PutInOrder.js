import React, { Component } from 'react'
import "../css/style.css";

import Axios from 'axios'

export class PutInOrder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.userId,
            employee: this.props.employee
        }
        if(this.state.employee==="true"){
            Axios.get(`http://localhost:5000/getClass/${this.state.id}`).then((res) => {
                if(document.getElementById("centrer").childElementCount===0){
                    for(let i=0; i<res.data.length; i++){
                        let name = document.createElement("p");
                        name.innerHTML = res.data[i].name + " : ";
                        name.className = "nameClassDrive"
                        document.getElementById("centrer").append(name);
                        let option = document.createElement('textarea');
                        option.value = res.data[i].drive;
                        option.className = "drive";
                        option.id = res.data[i].class_id;
                        option.onblur = this.onBlur;
                        document.getElementById("centrer").append(option);
                    }
                }
            })
        }
        else {
            Axios.get(`http://localhost:5000/getUser/${this.state.id}`).then((res) => {
                Axios.get(`http://localhost:5000/getClassById/${res.data.class_id}`).then((res2) => {
                    console.log(res2.data)
                    if(document.getElementById("centrer").childElementCount===0){
                        let name = document.createElement("p");
                        name.innerHTML = res2.data[0].name + " : ";
                        name.className = "nameClassDrive"
                        document.getElementById("centrer").append(name);
                        let option = document.createElement('a');
                        option.innerHTML = res2.data[0].drive;
                        option.href = res2.data[0].drive;
                        option.className = "drive";
                        option.id = res2.data[0].class_id;
                        option.readOnly = true
                        document.getElementById("centrer").append(option);
                    }
                })
            });
        }

    }

    render() {
        if (this.state.employee === "false"){
            return (
                <React.Fragment>
                    <div id="centrer">
                        
                    </div>
                </React.Fragment>
            )
        }else if (this.state.employee === "true"){
            return (
                <React.Fragment>
                    <div id="centrer">

                    </div>
                </React.Fragment>
            )
        }
    }
    onBlur = (event) => {
        console.log(event.target.value)
        Axios.put(`http://localhost:5000/modifyDrive/${event.target.id}`, {
            drive: event.target.value
        })
        .then((res) => {
        })
        .catch(function (err){
            console.log(err)
        })
    }

    
}
export default PutInOrder