import React, { Component, useState } from 'react'
import "../css/style.css";

import Axios from 'axios'

import DatePicker from "react-datepicker";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";

export class JournalClass extends Component {

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
                                    for(let c=1; c<=8;c++){
                                        document.getElementById("hour"+c).value = "";
                                    }
                                    let params = document.getElementById("selectClass").value.toString() + "." + document.getElementById("calendar").value.toString()
                                    params = params.replace("/","_")
                                    params = params.replace("/","_")
                                    Axios.get(`http://localhost:5000/getJournalClass/${params}`, {
                                    })
                                    .then((res4) => {
                                        let nbline = res4.data.length;
                                        for (let i=0; i<nbline; i++){
                                            for(let c=1; c<=8;c++){
                                                if(res4.data[i].hour===c) document.getElementById("hour"+c).value = res4.data[i].activity;
                                            }
                                        }
                                    })
                                    .catch(function (err){
                                        console.log(err)
                                    })

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
                            for(let c=1; c<=8;c++){
                                document.getElementById("hour"+c).value = "";
                            }
                            let params = document.getElementById("selectClass").value.toString() + "." + document.getElementById("calendar").value.toString()
                            params = params.replace("/","_")
                            params = params.replace("/","_")
                            Axios.get(`http://localhost:5000/getJournalClass/${params}`, {
                            })
                            .then((res4) => {
                                let nbline = res4.data.length;
                                for (let i=0; i<nbline; i++){
                                    for(let c=1; c<=8;c++){
                                        if(res4.data[i].hour===c) document.getElementById("hour"+c).value = res4.data[i].activity;
                                    }
                                }
                            })
                            .catch(function (err){
                                console.log(err)
                            })
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
                    <h1>Journal de classe</h1>
                    <p className="attendanceBookSelector">Date : <Calendar></Calendar><button onClick={this.changeDate}>V</button></p>
                    <p className="attendanceBookSelector">Tuteur : <select className="champConnect" id="selectTutor" onChange={this.onChange}></select></p>
                    <p className="attendanceBookSelector">Classe : <select className="champConnect" id="selectClass" onChange={this.onChange}></select></p>
                </div>

                <div>
                    <table className="table table-sm table-dark journalClass">
                        <tr>
                            <th scope="col" className="hour">Heure</th>
                            <th scope="col" className="activity">Activité</th>
                        </tr>
                        <tr>
                            <th scope="col" className="hourCenter">1</th>
                            <th scope="col" className="activity"><textarea onBlur={this.onBlur} onFocus={this.onFocus}  id="hour1" type="text" className="activityInput"></textarea></th>
                        </tr>
                        <tr>
                            <th scope="col" className="hourCenter">2</th>
                            <th scope="col" className="activity"><textarea onBlur={this.onBlur} onFocus={this.onFocus}  id="hour2" type="text" className="activityInput"></textarea></th>
                        </tr>
                        <tr>
                            <th scope="col" className="hourCenter">3</th>
                            <th scope="col" className="activity"><textarea onBlur={this.onBlur} onFocus={this.onFocus}  id="hour3" type="text" className="activityInput"></textarea></th>
                        </tr>
                        <tr>
                            <th scope="col" className="hourCenter">4</th>
                            <th scope="col" className="activity"><textarea onBlur={this.onBlur} onFocus={this.onFocus}  id="hour4" type="text" className="activityInput"></textarea></th>
                        </tr>
                        <tr>
                            <th scope="col" className="hourCenter">5</th>
                            <th scope="col" className="activity"><textarea onBlur={this.onBlur} onFocus={this.onFocus}  id="hour5" type="text" className="activityInput"></textarea></th>
                        </tr>
                        <tr>
                            <th scope="col" className="hourCenter">6</th>
                            <th scope="col" className="activity"><textarea onBlur={this.onBlur} onFocus={this.onFocus}  id="hour6" type="text" className="activityInput"></textarea></th>
                        </tr>
                        <tr>
                            <th scope="col" className="hourCenter">7</th>
                            <th scope="col" className="activity"><textarea onBlur={this.onBlur} onFocus={this.onFocus}  id="hour7" type="text" className="activityInput"></textarea></th>
                        </tr>
                        <tr>
                            <th scope="col" className="hourCenter">8</th>
                            <th scope="col" className="activity"><textarea onBlur={this.onBlur} onFocus={this.onFocus} id="hour8" type="text" className="activityInput"></textarea></th>
                        </tr>
                    </table>
                </div>
                
            </React.Fragment>
        )
    }

    changeDate = () => {
        for(let c=1; c<=8;c++){
            document.getElementById("hour"+c).value = "";
        }
        let params = document.getElementById("selectClass").value.toString() + "." + document.getElementById("calendar").value.toString()
        params = params.replace("/","_")
        params = params.replace("/","_")
        Axios.get(`http://localhost:5000/getJournalClass/${params}`, {
        })
        .then((res2) => {
            let nbline = res2.data.length;
            for (let i=0; i<nbline; i++){
                for(let c=1; c<=8;c++){
                    if(res2.data[i].hour===c) document.getElementById("hour"+c).value = res2.data[i].activity;
                }
            }
        })
        .catch(function (err){
            console.log(err)
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        
        if(event.target.id==="selectClass"){
            for(let c=1; c<=8;c++){
                document.getElementById("hour"+c).value = "";
            }
            let params = document.getElementById("selectClass").value.toString() + "." + document.getElementById("calendar").value.toString()
            params = params.replace("/","_")
            params = params.replace("/","_")
            Axios.get(`http://localhost:5000/getJournalClass/${params}`, {
            })
            .then((res) => {
                let nbline = res.data.length;
                for (let i=0; i<nbline; i++){
                    for(let c=1; c<=8;c++){
                        if(res.data[i].hour===c) document.getElementById("hour"+c).value = res.data[i].activity;
                    }
                }
            })
            .catch(function (err){
                console.log(err)
            })
        }
        else if (event.target.id==="selectTutor"){
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
                    for(let c=1; c<=8;c++){
                        document.getElementById("hour"+c).value = "";
                    }
                    let params = document.getElementById("selectClass").value.toString() + "." + document.getElementById("calendar").value.toString()
                    params = params.replace("/","_")
                    params = params.replace("/","_")
                    Axios.get(`http://localhost:5000/getJournalClass/${params}`, {
                    })
                    .then((res2) => {
                        let nbline = res2.data.length;
                        for (let i=0; i<nbline; i++){
                            for(let c=1; c<=8;c++){
                                if(res2.data[i].hour===c) document.getElementById("hour"+c).value = res2.data[i].activity;
                            }
                        }
                    })
                    .catch(function (err){
                        console.log(err)
                    })
                }
            }).catch(err => console.log(err))
        }
    }

    onFocus = (event) => {
        if(event.target.value.length===0){
            let hour = event.target.id.split('r',2)[1];
            Axios.post(`http://localhost:5000/createJournalClass`, {
                class_id: document.getElementById("selectClass").value.toString(),
                date: document.getElementById("calendar").value,
                hour: hour,
                activity: event.target.value
            })
            .then((res) => {
            })
            .catch(function (err){
                console.log(err)
            })
        }
    }

    onBlur = (event) => {
        let hour = event.target.id.split('r',2)[1];
        let params =  document.getElementById("selectClass").value.toString() + "." + document.getElementById("calendar").value.toString() + "." + hour
        params = params.replace("/","_")
        params = params.replace("/","_")
        if(event.target.value.length>0){
            Axios.put(`http://localhost:5000/modifyJournalClass/${params}`, {
                activity: event.target.value
            })
            .then((res) => {
            })
            .catch(function (err){
                console.log(err)
            })
        }
        else {
            Axios.delete(`http://localhost:5000/deleteJournalClass/${params}`, {
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

export default JournalClass