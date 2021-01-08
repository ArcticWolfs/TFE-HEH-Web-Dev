import React, { Component, useState } from 'react'
import "../css/style.css";

import Axios from 'axios'

var LIST_ROW = []

export class AttributeClass extends Component {

    constructor(props) {
        super(props)

        Axios.get(`http://localhost:5000/getAllEmployees`).then((res) => {
            let nbEmployee=res.data.length;
            if(document.getElementById("selectTutor").childElementCount===0){
                for (let i = 0; i < nbEmployee; i++) {
                    let option = document.createElement('option');
                    option.value = res.data[i].employee_id;
                    option.innerHTML = res.data[i].emailaddress;
                    option.setAttribute('name',res.data[i].emailaddress);
                    if(i === 0)option.setAttribute('selected',true);
                    document.getElementById("selectTutor").appendChild(option);
                }
            }
        }).catch(err => console.log(err))
        Axios.get(`http://localhost:5000/getAllClass`).then((res) => {
            LIST_ROW=[];
            let nbClass=res.data.length;
            for (let i = 0; i < nbClass; i++) {
                LIST_ROW.push({id: res.data[i]["class_id"],className: res.data[i]["name"]})
                this.setState({ entries: true }, () => {
                    document.getElementById("isTeacher"+res.data[i]["class_id"]).onclick = this.onClick;
                    document.getElementById("isTeacher"+res.data[i]["class_id"]).checked = false;
                });
                let params = document.getElementById("selectTutor").value.toString() + "." + res.data[i]["class_id"].toString()
                Axios.get(`http://localhost:5000/getIntertable/${params}`).then((res2) => {
                    console.log(res2.data)
                    if(res2.data[0].employee_id.toString() === document.getElementById("selectTutor").value.toString()){
                        document.getElementById("isTeacher"+res.data[i]["class_id"]).checked = true;
                    }
                    else {document.getElementById("isTeacher"+res.data[i]["class_id"]).checked = false;}
                })
                .catch(function (err){
                    console.log(err)
                })
            }
        }).catch(err => console.log(err))
        
    }

    render() {
        return (
           
            <React.Fragment>
                <div className="centerGestion">
                    <h1>Attribuer une classe</h1>
                    <p>Tuteur : <select className="champConnect" id="selectTutor" onChange={this.onChange}></select></p>
                </div>

                <div>
                    <table className="table table-sm table-dark EmployeeList">
                        <tr>
                            <th scope="col" className="className">Classe</th>
                            <th scope="col" className="isTeacher">Donne cours</th>
                        </tr>
                        <ClassList entries={LIST_ROW}/>
                    </table>
                </div>
                
            </React.Fragment>
        )
    }

    onChange = () => {
        Axios.get(`http://localhost:5000/getAllClass`).then((res) => {
            LIST_ROW=[];
            let nbClass=res.data.length;
            for (let i = 0; i < nbClass; i++) {
                LIST_ROW.push({id: res.data[i]["class_id"],className: res.data[i]["name"]})
                this.setState({ entries: true }, () => {
                    document.getElementById("isTeacher"+res.data[i]["class_id"]).onclick = this.onClick;
                    document.getElementById("isTeacher"+res.data[i]["class_id"]).checked = false;
                });
                let params = document.getElementById("selectTutor").value.toString() + "." + res.data[i]["class_id"].toString()
                Axios.get(`http://localhost:5000/getIntertable/${params}`).then((res2) => {
                    console.log(res2.data)
                    if(res2.data[0].employee_id.toString() === document.getElementById("selectTutor").value.toString()){
                        document.getElementById("isTeacher"+res.data[i]["class_id"]).checked = true;
                    }
                    else {document.getElementById("isTeacher"+res.data[i]["class_id"]).checked = false;}
                })
                .catch(function (err){
                    console.log(err)
                })
            }
        }).catch(err => console.log(err))
    }

    onClick = (event) => {
        if(event.target.checked===true){
            Axios.post(`http://localhost:5000/createIntertable`, {
                employee_id: document.getElementById("selectTutor").value,
                class_id: event.target.value
            })
            .then((res) => {
            })
            .catch(function (err){
                console.log(err)
            })
        }
        else if (event.target.checked===false){
            let params = document.getElementById("selectTutor").value.toString() + "." + event.target.value.toString()
            Axios.delete(`http://localhost:5000/deleteIntertable/${params}`, {
            })
            .then((res) => {
            })
            .catch(function (err){
                console.log(err)
            })
        }
    }
}

const ClassList = ({ entries }) => (
    <tbody>
    {
        entries.map(({id, className }) => (
            <tr key={id}>
                <td className="className">{className}</td>
                <td className="isTeacher"><input type="checkbox" id={"isTeacher"+id} value={id}></input></td>
            </tr>
        ))
    }   
    </tbody>
    
)

export default AttributeClass