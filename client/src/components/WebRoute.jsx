import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './HomePage'
import { AccountPage } from './AccountPage'
import {InterroList} from "./InterroList";
import { Connexion } from './Connexion';
import { Inscription } from './Inscription'
import {GradeList} from "./GradeList";
import {BulletinList} from "./BulletinList";
import {Bulletin} from "./Bulletin";
import {Administration} from "./Administration";
import {GestionEmployee} from "./GestionEmployee";
import {GestionUser} from "./GestionUser";
import {GestionClass} from "./GestionClass";
import {QuizzList} from "./QuizzList";
import {Quizz} from "./Quizz";
import {AttendanceBook} from './AttendanceBook';
import {JournalClass} from './JournalClass';
import {QuizzChoice} from './QuizzChoice';
import {PutInOrder} from './PutInOrder';

 
export class WebRoute extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            connect: true,
            inscript: false,
            id:sessionStorage.getItem('userID') || localStorage.getItem('userID') || 0,
            employee: sessionStorage.getItem('employee') || localStorage.getItem('employee') || 0
        }
    }

    render() {
        if (this.state.connect===true && this.state.id<1){
            return (
                <React.Fragment>
                    <Connexion connect={this.setConnectState} toInscript={this.setToInscriptState}/>
                </React.Fragment>
            )
        }
        else if (this.state.inscript===true && this.state.id<1){
            return (
                <React.Fragment>
                    <Inscription toConnect={this.setToConnectState}/>
                </React.Fragment>
            )
        }
        if (this.state.employee==="true"){
            return (
                <React.Fragment>
                    <Router>
                        <Switch>
                            <Route path='/putInOrder' render={() => (<PutInOrder userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/journalClass' render={() => (<JournalClass userId={this.state.id}/>)}></Route>
                            <Route path='/attendanceBook' render={() => (<AttendanceBook userId={this.state.id}/>)}></Route>
                            <Route path='/gestionClass' render={() => (<GestionClass/>)}></Route>
                            <Route path='/gestionUser' render={() => (<GestionUser/>)}></Route>
                            <Route path='/gestionEmployee' render={() => (<GestionEmployee/>)}></Route>
                            <Route path='/administration' render={() => (<Administration userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/monCompte' render={() => (<AccountPage userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/interroList' render={() => (<InterroList userId={this.state.id}/>)}></Route>
                            <Route path='/gradeList' render={() => (<GradeList userId={this.state.id}/>)}></Route>
                            <Route path='/bulletinList' render={() => (<BulletinList userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/quizzList' render={() => (<QuizzList userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/quizzChoice' render={() => (<QuizzChoice userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/quizz' render={() => (<Quizz userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/bulletin' render={() => (<Bulletin userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/' render={() => (<HomePage/>)}></Route>
                        </Switch>
                    </Router>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Router>
                        <Switch>
                            <Route path='/quizzChoice' render={() => (<QuizzChoice userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/putInOrder' render={() => (<PutInOrder userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/monCompte' render={() => (<AccountPage userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/bulletinList' render={() => (<BulletinList userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/bulletin' render={() => (<Bulletin userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/quizz' render={() => (<Quizz userId={this.state.id} employee={this.state.employee}/>)}></Route>
                            <Route path='/' render={() => (<HomePage/>)}></Route>
                        </Switch>
                    </Router>
                </React.Fragment>
            )
        }
    }

    setConnectState = () => {
        this.setState({
            connect:false,
            inscript:false
        })
    }

    setToInscriptState = () => {
        this.setState({
            connect:false,
            inscript:true
        })
    }

    setToConnectState = () => {
        this.setState({
            connect:true,
            inscript:false
        })
    }
}

export default WebRoute
