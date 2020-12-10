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
            <li id="titre"><a href="/">Ecole primaire libre Saint-Donat</a></li>
            <li>
              <DropdownButton id="dropdown-basic-button" title="Mon compte">
                <Dropdown.Item className="Dropdown-nav" href="/monCompte">Afficher mon compte</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#" onClick={this.onClick}>Se déconnecter</Dropdown.Item>
              </DropdownButton>
            </li>
            <li>
              <DropdownButton id="dropdown-basic-button" title="Quizz">
                <Dropdown.Item className="Dropdown-nav" href="/#">Gestion des questionnaires</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#">Testez vos quizz</Dropdown.Item>
              </DropdownButton>
            </li>
            <li>
            <DropdownButton id="dropdown-basic-button" title="Evaluation">
                <Dropdown.Item className="Dropdown-nav" href="/#">Cahier de notes</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#">Bulletin</Dropdown.Item>
              </DropdownButton>
            </li>
            <li>
              <DropdownButton id="dropdown-basic-button" title="Vie de classe">
                <Dropdown.Item className="Dropdown-nav" href="/#">Journal de classe</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#">Présence</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#">Gallerie</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#">Remise en ordre</Dropdown.Item>
              </DropdownButton>
            </li>
            <li>
              <DropdownButton id="dropdown-basic-button" title="Administration">
                <Dropdown.Item className="Dropdown-nav" href="/#">Gestion du personnel</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#">Gestion des utilisateurs</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#">Gestion de classe</Dropdown.Item>
              </DropdownButton>
            </li>
            <li><a href="/">Accueil</a></li>
          </ul>
        </nav>
        
      </React.Fragment>
    );
    /*return (
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
            <li><a href="/">Quizz</a></li>
            </li>
            <li><a href="/">Bulletin</a></li>
            <li>
              <DropdownButton id="dropdown-basic-button" title="Vie de classe">
                <Dropdown.Item className="Dropdown-nav" href="/#">Gallerie</Dropdown.Item>
                <Dropdown.Item className="Dropdown-nav" href="/#">Remise en ordre</Dropdown.Item>
              </DropdownButton>
            </li>
            <li><a href="/">Accueil</a></li>
          </ul>
        </nav>
        
      </React.Fragment>
    );*/
  }
  onClick = () => {
    localStorage.clear()
    sessionStorage.clear()
    document.location.reload()
  }
}
 
export default NavBar;