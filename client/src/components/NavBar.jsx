import React, { Component } from "react";
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
 
class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav id="navbar">
          <ul>
            <li id="titre"><a href="/">Ecole primaire libre Saint-Donat - Bienvenue</a></li>
            <li><a href="/monCompte">Mon compte</a></li>
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
}
 
export default NavBar;