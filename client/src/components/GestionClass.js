import React, { Component } from 'react'
import "../css/style.css";

import Axios from 'axios'

var LIST_ROW = []

export class GestionClass extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: null,
            lastname: null,
            firstname: null,
            class_id: null,
            tutor_id: null,
            name: null,
            year: null
        }

        Axios.get(`http://localhost:5000/getAllStudents`).then((res) => {
            LIST_ROW=[];
            let nbStudents=res.data.length;
            for (let i = 0; i < nbStudents; i++) {
                LIST_ROW.push({id: res.data[i]["user_id"],lastname: res.data[i]["lastname"],firstname: res.data[i]["firstname"],class_id: res.data[i]["class_id"]})
                this.setState({ entries: true }, () => {
                    let option = document.createElement('option');
                    option.value = "none";
                    option.innerHTML = "";
                    option.name = null;
                    document.getElementById("select"+res.data[i]["user_id"]).appendChild(option);
                    Axios.get(`http://localhost:5000/getAllClass`).then((res2) => {
                        let nbClass=res2.data.length;
                        for (let c = 0; c < nbClass; c++) {
                            let option = document.createElement('option');
                            option.value = res2.data[c].name;
                            option.innerHTML = res2.data[c].name;
                            option.setAttribute('name',res2.data[c].class_id);
                            if(res2.data[c]["class_id"] === res.data[i]["class_id"])option.setAttribute('selected',true);
                            document.getElementById("select"+res.data[i]["user_id"]).appendChild(option);
                            document.getElementById("select"+res.data[i]["user_id"]).onchange = this.onChange;
                        }
                    }).catch(err => console.log(err))
                });
            }
        }).catch(err => console.log(err))

        
    }

    render() {
        return (
            <React.Fragment>
                <div className="centerGestion">
                    <h1>Gestion des classes</h1>
                </div>
                <div>
                    <table className="table table-sm table-dark EmployeeList">
                        <tr>
                            <th scope="col" className="lastname">Nom</th>
                            <th scope="col" className="firstname">Prénom</th>
                            <th scope="col" className="class_id">Classe</th>
                        </tr>
                        <StudentList entries={LIST_ROW}/>
                    </table>
                </div>
            </React.Fragment>
        )
    }

    onChange = (event) => {
        let v_id = event.target.id.split('t',2)[1];
        let v_class_id = event.target.options.selectedIndex;
        Axios.put(`http://localhost:5000/changeClass/${v_id}`, {
            class_id: v_class_id
        })
        .then((res) => {
        })
        .catch(function (err){
            console.log(err)
        })
    }
}

const StudentList = ({ entries }) => (
    
    <tbody>
    {
        entries.map(({id, lastname, firstname, class_id }) => (
            <tr key={id}>
                <td className="lastname">{lastname}</td>
                <td className="firstname">{firstname}</td>
                <td className="class_id">
                    <select name="class" id={"select"+id}></select>
                </td>
            </tr>
        ))
    }   
    </tbody>
    
)

export default GestionClass