import React, { Component } from 'react'
import "../css/style.css";

export class HomePage extends Component {

    render() {
        return (
            <React.Fragment>
                <div id="bodyHomePage">
                    <div id="borderHome">
                        <h1>Bienvenue sur le site de l'école de Saint-Donat</h1>
                        <div id="col1">
                            <p className="title">Adresse : </p>
                            <p>Ecole Saint-Donat <br/>Rue Cardinal Mercier 17<br/>7110 - Houdeng-Goegnies</p>
                            <p className="title">Mail : </p>
                            <p>ec001394@adm.cfwb.be</p>
                            <p className="title">Téléphone : </p>
                            <p>064 21 42 42</p>
                            <p className="title">Directeur : </p>
                            <p>Philippe MAIRESSE</p>
                        </div>
                        <div id="col2">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.680283262498!2d4.152417615617161!3d50.4842954794801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2362a77951c23%3A0xc4b67a21366f8284!2sEcole%20St%20Donat!5e0!3m2!1sfr!2sbe!4v1607584575877!5m2!1sfr!2sbe" width="550em" height="375em" frameborder="0" style={{"border":"0"}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default HomePage