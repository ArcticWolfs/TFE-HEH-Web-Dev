import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import French from "../images/french.png";
import Math from "../images/math.jpg";
import Sciences from "../images/science.jpg";
import Geo from "../images/geography.png";
import History from "../images/history.jpg";
import CEB from "../images/CEB.jpg";
import Axios from "axios";

export class QuizzChoice extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
        this.onLoadPage();
    }

    render() {
        return (
            <React.Fragment>
                <div className="card-group">
                    <div className="card w-25" >
                        <img className="card-img-top" src={French} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title text-black-50">Quizz : Français</h5>
                                <p className="card-text text-black-50">Un quizz pour testez ses connaissances en Français pour s'entrainer au CEB</p>
                                <a href="Quizz/français" id="french" className="btn btn-primary" hidden>Passer le quizz de Français</a>
                            </div>
                    </div>
                    <div className="card w-25" >
                        <img className="card-img-top" src={Math} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Mathématiques</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances en Mathématiques pour s'entrainer au CEB</p>
                            <a href="Quizz/mathématiques" id="math" className="btn btn-primary" hidden>Passer le quizz de Mathématiques</a>
                        </div>
                    </div>
                    <div className="card w-25" >
                        <img className="card-img-top" src={Sciences} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Science</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances en Science pour s'entrainer au CEB</p>
                            <a href="Quizz/sciences" id="science" className="btn btn-primary" hidden>Passer le quizz de Science</a>
                        </div>
                    </div>
                </div>
                <div className="card-group">
                    <div className="card w-25" >
                        <img className="card-img-top" src={Geo} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Géographie</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances en Géographie pour s'entrainer au CEB</p>
                            <a href="Quizz/géographie" id="geo" className="btn btn-primary" hidden>Passer le quizz de Géographie</a>
                        </div>
                    </div>
                    <div className="card w-25" >
                        <img className="card-img-top" src="" src={History} alt="image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Histoire</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances en Histoire pour s'entrainer au CEB</p>
                            <a href="Quizz/histoire" id="history" className="btn btn-primary" hidden>Passer le quizz d'histoire</a>
                        </div>
                    </div>
                    <div className="card w-25" >
                        <img className="card-img-top" src={CEB} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Général</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances dans toutes les matières du CEB</p>
                            <a href="Quizz/All" id="ceb" className="btn btn-primary" hidden>Passer le quizz Général</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    onLoadPage() {
        Axios.get(`http://localhost:5000/getAllQuestion`, {

        }).then((res) => {
            let science = 0;
            let math = 0;
            let geo = 0;
            let history = 0;
            let french = 0;

            for (let c = 0; c < (res.data).length; c++)
            {
                if (res.data[c].subject === "français")
                {
                    french++;
                }
                if (res.data[c].subject === "mathématiques")
                {
                    math++;
                }
                if (res.data[c].subject === "géographie")
                {
                    geo++;
                }
                if (res.data[c].subject === "histoire")
                {
                    history++;
                }
                if (res.data[c].subject === "sciences")
                {
                    science++;
                }
            }


            if ((res.data).length >= 10)
            {
                document.getElementById("ceb").hidden = false
            }
            if (french >= 10)
            {
                document.getElementById("french").hidden = false
            }
            if (math >= 10)
            {
                document.getElementById("math").hidden = false
            }
            if (geo >= 10)
            {
                document.getElementById("geo").hidden = false
            }
            if (history >= 10)
            {
                document.getElementById("history").hidden = false
            }
            if (science >= 10)
            {
                document.getElementById("science").hidden = false
            }
        });
    }
}
export default QuizzChoice
