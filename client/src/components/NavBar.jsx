import React, { Component } from "react";
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from "react-bootstrap";


 
class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav id="navbar">
          <ul>
            <li id="titre"><a href="/">Ecole primaire libre Saint-Donat - Bienvenue</a></li>
            <li>
              <DropdownButton id="dropdown-basic-button" title="Mon compte">
                <Dropdown.Item className="Dropdown-nav" href="/monCompte">Afficher mon compte</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#" onClick={this.onClick}>Se déconnecter</Dropdown.Item>
              </DropdownButton>
            </li>
            <li><a href="/">Quizz</a></li>
            <li><a href="/">Bulletin</a></li>
            <li><a href="/">Vie de classe</a></li>
            <li><a href="/">Administration</a></li>
            <li><a href="/">Accueil</a></li>
          </ul>
        </nav>
        
      </React.Fragment>
    );
  }
  onClick = () => {
    localStorage.clear()
    sessionStorage.clear()
    document.location.reload()
  }
}
 
export default NavBar;