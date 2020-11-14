import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
 
class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark mb-3">

            <h1 className="navbar-brand">Mise en page provisoire</h1>

            <a className="navbar-brand" href="/addUser">
                <div>Créer un utilisateur</div>
            </a>

            <a className="navbar-brand" href="/">
                <div>/</div>
            </a>

            <a className="navbar-brand" href="/">
                <div>/</div>
            </a>

            <a className="navbar-brand" href="/">
                <div>/</div>
            </a>

            <a className="navbar-brand" href="/">
                <div>/</div>
            </a>
        </nav>
      </React.Fragment>
    );
  }
}
 
export default NavBar;