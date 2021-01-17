import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import French from "../images/french.png";
import Math from "../images/math.jpg";
import Sciences from "../images/science.jpg";
import Geo from "../images/geography.png";
import History from "../images/history.jpg";
import CEB from "../images/CEB.jpg";

export class QuizzChoice extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
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
                                <a href="Quizz/français" className="btn btn-primary">Passer le quizz de Français</a>
                            </div>
                    </div>
                    <div className="card w-25" >
                        <img className="card-img-top" src={Math} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Mathématiques</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances en Mathématiques pour s'entrainer au CEB</p>
                            <a href="Quizz/mathématiques" className="btn btn-primary">Passer le quizz de Mathématiques</a>
                        </div>
                    </div>
                    <div className="card w-25" >
                        <img className="card-img-top" src={Sciences} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Science</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances en Science pour s'entrainer au CEB</p>
                            <a href="Quizz/sciences" className="btn btn-primary">Passer le quizz de Science</a>
                        </div>
                    </div>
                </div>
                <div className="card-group">
                    <div className="card w-25" >
                        <img className="card-img-top" src={Geo} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Géographie</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances en Géographie pour s'entrainer au CEB</p>
                            <a href="Quizz/géographie" className="btn btn-primary">Passer le quizz de Géographie</a>
                        </div>
                    </div>
                    <div className="card w-25" >
                        <img className="card-img-top" src="" src={History} alt="image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Histoire</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances en Histoire pour s'entrainer au CEB</p>
                            <a href="Quizz/histoire" className="btn btn-primary">Passer le quizz d'histoire</a>
                        </div>
                    </div>
                    <div className="card w-25" >
                        <img className="card-img-top" src={CEB} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-black-50">Quizz : Général</h5>
                            <p className="card-text text-black-50">Un quizz pour testez ses connaissances dans toutes les matières du CEB</p>
                            <a href="Quizz/All" className="btn btn-primary">Passer le quizz Général</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default QuizzChoice
