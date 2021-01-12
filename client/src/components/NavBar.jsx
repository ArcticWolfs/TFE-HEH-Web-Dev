import React, { Component } from "react";
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from "react-bootstrap";


 
class NavBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
        employee: sessionStorage.getItem('employee') || localStorage.getItem('employee')
    }
}

  render() {
    if (this.state.employee==="true") {
      return (
        <React.Fragment>
          <nav id="navbar">
            <ul>
              <li id="titre"><a href="/">École primaire libre Saint-Donat</a></li>
              <li>
                <DropdownButton id="dropdown-basic-button" title="Mon compte">
                  <Dropdown.Item className="Dropdown-nav" href="/monCompte">Afficher mon compte</Dropdown.Item>
                  <Dropdown.Item className="Dropdown-nav" href="/#" onClick={this.onClick}>Se déconnecter</Dropdown.Item>
                </DropdownButton>
              </li>
              <li>
                <DropdownButton id="dropdown-basic-button" title="Quizz">
                  <Dropdown.Item className="Dropdown-nav" href="/quizzList">Gestion des questionnaires</Dropdown.Item>
                  <Dropdown.Item className="Dropdown-nav" href="/quizz">Testez vos quizz</Dropdown.Item>
                </DropdownButton>
              </li>
              <li>
              <DropdownButton id="dropdown-basic-button" title="Évaluation">
                  <Dropdown.Item className="Dropdown-nav" href="/interroList">Interrogations</Dropdown.Item>
                  <Dropdown.Item className="Dropdown-nav" href="/bulletinList">Bulletins</Dropdown.Item>
                </DropdownButton>
              </li>
              <li>
                <DropdownButton id="dropdown-basic-button" title="Vie de classe">
                  <Dropdown.Item className="Dropdown-nav" href="/journalClass">Journal de classe</Dropdown.Item>
                  <Dropdown.Item className="Dropdown-nav" href="/attendanceBook">Présences</Dropdown.Item>
                  <Dropdown.Item className="Dropdown-nav" href="/#">Galerie</Dropdown.Item>
                  <Dropdown.Item className="Dropdown-nav" href="/#">Remise en ordre</Dropdown.Item>
                </DropdownButton>
              </li>
              <li>
                <a href="/administration">Administration</a>
              </li>
              <li><a href="/">Accueil</a></li>
            </ul>
          </nav>
          
        </React.Fragment>
      );
    }
    else { 
      return (
        <React.Fragment>
          <nav id="navbar">
            <ul>
              <li id="titre"><a href="/">École primaire libre Saint-Donat</a></li>
              <li>
                <DropdownButton id="dropdown-basic-button" title="Mon compte">
                  <Dropdown.Item className="Dropdown-nav" href="/monCompte">Afficher mon compte</Dropdown.Item>
                  <Dropdown.Item className="Dropdown-nav" href="/#" onClick={this.onClick}>Se déconnecter</Dropdown.Item>
                </DropdownButton>
              </li>
              <li>
              <li><a href="/quizz">Quizz</a></li>
              </li>
              <li><a href="/bulletinList">Bulletin</a></li>
              <li>
                <DropdownButton id="dropdown-basic-button" title="Vie de classe">
                  <Dropdown.Item className="Dropdown-nav" href="/#">Galerie</Dropdown.Item>
                  <Dropdown.Item className="Dropdown-nav" href="/#">Remise en ordre</Dropdown.Item>
                </DropdownButton>
              </li>
              <li><a href="/">Accueil</a></li>
            </ul>
          </nav>
          
        </React.Fragment>
      );
    }
  }
  onClick = () => {
    localStorage.clear()
    sessionStorage.clear()
    document.location.reload()
  }
}
 
export default NavBar;
