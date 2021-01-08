import React, { Component, useState } from 'react'
import "../css/style.css";

import Axios from 'axios'

import DatePicker from "react-datepicker";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

var LIST_ROW = []

export class AttendanceBook extends Component {

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
            }, () => {
                if(this.state.isAdmin===true){
                    Axios.get(`http://localhost:5000/getAllEmployees`).then((res2) => {
                        let nbEmployee=res2.data.length;
                        if(document.getElementById("selectTutor").childElementCount===0){
                            for (let i = 0; i < nbEmployee; i++) {
                                let option = document.createElement('option');
                                option.value = res2.data[i].employee_id;
                                option.innerHTML = res2.data[i].emailaddress;
                                option.setAttribute('name',res2.data[i].emailaddress);
                                if(res2.data[i].employee_id.toString() === this.state.id.toString())option.setAttribute('selected',true);
                                document.getElementById("selectTutor").appendChild(option);
                            }
                            Axios.get(`http://localhost:5000/getClass/${document.getElementById("selectTutor").value}`).then((res3) => {
                                let nbClass=res3.data.length;
                                if(document.getElementById("selectClass").childElementCount===0){
                                    for (let i = 0; i < nbClass; i++) {
                                        let option = document.createElement('option');
                                        option.value = res3.data[i].class_id;
                                        option.innerHTML = res3.data[i].name;
                                        option.setAttribute('name',res3.data[i].name);
                                        if(i===0)option.setAttribute('selected',true);
                                        document.getElementById("selectClass").appendChild(option);
                                    }
                                    Axios.get(`http://localhost:5000/getAllUsers`).then((res4) => {
                                        LIST_ROW=[];
                                        let nbUsers=res4.data.length;
                                        for (let i = 0; i < nbUsers; i++) {
                                            if(res4.data[i]["student"]===true && res4.data[i]["class_id"].toString()===document.getElementById("selectClass").value.toString()){
                                                LIST_ROW.push({id: res4.data[i]["user_id"],lastname: res4.data[i]["lastname"],firstname: res4.data[i]["firstname"]})
                                                this.setState({ entries: true }, () => {
                                                    document.getElementById("absent"+res4.data[i]["user_id"]).onclick = this.onClick;
                                                });
                                                let params = res4.data[i]["user_id"].toString() + "." + document.getElementById("calendar").value.toString()
                                                params = params.replace("/","_")
                                                params = params.replace("/","_")
                                                Axios.get(`http://localhost:5000/getAbsence/${params}`, {
                                                })
                                                .then((res5) => {
                                                    if(res5.data[0].user_id === res4.data[i]["user_id"]){
                                                        document.getElementById("absent"+res4.data[i]["user_id"]).checked = true;
                                                    }
                                                    else {document.getElementById("absent"+res4.data[i]["user_id"]).checked = false;}
                                                })
                                                .catch(function (err){
                                                    console.log(err)
                                                })
                                            }
                                        }
                                    }).catch(err => console.log(err))
                                }
                            }).catch(err => console.log(err))
                        }
                    }).catch(err => console.log(err))
                }
                else{
                    if(document.getElementById("selectTutor").childElementCount===0){
                        let option = document.createElement('option');
                        option.value = res.data.employee_id;
                        option.innerHTML = res.data.emailaddress;
                        option.setAttribute('name',res.data.emailaddress);
                        option.setAttribute('selected',true);
                        document.getElementById("selectTutor").appendChild(option);
                    }
                    Axios.get(`http://localhost:5000/getClass/${document.getElementById("selectTutor").value}`).then((res3) => {
                        let nbClass=res3.data.length;
                        if(document.getElementById("selectClass").childElementCount===0){
                            for (let i = 0; i < nbClass; i++) {
                                let option = document.createElement('option');
                                option.value = res3.data[i].class_id;
                                option.innerHTML = res3.data[i].name;
                                option.setAttribute('name',res3.data[i].name);
                                if(i===0)option.setAttribute('selected',true);
                                document.getElementById("selectClass").appendChild(option);
                            }
                            Axios.get(`http://localhost:5000/getAllUsers`).then((res4) => {
                                LIST_ROW=[];
                                let nbUsers=res4.data.length;
                                for (let i = 0; i < nbUsers; i++) {
                                    if(res4.data[i]["student"]===true && res4.data[i]["class_id"].toString()===document.getElementById("selectClass").value.toString()){
                                        LIST_ROW.push({id: res4.data[i]["user_id"],lastname: res4.data[i]["lastname"],firstname: res4.data[i]["firstname"]})
                                        this.setState({ entries: true }, () => {
                                            document.getElementById("absent"+res4.data[i]["user_id"]).onclick = this.onClick;
                                        });
                                        let params = res4.data[i]["user_id"].toString() + "." + document.getElementById("calendar").value.toString()
                                        params = params.replace("/","_")
                                        params = params.replace("/","_")
                                        Axios.get(`http://localhost:5000/getAbsence/${params}`, {
                                        })
                                        .then((res5) => {
                                            if(res5.data[0].user_id === res4.data[i]["user_id"]){
                                                document.getElementById("absent"+res4.data[i]["user_id"]).checked = true;
                                            }
                                            else {document.getElementById("absent"+res4.data[i]["user_id"]).checked = false;}
                                        })
                                        .catch(function (err){
                                            console.log(err)
                                        })
                                    }
                                }
                            }).catch(err => console.log(err))
                        }
                    }).catch(err => console.log(err))
                }
            })
        }).catch(err =>{
            console.log(err)
        })   
    }

    render() {
        return (
           
            <React.Fragment>
                <div className="centerGestion">
                    <h1>Cahier de présences</h1>
                    <p className="attendanceBookSelector">Date : <Calendar></Calendar><button onClick={this.changeDate}>V</button></p>
                    <p className="attendanceBookSelector">Tuteur : <select className="champConnect" id="selectTutor" onChange={this.onChange}></select></p>
                    <p className="attendanceBookSelector">Classe : <select className="champConnect" id="selectClass" onChange={this.onChange}></select></p>
                </div>

                <div>
                    <table className="table table-sm table-dark EmployeeList">
                        <tr>
                            <th scope="col" className="lastname">Nom</th>
                            <th scope="col" className="firstname">Prénom</th>
                            <th scope="col" className="absent">Absent</th>
                        </tr>
                        <StudentList entries={LIST_ROW}/>
                    </table>
                </div>
                
            </React.Fragment>
        )
    }

    changeDate = () => {
        Axios.get(`http://localhost:5000/getAllUsers`).then((res) => {
            LIST_ROW=[];
            let nbUsers=res.data.length;
            for (let i = 0; i < nbUsers; i++) {
                if(res.data[i]["student"]===true && res.data[i]["class_id"].toString()===document.getElementById("selectClass").value.toString()){
                    LIST_ROW.push({id: res.data[i]["user_id"],lastname: res.data[i]["lastname"],firstname: res.data[i]["firstname"]})
                    this.setState({ entries: true }, () => {
                        document.getElementById("absent"+res.data[i]["user_id"]).onclick = this.onClick;
                    });
                    let params = res.data[i]["user_id"].toString() + "." + document.getElementById("calendar").value.toString()
                    params = params.replace("/","_")
                    params = params.replace("/","_")
                    Axios.get(`http://localhost:5000/getAbsence/${params}`, {
                    })
                    .then((res2) => {
                        if(res2.data[0].user_id === res.data[i]["user_id"]){
                            document.getElementById("absent"+res.data[i]["user_id"]).checked = true;
                        }
                        else {document.getElementById("absent"+res.data[i]["user_id"]).checked = false;}
                    })
                    .catch(function (err){
                        console.log(err)
                    })
                }
            }
        }).catch(err => console.log(err))
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        
        if(event.target.id==="selectClass"){
            Axios.get(`http://localhost:5000/getAllUsers`).then((res) => {
                LIST_ROW=[];
                let nbUsers=res.data.length;
                for (let i = 0; i < nbUsers; i++) {
                    if(res.data[i]["student"]===true && res.data[i]["class_id"].toString()===document.getElementById("selectClass").value.toString()){
                        LIST_ROW.push({id: res.data[i]["user_id"],lastname: res.data[i]["lastname"],firstname: res.data[i]["firstname"]})
                        this.setState({ entries: true }, () => {
                            document.getElementById("absent"+res.data[i]["user_id"]).onclick = this.onClick;
                        });
                        let params = res.data[i]["user_id"].toString() + "." + document.getElementById("calendar").value.toString()
                        params = params.replace("/","_")
                        params = params.replace("/","_")
                        Axios.get(`http://localhost:5000/getAbsence/${params}`, {
                        })
                        .then((res2) => {
                            if(res2.data[0].user_id === res.data[i]["user_id"]){
                                document.getElementById("absent"+res.data[i]["user_id"]).checked = true;
                            }
                            else {document.getElementById("absent"+res.data[i]["user_id"]).checked = false;}
                        })
                        .catch(function (err){
                            console.log(err)
                        })
                    }
                }
            }).catch(err => console.log(err))
        }
        else if (event.target.id==="selectTutor"){
            LIST_ROW=[];
            Axios.get(`http://localhost:5000/getClass/${document.getElementById("selectTutor").value}`).then((res) => {
                let nbClass=res.data.length;
                while(document.getElementById("selectClass").firstChild){
                    document.getElementById("selectClass").removeChild(document.getElementById("selectClass").firstChild);
                }
                if(document.getElementById("selectClass").childElementCount===0){
                    for (let i = 0; i < nbClass; i++) {
                        let option = document.createElement('option');
                        option.value = res.data[i].class_id;
                        option.innerHTML = res.data[i].name;
                        option.setAttribute('name',res.data[i].name);
                        if(i===0)option.setAttribute('selected',true);
                        document.getElementById("selectClass").appendChild(option);
                    }
                    Axios.get(`http://localhost:5000/getAllUsers`).then((res2) => {
                        let nbUsers=res2.data.length;
                        for (let i = 0; i < nbUsers; i++) {
                            if(res2.data[i]["student"]===true && res2.data[i]["class_id"].toString()===document.getElementById("selectClass").value.toString()){
                                LIST_ROW.push({id: res2.data[i]["user_id"],lastname: res2.data[i]["lastname"],firstname: res2.data[i]["firstname"]})
                                this.setState({ entries: true }, () => {
                                    document.getElementById("absent"+res2.data[i]["user_id"]).onclick = this.onClick;
                                })
                                let params = res2.data[i]["user_id"].toString() + "." + document.getElementById("calendar").value.toString()
                                params = params.replace("/","_")
                                params = params.replace("/","_")
                                Axios.get(`http://localhost:5000/getAbsence/${params}`, {
                                })
                                .then((res3) => {
                                    if(res3.data[0].user_id === res2.data[i]["user_id"]){
                                        document.getElementById("absent"+res2.data[i]["user_id"]).checked = true;
                                    }
                                    else {document.getElementById("absent"+res2.data[i]["user_id"]).checked = false;}
                                })
                                .catch(function (err){
                                    console.log(err)
                                })
                            }
                        }
                    }).catch(err => console.log(err))
                }
            }).catch(err => console.log(err))
        }
    }

    onClick = (event) => {
        if(event.target.checked===true){
            Axios.post(`http://localhost:5000/createAbsence`, {
                user_id: event.target.value,
                date: document.getElementById("calendar").value
            })
            .then((res) => {
            })
            .catch(function (err){
                console.log(err)
            })
        }
        else if (event.target.checked===false){
            let params = event.target.value.toString() + "." + document.getElementById("calendar").value.toString()
            params = params.replace("/","_")
            params = params.replace("/","_")
            Axios.delete(`http://localhost:5000/deleteAbsence/${params}`, {
            })
            .then((res) => {
            })
            .catch(function (err){
                console.log(err)
            })
        }
    }
}

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const years = range(2020, getYear(new Date()) +1, 1);
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];
  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      id="calendar"
      onSelect={date => setStartDate(date)}
    />
  );
};

const StudentList = ({ entries }) => (
    
    <tbody>
    {
        entries.map(({id, lastname, firstname}) => (
            <tr key={id}>
                <td className="lastname">{lastname}</td>
                <td className="firstname">{firstname}</td>
                <td className="absent"><input type="checkbox" id={"absent"+id} value={id}></input></td>
            </tr>
        ))
    }   
    </tbody>
    
)

export default AttendanceBook