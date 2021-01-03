import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";

export class Bulletin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.userId,
            is_employee: this.props.employee,
            firstname : "",
            lastname : "",
            francais_id : 1,
            math_id : 2,
            eveil_id : 3,
            grammaire_id : 1,
            conjugaison_id : 2,
            lecture_id : 3,
            orthographe_id : 4,
            vocabulaire_id : 5,
            calculs_id : 11,
            probleme_id : 12,
            geometrie_id : 13,
            grandeurs_id : 14,
            numerisation_id : 15,
            histoire_id : 21,
            sciences_id : 22,
            geographie_id : 23
          }
          if (this.state.is_employee === "true")
          {
              this.onLoadPageEmployee();
          }
          else
          {
              this.onLoadPage();
          }

    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Bulletin de {this.state.firstname} {this.state.lastname}</h1>
                    <h2>Premier Trimestre</h2>
                </div>
                <div>
                    <h2>Français : <span id="français">0</span> / 100</h2>
                    <h3>- Grammaire : <span id="grammaire">0</span> / 100</h3>
                    <h3>- Conjugaison : <span id="conjugaison">0</span> / 100</h3>
                    <h3>- Lecture : <span id="lecture">0</span> / 100</h3>
                    <h3>- Orthographe : <span id="orthographe">0</span> / 100</h3>
                    <h3>- Vocabulaire : <span id="vocabulaire">0</span> / 100</h3>
                    <h2>Mathématiques : <span id="math">0</span> / 100</h2>
                    <h3>- Calculs : <span id="calculs">0</span> / 100</h3>
                    <h3>- Problème : <span id="probleme">0</span> / 100</h3>
                    <h3>- Géométrie : <span id="geometrie">0</span> / 100</h3>
                    <h3>- Grandeurs : <span id="grandeurs">0</span> / 100</h3>
                    <h3>- Numérisation : <span id="numerisation">0</span> / 100</h3>
                    <h2>Éveil : <span id="eveil">0</span> / 100</h2>
                    <h3>- Histoire : <span id="histoire">0</span> / 100</h3>
                    <h3>- Sciences : <span id="sciences">0</span> / 100</h3>
                    <h3>- Géographie : <span id="geographie">0</span> / 100</h3>
                </div>
                <div>
                    <h2>Deuxième Trimestre</h2>
                </div>
                <div>
                    <h2>Français : <span id="français_2">0</span> / 100</h2>
                    <h3>- Grammaire : <span id="grammaire_2">0</span> / 100</h3>
                    <h3>- Conjugaison : <span id="conjugaison_2">0</span> / 100</h3>
                    <h3>- Lecture : <span id="lecture_2">0</span> / 100</h3>
                    <h3>- Orthographe : <span id="orthographe_2">0</span> / 100</h3>
                    <h3>- Vocabulaire : <span id="vocabulaire_2">0</span> / 100</h3>
                    <h2>Mathématiques : <span id="math_2">0</span> / 100</h2>
                    <h3>- Calculs : <span id="calculs_2">0</span> / 100</h3>
                    <h3>- Problème : <span id="probleme_2">0</span> / 100</h3>
                    <h3>- Géométrie : <span id="geometrie_2">0</span> / 100</h3>
                    <h3>- Grandeurs : <span id="grandeurs_2">0</span> / 100</h3>
                    <h3>- Numérisation : <span id="numerisation_2">0</span> / 100</h3>
                    <h2>Éveil : <span id="eveil_2">0</span> / 100</h2>
                    <h3>- Histoire : <span id="histoire_2">0</span> / 100</h3>
                    <h3>- Sciences : <span id="sciences_2">0</span> / 100</h3>
                    <h3>- Géographie : <span id="geographie_2">0</span> / 100</h3>
                </div>
                <div>
                    <h2>Troisième Trimestre</h2>
                </div>
                <div>
                    <h2>Français : <span id="français_3">0</span> / 100</h2>
                    <h3>- Grammaire : <span id="grammaire_3">0</span> / 100</h3>
                    <h3>- Conjugaison : <span id="conjugaison_3">0</span> / 100</h3>
                    <h3>- Lecture : <span id="lecture_3">0</span> / 100</h3>
                    <h3>- Orthographe : <span id="orthographe_3">0</span> / 100</h3>
                    <h3>- Vocabulaire : <span id="vocabulaire_3">0</span> / 100</h3>
                    <h2>Mathématiques : <span id="math_3">0</span> / 100</h2>
                    <h3>- Calculs : <span id="calculs_3">0</span> / 100</h3>
                    <h3>- Problème : <span id="probleme_3">0</span> / 100</h3>
                    <h3>- Géométrie : <span id="geometrie_3">0</span> / 100</h3>
                    <h3>- Grandeurs : <span id="grandeurs_3">0</span> / 100</h3>
                    <h3>- Numérisation : <span id="numerisation_3">0</span> / 100</h3>
                    <h2>Éveil : <span id="eveil_3">0</span> / 100</h2>
                    <h3>- Histoire : <span id="histoire_3">0</span> / 100</h3>
                    <h3>- Sciences : <span id="sciences_3">0</span> / 100</h3>
                    <h3>- Géographie : <span id="geographie_3">0</span> / 100</h3>
                </div>
            </React.Fragment>
        )
    }

    onLoadPage = () => {
        Axios.get(`http://localhost:5000/getUser/${this.state.user_id}`, {

        }).then((res6) => {
            this.setState({lastname: res6.data.lastname})
            this.setState({firstname: res6.data.firstname},() =>
            {
                console.log(res6)
            })
        })
        Axios.get(`http://localhost:5000/getGradeByUserID/${this.state.user_id}`, {

        }).then((res) => {
            //Subject
            let grade_français = 0;
            let grade_math = 0;
            let grade_eveil = 0;

            let grade_français_2 = 0;
            let grade_math_2 = 0;
            let grade_eveil_2 = 0;

            let grade_français_3 = 0;
            let grade_math_3 = 0;
            let grade_eveil_3 = 0;

            //SubSubject
            //Français
            let grade_grammaire = 0;
            let total_grammaire = 0;
            let grade_grammaire_100 = 0;
            let grade_conjugaison = 0;
            let total_conjugaison = 0;
            let grade_conjugaison_100 = 0;
            let grade_lecture = 0;
            let total_lecture = 0;
            let grade_lecture_100 = 0;
            let grade_orthographe = 0;
            let total_orthographe = 0;
            let grade_orthographe_100 = 0;
            let grade_vocabulaire = 0;
            let total_vocabulaire = 0;
            let grade_vocabulaire_100 = 0;

            let grade_grammaire_2 = 0;
            let total_grammaire_2 = 0;
            let grade_grammaire_100_2 = 0;
            let grade_conjugaison_2 = 0;
            let total_conjugaison_2 = 0;
            let grade_conjugaison_100_2 = 0;
            let grade_lecture_2 = 0;
            let total_lecture_2 = 0;
            let grade_lecture_100_2 = 0;
            let grade_orthographe_2 = 0;
            let total_orthographe_2 = 0;
            let grade_orthographe_100_2 = 0;
            let grade_vocabulaire_2 = 0;
            let total_vocabulaire_2 = 0;
            let grade_vocabulaire_100_2 = 0;

            let grade_grammaire_3 = 0;
            let total_grammaire_3 = 0;
            let grade_grammaire_100_3 = 0;
            let grade_conjugaison_3 = 0;
            let total_conjugaison_3 = 0;
            let grade_conjugaison_100_3 = 0;
            let grade_lecture_3 = 0;
            let total_lecture_3 = 0;
            let grade_lecture_100_3 = 0;
            let grade_orthographe_3 = 0;
            let total_orthographe_3 = 0;
            let grade_orthographe_100_3 = 0;
            let grade_vocabulaire_3 = 0;
            let total_vocabulaire_3 = 0;
            let grade_vocabulaire_100_3 = 0;
            //Math
            let grade_calcul = 0;
            let total_calcul = 0;
            let grade_calcul_100 = 0;
            let grade_probleme = 0;
            let total_probleme = 0;
            let grade_probleme_100 = 0;
            let grade_geometrie = 0;
            let total_geometrie = 0;
            let grade_geometrie_100 = 0;
            let grade_grandeur = 0;
            let total_grandeur = 0;
            let grade_grandeur_100 = 0;
            let grade_numerisation = 0;
            let total_numerisation = 0;
            let grade_numerisation_100 = 0;

            let grade_calcul_2 = 0;
            let total_calcul_2 = 0;
            let grade_calcul_100_2 = 0;
            let grade_probleme_2 = 0;
            let total_probleme_2 = 0;
            let grade_probleme_100_2 = 0;
            let grade_geometrie_2 = 0;
            let total_geometrie_2 = 0;
            let grade_geometrie_100_2 = 0;
            let grade_grandeur_2 = 0;
            let total_grandeur_2 = 0;
            let grade_grandeur_100_2 = 0;
            let grade_numerisation_2 = 0;
            let total_numerisation_2 = 0;
            let grade_numerisation_100_2 = 0;

            let grade_calcul_3 = 0;
            let total_calcul_3 = 0;
            let grade_calcul_100_3 = 0;
            let grade_probleme_3 = 0;
            let total_probleme_3 = 0;
            let grade_probleme_100_3 = 0;
            let grade_geometrie_3 = 0;
            let total_geometrie_3 = 0;
            let grade_geometrie_100_3 = 0;
            let grade_grandeur_3 = 0;
            let total_grandeur_3 = 0;
            let grade_grandeur_100_3 = 0;
            let grade_numerisation_3 = 0;
            let total_numerisation_3 = 0;
            let grade_numerisation_100_3 = 0;
            //Eveil
            let grade_histoire = 0;
            let total_histoire = 0;
            let grade_histoire_100 =0;
            let grade_science = 0;
            let total_science = 0;
            let grade_science_100 =0;
            let grade_geographie = 0;
            let total_geographie = 0;
            let grade_geographie_100 = 0;

            let grade_histoire_2 = 0;
            let total_histoire_2 = 0;
            let grade_histoire_100_2 =0;
            let grade_science_2 = 0;
            let total_science_2 = 0;
            let grade_science_100_2 =0;
            let grade_geographie_2 = 0;
            let total_geographie_2 = 0;
            let grade_geographie_100_2 = 0;

            let grade_histoire_3 = 0;
            let total_histoire_3 = 0;
            let grade_histoire_100_3 =0;
            let grade_science_3 = 0;
            let total_science_3 = 0;
            let grade_science_100_3 =0;
            let grade_geographie_3 = 0;
            let total_geographie_3 = 0;
            let grade_geographie_100_3 = 0;

            for(let c = 0; c < (res.data).length; c++)
            {
                Axios.get(`http://localhost:5000/getInterroByID/${res.data[c].interro_id}`, {
                }).then((res2) => {
                    if (res2.data[0].trimester === 1)
                    {
                        switch (res2.data[0].subject_id) {
                            case this.state.francais_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.grammaire_id: {
                                        grade_grammaire = grade_grammaire + res.data[c].grade;
                                        total_grammaire = total_grammaire + res.data[c].total;
                                        grade_grammaire_100 = (grade_grammaire / total_grammaire) * 100;
                                        document.getElementById("grammaire").innerHTML = this.roundNumber(grade_grammaire_100);
                                        break;
                                    }
                                    case this.state.conjugaison_id: {
                                        grade_conjugaison = grade_conjugaison + res.data[c].grade;
                                        total_conjugaison = total_conjugaison + res.data[c].total;
                                        grade_conjugaison_100 = (grade_conjugaison / total_conjugaison) * 100;
                                        document.getElementById("conjugaison").innerHTML = this.roundNumber(grade_conjugaison_100);
                                        break;
                                    }
                                    case this.state.lecture_id: {
                                        grade_lecture = grade_lecture + res.data[c].grade;
                                        total_lecture = total_lecture + res.data[c].total;
                                        grade_lecture_100 = (grade_lecture / total_lecture) * 100;
                                        document.getElementById("lecture").innerHTML = this.roundNumber(grade_lecture_100);
                                        break;
                                    }
                                    case this.state.orthographe_id: {
                                        grade_orthographe = grade_orthographe + res.data[c].grade;
                                        total_orthographe = total_orthographe + res.data[c].total;
                                        grade_orthographe_100 = (grade_orthographe / total_orthographe) * 100;
                                        document.getElementById("orthographe").innerHTML = this.roundNumber(grade_orthographe_100);
                                        break;
                                    }
                                    case this.state.vocabulaire_id: {
                                        grade_vocabulaire = grade_vocabulaire + res.data[c].grade;
                                        total_vocabulaire = total_vocabulaire + res.data[c].total;
                                        grade_vocabulaire_100 = (grade_vocabulaire / total_vocabulaire) * 100;
                                        document.getElementById("vocabulaire").innerHTML = this.roundNumber(grade_vocabulaire_100);
                                        break;
                                    }
                                }
                                grade_français = (grade_grammaire_100 * (0.2)) + (grade_conjugaison_100 * (0.2)) + (grade_lecture_100 * (0.2)) + (grade_orthographe_100 * (0.2)) + (grade_vocabulaire_100 * (0.2));
                                document.getElementById("français").innerHTML = this.roundNumber(grade_français);
                                break;
                            }
                            case this.state.math_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.calculs_id: {
                                        grade_calcul = grade_calcul + res.data[c].grade;
                                        total_calcul = total_calcul + res.data[c].total;
                                        grade_calcul_100 = (grade_calcul / total_calcul) * 100;
                                        document.getElementById("calculs").innerHTML = this.roundNumber(grade_calcul_100);
                                        break;
                                    }
                                    case this.state.probleme_id: {
                                        grade_probleme = grade_probleme + res.data[c].grade;
                                        total_probleme = total_probleme + res.data[c].total;
                                        grade_probleme_100 = (grade_probleme / total_probleme) * 100;
                                        document.getElementById("probleme").innerHTML = this.roundNumber(grade_probleme_100);
                                        break;
                                    }
                                    case this.state.geometrie_id: {
                                        grade_geometrie = grade_geometrie + res.data[c].grade;
                                        total_geometrie = total_geometrie + res.data[c].total;
                                        grade_geometrie_100 = (grade_geometrie / total_geometrie) * 100;
                                        document.getElementById("geometrie").innerHTML = this.roundNumber(grade_geometrie_100);
                                        break;
                                    }
                                    case this.state.grandeurs_id: {
                                        grade_grandeur = grade_grandeur + res.data[c].grade;
                                        total_grandeur = total_grandeur + res.data[c].total;
                                        grade_grandeur_100 = (grade_grammaire / total_grammaire) * 100;
                                        document.getElementById("grandeurs").innerHTML = this.roundNumber(grade_grandeur_100);
                                        break;
                                    }
                                    case this.state.numerisation_id: {
                                        grade_numerisation = grade_numerisation + res.data[c].grade;
                                        total_numerisation = total_numerisation + res.data[c].total;
                                        grade_numerisation_100 = (grade_numerisation / total_numerisation) * 100;
                                        document.getElementById("numerisation").innerHTML = this.roundNumber(grade_numerisation_100);
                                        break;
                                    }
                                }
                                grade_math = (grade_calcul_100 * (0.2)) + (grade_probleme_100 * (0.2)) + (grade_geometrie_100 * (0.2)) + (grade_grandeur_100 * (0.2)) + (grade_numerisation_100 * (0.2));
                                document.getElementById("math").innerHTML = this.roundNumber(grade_math);
                                break;
                            }
                            case this.state.eveil_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.histoire_id: {
                                        grade_histoire = grade_histoire + res.data[c].grade;
                                        total_histoire = total_histoire + res.data[c].total;
                                        grade_histoire_100 = (grade_histoire / total_histoire) * 100;
                                        document.getElementById("histoire").innerHTML = grade_histoire_100;
                                        break;
                                    }
                                    case this.state.sciences_id: {
                                        grade_science = grade_science + res.data[c].grade;
                                        total_science = total_science + res.data[c].total;
                                        grade_science_100 = (grade_science / total_science) * 100;
                                        document.getElementById("sciences").innerHTML = grade_science_100;
                                        break;
                                    }
                                    case this.state.geographie_id: {
                                        grade_geographie = grade_geographie + res.data[c].grade;
                                        total_geographie = total_geographie + res.data[c].total;
                                        grade_geographie_100 = (grade_geographie / total_geographie) * 100;
                                        document.getElementById("geographie").innerHTML = grade_geographie_100;
                                        break;
                                    }
                                }
                                grade_eveil = (grade_histoire_100 * (1 / 3)) + (grade_science_100 * (1 / 3)) + (grade_geographie_100 * (1 / 3));
                                document.getElementById("eveil").innerHTML = this.roundNumber(grade_eveil);
                                break;
                            }
                            default:
                                console.log("error")
                        }
                    }
                    if (res2.data[0].trimester === 2)
                    {
                        switch (res2.data[0].subject_id) {
                            case this.state.francais_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.grammaire_id: {
                                        grade_grammaire_2 = grade_grammaire_2 + res.data[c].grade;
                                        total_grammaire_2 = total_grammaire_2 + res.data[c].total;
                                        grade_grammaire_100_2 = (grade_grammaire_2 / total_grammaire_2) * 100;
                                        document.getElementById("grammaire_2").innerHTML = this.roundNumber(grade_grammaire_100_2);
                                        break;
                                    }
                                    case this.state.conjugaison_id: {
                                        grade_conjugaison_2 = grade_conjugaison_2 + res.data[c].grade;
                                        total_conjugaison_2 = total_conjugaison_2 + res.data[c].total;
                                        grade_conjugaison_100_2 = (grade_conjugaison_2 / total_conjugaison_2) * 100;
                                        document.getElementById("conjugaison_2").innerHTML = this.roundNumber(grade_conjugaison_100_2);
                                        break;
                                    }
                                    case this.state.lecture_id: {
                                        grade_lecture_2 = grade_lecture_2 + res.data[c].grade;
                                        total_lecture_2 = total_lecture_2 + res.data[c].total;
                                        grade_lecture_100_2 = (grade_lecture_2 / total_lecture_2) * 100;
                                        document.getElementById("lecture_2").innerHTML = this.roundNumber(grade_lecture_100_2);
                                        break;
                                    }
                                    case this.state.orthographe_id: {
                                        grade_orthographe_2 = grade_orthographe_2 + res.data[c].grade;
                                        total_orthographe_2 = total_orthographe_2 + res.data[c].total;
                                        grade_orthographe_100_2 = (grade_orthographe_2 / total_orthographe_2) * 100;
                                        document.getElementById("orthographe_2").innerHTML = this.roundNumber(grade_orthographe_100_2);
                                        break;
                                    }
                                    case this.state.vocabulaire_id: {
                                        grade_vocabulaire_2 = grade_vocabulaire_2 + res.data[c].grade;
                                        total_vocabulaire_2 = total_vocabulaire_2 + res.data[c].total;
                                        grade_vocabulaire_100_2 = (grade_vocabulaire_2 / total_vocabulaire_2) * 100;
                                        document.getElementById("vocabulaire_2").innerHTML = this.roundNumber(grade_vocabulaire_100_2);
                                        break;
                                    }
                                }
                                grade_français_2 = (grade_grammaire_100_2 * (0.2)) + (grade_conjugaison_100_2 * (0.2)) + (grade_lecture_100_2 * (0.2)) + (grade_orthographe_100_2 * (0.2)) + (grade_vocabulaire_100_2 * (0.2));
                                document.getElementById("français_2").innerHTML = this.roundNumber(grade_français_2);
                                break;
                            }
                            case this.state.math_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.calculs_id: {
                                        grade_calcul_2 = grade_calcul_2 + res.data[c].grade;
                                        total_calcul_2 = total_calcul_2 + res.data[c].total;
                                        grade_calcul_100_2 = (grade_calcul_2 / total_calcul_2) * 100;
                                        document.getElementById("calculs_2").innerHTML = this.roundNumber(grade_calcul_100_2);
                                        break;
                                    }
                                    case this.state.probleme_id: {
                                        grade_probleme_2 = grade_probleme_2 + res.data[c].grade;
                                        total_probleme_2 = total_probleme_2 + res.data[c].total;
                                        grade_probleme_100_2 = (grade_probleme_2 / total_probleme_2) * 100;
                                        document.getElementById("probleme_2").innerHTML = this.roundNumber(grade_probleme_100_2);
                                        break;
                                    }
                                    case this.state.geometrie_id: {
                                        grade_geometrie_2 = grade_geometrie_2 + res.data[c].grade;
                                        total_geometrie_2 = total_geometrie_2 + res.data[c].total;
                                        grade_geometrie_100_2 = (grade_geometrie_2 / total_geometrie_2) * 100;
                                        document.getElementById("geometrie_2").innerHTML = this.roundNumber(grade_geometrie_100_2);
                                        break;
                                    }
                                    case this.state.grandeurs_id: {
                                        grade_grandeur_2 = grade_grandeur_2 + res.data[c].grade;
                                        total_grandeur_2 = total_grandeur_2 + res.data[c].total;
                                        grade_grandeur_100_2 = (grade_grammaire_2 / total_grammaire_2) * 100;
                                        document.getElementById("grandeurs_2").innerHTML = this.roundNumber(grade_grandeur_100_2);
                                        break;
                                    }
                                    case this.state.numerisation_id: {
                                        grade_numerisation_2 = grade_numerisation_2 + res.data[c].grade;
                                        total_numerisation_2 = total_numerisation_2 + res.data[c].total;
                                        grade_numerisation_100_2 = (grade_numerisation_2 / total_numerisation_2) * 100;
                                        document.getElementById("numerisation_2").innerHTML = this.roundNumber(grade_numerisation_100_2);
                                        break;
                                    }
                                }
                                grade_math_2 = (grade_calcul_100_2 * (0.2)) + (grade_probleme_100_2 * (0.2)) + (grade_geometrie_100_2 * (0.2)) + (grade_grandeur_100_2 * (0.2)) + (grade_numerisation_100_2 * (0.2));
                                document.getElementById("math_2").innerHTML = this.roundNumber(grade_math_2);
                                break;
                            }
                            case this.state.eveil_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.histoire_id: {
                                        grade_histoire_2 = grade_histoire_2 + res.data[c].grade;
                                        total_histoire_2 = total_histoire_2 + res.data[c].total;
                                        grade_histoire_100_2 = (grade_histoire_2 / total_histoire_2) * 100;
                                        document.getElementById("histoire_2").innerHTML = grade_histoire_100_2;
                                        break;
                                    }
                                    case this.state.sciences_id: {
                                        grade_science_2 = grade_science_2 + res.data[c].grade;
                                        total_science_2 = total_science_2 + res.data[c].total;
                                        grade_science_100_2 = (grade_science_2 / total_science_2) * 100;
                                        document.getElementById("sciences_2").innerHTML = grade_science_100_2;
                                        break;
                                    }
                                    case this.state.geographie_id: {
                                        grade_geographie_2 = grade_geographie_2 + res.data[c].grade;
                                        total_geographie_2 = total_geographie_2 + res.data[c].total;
                                        grade_geographie_100_2 = (grade_geographie_2 / total_geographie_2) * 100;
                                        document.getElementById("geographie_2").innerHTML = grade_geographie_100_2;
                                        break;
                                    }
                                }
                                grade_eveil_2 = (grade_histoire_100_2 * (1 / 3)) + (grade_science_100_2 * (1 / 3)) + (grade_geographie_100_2 * (1 / 3));
                                document.getElementById("eveil_2").innerHTML = this.roundNumber(grade_eveil_2);
                                break;
                            }
                            default:
                                console.log("error")
                        }
                    }
                    if (res2.data[0].trimester === 3)
                    {
                        switch (res2.data[0].subject_id) {
                            case this.state.francais_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.grammaire_id: {
                                        grade_grammaire_3 = grade_grammaire_3 + res.data[c].grade;
                                        total_grammaire_3 = total_grammaire_3 + res.data[c].total;
                                        grade_grammaire_100_3 = (grade_grammaire_3 / total_grammaire_3) * 100;
                                        document.getElementById("grammaire_3").innerHTML = this.roundNumber(grade_grammaire_100_3);
                                        break;
                                    }
                                    case this.state.conjugaison_id: {
                                        grade_conjugaison_3 = grade_conjugaison_3 + res.data[c].grade;
                                        total_conjugaison_3 = total_conjugaison_3 + res.data[c].total;
                                        grade_conjugaison_100_3 = (grade_conjugaison_3 / total_conjugaison_3) * 100;
                                        document.getElementById("conjugaison_3").innerHTML = this.roundNumber(grade_conjugaison_100_3);
                                        break;
                                    }
                                    case this.state.lecture_id: {
                                        grade_lecture_3 = grade_lecture_3 + res.data[c].grade;
                                        total_lecture_3 = total_lecture_3 + res.data[c].total;
                                        grade_lecture_100 = (grade_lecture_3 / total_lecture_3) * 100;
                                        document.getElementById("lecture_3").innerHTML = this.roundNumber(grade_lecture_100_3);
                                        break;
                                    }
                                    case this.state.orthographe_id: {
                                        grade_orthographe_3 = grade_orthographe_3 + res.data[c].grade;
                                        total_orthographe_3 = total_orthographe_3 + res.data[c].total;
                                        grade_orthographe_100_3 = (grade_orthographe_3 / total_orthographe_3) * 100;
                                        document.getElementById("orthographe_3").innerHTML = this.roundNumber(grade_orthographe_100_3);
                                        break;
                                    }
                                    case this.state.vocabulaire_id: {
                                        grade_vocabulaire_3 = grade_vocabulaire_3 + res.data[c].grade;
                                        total_vocabulaire_3 = total_vocabulaire_3 + res.data[c].total;
                                        grade_vocabulaire_100_3 = (grade_vocabulaire_3 / total_vocabulaire_3) * 100;
                                        document.getElementById("vocabulaire_3").innerHTML = this.roundNumber(grade_vocabulaire_100_3);
                                        break;
                                    }
                                }
                                grade_français_3 = (grade_grammaire_100_3 * (0.2)) + (grade_conjugaison_100_3* (0.2)) + (grade_lecture_100_3 * (0.2)) + (grade_orthographe_100_3 * (0.2)) + (grade_vocabulaire_100_3 * (0.2));
                                document.getElementById("français_3").innerHTML = this.roundNumber(grade_français_3);
                                break;
                            }
                            case this.state.math_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.calculs_id: {
                                        grade_calcul_3 = grade_calcul_3 + res.data[c].grade;
                                        total_calcul_3 = total_calcul_3 + res.data[c].total;
                                        grade_calcul_100_3 = (grade_calcul_3 / total_calcul_3) * 100;
                                        document.getElementById("calculs_3").innerHTML = this.roundNumber(grade_calcul_100_3);
                                        break;
                                    }
                                    case this.state.probleme_id: {
                                        grade_probleme_3 = grade_probleme_3 + res.data[c].grade;
                                        total_probleme_3 = total_probleme_3+ res.data[c].total;
                                        grade_probleme_100_3 = (grade_probleme_3 / total_probleme_3) * 100;
                                        document.getElementById("probleme_3").innerHTML = this.roundNumber(grade_probleme_100_3);
                                        break;
                                    }
                                    case this.state.geometrie_id: {
                                        grade_geometrie_3 = grade_geometrie_3 + res.data[c].grade;
                                        total_geometrie_3 = total_geometrie_3 + res.data[c].total;
                                        grade_geometrie_100_3 = (grade_geometrie_3 / total_geometrie_3) * 100;
                                        document.getElementById("geometrie_3").innerHTML = this.roundNumber(grade_geometrie_100_3);
                                        break;
                                    }
                                    case this.state.grandeurs_id: {
                                        grade_grandeur_3 = grade_grandeur_3 + res.data[c].grade;
                                        total_grandeur_3 = total_grandeur_3 + res.data[c].total;
                                        grade_grandeur_100_3 = (grade_grammaire_3 / total_grammaire_3) * 100;
                                        document.getElementById("grandeurs_3").innerHTML = this.roundNumber(grade_grandeur_100_3);
                                        break;
                                    }
                                    case this.state.numerisation_id: {
                                        grade_numerisation_3 = grade_numerisation_3 + res.data[c].grade;
                                        total_numerisation_3 = total_numerisation_3 + res.data[c].total;
                                        grade_numerisation_100_3 = (grade_numerisation_3 / total_numerisation_3) * 100;
                                        document.getElementById("numerisation_3").innerHTML = this.roundNumber(grade_numerisation_100);
                                        break;
                                    }
                                }
                                grade_math_3 = (grade_calcul_100_3 * (0.2)) + (grade_probleme_100_3 * (0.2)) + (grade_geometrie_100_3 * (0.2)) + (grade_grandeur_100_3 * (0.2)) + (grade_numerisation_100_3 * (0.2));
                                document.getElementById("math_3").innerHTML = this.roundNumber(grade_math_3);
                                break;
                            }
                            case this.state.eveil_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.histoire_id: {
                                        grade_histoire_3 = grade_histoire_3 + res.data[c].grade;
                                        total_histoire_3 = total_histoire_3 + res.data[c].total;
                                        grade_histoire_100_3 = (grade_histoire_3 / total_histoire_3) * 100;
                                        document.getElementById("histoire_3").innerHTML = grade_histoire_100_3;
                                        break;
                                    }
                                    case this.state.sciences_id: {
                                        grade_science_3 = grade_science_3 + res.data[c].grade;
                                        total_science_3 = total_science_3 + res.data[c].total;
                                        grade_science_100_3 = (grade_science_3 / total_science_3) * 100;
                                        document.getElementById("sciences_3").innerHTML = grade_science_100_3;
                                        break;
                                    }
                                    case this.state.geographie_id: {
                                        grade_geographie_3 = grade_geographie_3 + res.data[c].grade;
                                        total_geographie_3 = total_geographie_3 + res.data[c].total;
                                        grade_geographie_100_3 = (grade_geographie_3 / total_geographie_3) * 100;
                                        document.getElementById("geographie_3").innerHTML = grade_geographie_100_3;
                                        break;
                                    }
                                }
                                grade_eveil_3 = (grade_histoire_100_3 * (1 / 3)) + (grade_science_100_3 * (1 / 3)) + (grade_geographie_100_3 * (1 / 3));
                                document.getElementById("eveil_3").innerHTML = this.roundNumber(grade_eveil_3);
                                break;
                            }
                            default:
                                console.log("error")
                        }
                    }
                })
            }
        })
    }

    onLoadPageEmployee = () => {
        let url = window.location.pathname;
        let url_info = url.split("/");
        let user_ID = url_info[2];
        Axios.get(`http://localhost:5000/getUser/${user_ID}`, {

        }).then((res6) => {
            this.setState({lastname: res6.data.lastname})
            this.setState({firstname: res6.data.firstname},() =>
            {
                console.log(res6)
            })
        })
        Axios.get(`http://localhost:5000/getGradeByUserID/${user_ID}`, {

        }).then((res) => {
            //Subject
            let grade_français = 0;
            let grade_math = 0;
            let grade_eveil = 0;

            let grade_français_2 = 0;
            let grade_math_2 = 0;
            let grade_eveil_2 = 0;

            let grade_français_3 = 0;
            let grade_math_3 = 0;
            let grade_eveil_3 = 0;

            //SubSubject
            //Français
            let grade_grammaire = 0;
            let total_grammaire = 0;
            let grade_grammaire_100 = 0;
            let grade_conjugaison = 0;
            let total_conjugaison = 0;
            let grade_conjugaison_100 = 0;
            let grade_lecture = 0;
            let total_lecture = 0;
            let grade_lecture_100 = 0;
            let grade_orthographe = 0;
            let total_orthographe = 0;
            let grade_orthographe_100 = 0;
            let grade_vocabulaire = 0;
            let total_vocabulaire = 0;
            let grade_vocabulaire_100 = 0;

            let grade_grammaire_2 = 0;
            let total_grammaire_2 = 0;
            let grade_grammaire_100_2 = 0;
            let grade_conjugaison_2 = 0;
            let total_conjugaison_2 = 0;
            let grade_conjugaison_100_2 = 0;
            let grade_lecture_2 = 0;
            let total_lecture_2 = 0;
            let grade_lecture_100_2 = 0;
            let grade_orthographe_2 = 0;
            let total_orthographe_2 = 0;
            let grade_orthographe_100_2 = 0;
            let grade_vocabulaire_2 = 0;
            let total_vocabulaire_2 = 0;
            let grade_vocabulaire_100_2 = 0;

            let grade_grammaire_3 = 0;
            let total_grammaire_3 = 0;
            let grade_grammaire_100_3 = 0;
            let grade_conjugaison_3 = 0;
            let total_conjugaison_3 = 0;
            let grade_conjugaison_100_3 = 0;
            let grade_lecture_3 = 0;
            let total_lecture_3 = 0;
            let grade_lecture_100_3 = 0;
            let grade_orthographe_3 = 0;
            let total_orthographe_3 = 0;
            let grade_orthographe_100_3 = 0;
            let grade_vocabulaire_3 = 0;
            let total_vocabulaire_3 = 0;
            let grade_vocabulaire_100_3 = 0;
            //Math
            let grade_calcul = 0;
            let total_calcul = 0;
            let grade_calcul_100 = 0;
            let grade_probleme = 0;
            let total_probleme = 0;
            let grade_probleme_100 = 0;
            let grade_geometrie = 0;
            let total_geometrie = 0;
            let grade_geometrie_100 = 0;
            let grade_grandeur = 0;
            let total_grandeur = 0;
            let grade_grandeur_100 = 0;
            let grade_numerisation = 0;
            let total_numerisation = 0;
            let grade_numerisation_100 = 0;

            let grade_calcul_2 = 0;
            let total_calcul_2 = 0;
            let grade_calcul_100_2 = 0;
            let grade_probleme_2 = 0;
            let total_probleme_2 = 0;
            let grade_probleme_100_2 = 0;
            let grade_geometrie_2 = 0;
            let total_geometrie_2 = 0;
            let grade_geometrie_100_2 = 0;
            let grade_grandeur_2 = 0;
            let total_grandeur_2 = 0;
            let grade_grandeur_100_2 = 0;
            let grade_numerisation_2 = 0;
            let total_numerisation_2 = 0;
            let grade_numerisation_100_2 = 0;

            let grade_calcul_3 = 0;
            let total_calcul_3 = 0;
            let grade_calcul_100_3 = 0;
            let grade_probleme_3 = 0;
            let total_probleme_3 = 0;
            let grade_probleme_100_3 = 0;
            let grade_geometrie_3 = 0;
            let total_geometrie_3 = 0;
            let grade_geometrie_100_3 = 0;
            let grade_grandeur_3 = 0;
            let total_grandeur_3 = 0;
            let grade_grandeur_100_3 = 0;
            let grade_numerisation_3 = 0;
            let total_numerisation_3 = 0;
            let grade_numerisation_100_3 = 0;
            //Eveil
            let grade_histoire = 0;
            let total_histoire = 0;
            let grade_histoire_100 =0;
            let grade_science = 0;
            let total_science = 0;
            let grade_science_100 =0;
            let grade_geographie = 0;
            let total_geographie = 0;
            let grade_geographie_100 = 0;

            let grade_histoire_2 = 0;
            let total_histoire_2 = 0;
            let grade_histoire_100_2 =0;
            let grade_science_2 = 0;
            let total_science_2 = 0;
            let grade_science_100_2 =0;
            let grade_geographie_2 = 0;
            let total_geographie_2 = 0;
            let grade_geographie_100_2 = 0;

            let grade_histoire_3 = 0;
            let total_histoire_3 = 0;
            let grade_histoire_100_3 =0;
            let grade_science_3 = 0;
            let total_science_3 = 0;
            let grade_science_100_3 =0;
            let grade_geographie_3 = 0;
            let total_geographie_3 = 0;
            let grade_geographie_100_3 = 0;

            for(let c = 0; c < (res.data).length; c++)
            {
                Axios.get(`http://localhost:5000/getInterroByID/${res.data[c].interro_id}`, {
                }).then((res2) => {
                    if (res2.data[0].trimester === 1)
                    {
                        switch (res2.data[0].subject_id) {
                            case this.state.francais_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.grammaire_id: {
                                        grade_grammaire = grade_grammaire + res.data[c].grade;
                                        total_grammaire = total_grammaire + res.data[c].total;
                                        grade_grammaire_100 = (grade_grammaire / total_grammaire) * 100;
                                        document.getElementById("grammaire").innerHTML = this.roundNumber(grade_grammaire_100);
                                        break;
                                    }
                                    case this.state.conjugaison_id: {
                                        grade_conjugaison = grade_conjugaison + res.data[c].grade;
                                        total_conjugaison = total_conjugaison + res.data[c].total;
                                        grade_conjugaison_100 = (grade_conjugaison / total_conjugaison) * 100;
                                        document.getElementById("conjugaison").innerHTML = this.roundNumber(grade_conjugaison_100);
                                        break;
                                    }
                                    case this.state.lecture_id: {
                                        grade_lecture = grade_lecture + res.data[c].grade;
                                        total_lecture = total_lecture + res.data[c].total;
                                        grade_lecture_100 = (grade_lecture / total_lecture) * 100;
                                        document.getElementById("lecture").innerHTML = this.roundNumber(grade_lecture_100);
                                        break;
                                    }
                                    case this.state.orthographe_id: {
                                        grade_orthographe = grade_orthographe + res.data[c].grade;
                                        total_orthographe = total_orthographe + res.data[c].total;
                                        grade_orthographe_100 = (grade_orthographe / total_orthographe) * 100;
                                        document.getElementById("orthographe").innerHTML = this.roundNumber(grade_orthographe_100);
                                        break;
                                    }
                                    case this.state.vocabulaire_id: {
                                        grade_vocabulaire = grade_vocabulaire + res.data[c].grade;
                                        total_vocabulaire = total_vocabulaire + res.data[c].total;
                                        grade_vocabulaire_100 = (grade_vocabulaire / total_vocabulaire) * 100;
                                        document.getElementById("vocabulaire").innerHTML = this.roundNumber(grade_vocabulaire_100);
                                        break;
                                    }
                                }
                                grade_français = (grade_grammaire_100 * (0.2)) + (grade_conjugaison_100 * (0.2)) + (grade_lecture_100 * (0.2)) + (grade_orthographe_100 * (0.2)) + (grade_vocabulaire_100 * (0.2));
                                document.getElementById("français").innerHTML = this.roundNumber(grade_français);
                                break;
                            }
                            case this.state.math_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.calculs_id: {
                                        grade_calcul = grade_calcul + res.data[c].grade;
                                        total_calcul = total_calcul + res.data[c].total;
                                        grade_calcul_100 = (grade_calcul / total_calcul) * 100;
                                        document.getElementById("calculs").innerHTML = this.roundNumber(grade_calcul_100);
                                        break;
                                    }
                                    case this.state.probleme_id: {
                                        grade_probleme = grade_probleme + res.data[c].grade;
                                        total_probleme = total_probleme + res.data[c].total;
                                        grade_probleme_100 = (grade_probleme / total_probleme) * 100;
                                        document.getElementById("probleme").innerHTML = this.roundNumber(grade_probleme_100);
                                        break;
                                    }
                                    case this.state.geometrie_id: {
                                        grade_geometrie = grade_geometrie + res.data[c].grade;
                                        total_geometrie = total_geometrie + res.data[c].total;
                                        grade_geometrie_100 = (grade_geometrie / total_geometrie) * 100;
                                        document.getElementById("geometrie").innerHTML = this.roundNumber(grade_geometrie_100);
                                        break;
                                    }
                                    case this.state.grandeurs_id: {
                                        grade_grandeur = grade_grandeur + res.data[c].grade;
                                        total_grandeur = total_grandeur + res.data[c].total;
                                        grade_grandeur_100 = (grade_grammaire / total_grammaire) * 100;
                                        document.getElementById("grandeurs").innerHTML = this.roundNumber(grade_grandeur_100);
                                        break;
                                    }
                                    case this.state.numerisation_id: {
                                        grade_numerisation = grade_numerisation + res.data[c].grade;
                                        total_numerisation = total_numerisation + res.data[c].total;
                                        grade_numerisation_100 = (grade_numerisation / total_numerisation) * 100;
                                        document.getElementById("numerisation").innerHTML = this.roundNumber(grade_numerisation_100);
                                        break;
                                    }
                                }
                                grade_math = (grade_calcul_100 * (0.2)) + (grade_probleme_100 * (0.2)) + (grade_geometrie_100 * (0.2)) + (grade_grandeur_100 * (0.2)) + (grade_numerisation_100 * (0.2));
                                document.getElementById("math").innerHTML = this.roundNumber(grade_math);
                                break;
                            }
                            case this.state.eveil_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.histoire_id: {
                                        grade_histoire = grade_histoire + res.data[c].grade;
                                        total_histoire = total_histoire + res.data[c].total;
                                        grade_histoire_100 = (grade_histoire / total_histoire) * 100;
                                        document.getElementById("histoire").innerHTML = grade_histoire_100;
                                        break;
                                    }
                                    case this.state.sciences_id: {
                                        grade_science = grade_science + res.data[c].grade;
                                        total_science = total_science + res.data[c].total;
                                        grade_science_100 = (grade_science / total_science) * 100;
                                        document.getElementById("sciences").innerHTML = grade_science_100;
                                        break;
                                    }
                                    case this.state.geographie_id: {
                                        grade_geographie = grade_geographie + res.data[c].grade;
                                        total_geographie = total_geographie + res.data[c].total;
                                        grade_geographie_100 = (grade_geographie / total_geographie) * 100;
                                        document.getElementById("geographie").innerHTML = grade_geographie_100;
                                        break;
                                    }
                                }
                                grade_eveil = (grade_histoire_100 * (1 / 3)) + (grade_science_100 * (1 / 3)) + (grade_geographie_100 * (1 / 3));
                                document.getElementById("eveil").innerHTML = this.roundNumber(grade_eveil);
                                break;
                            }
                            default:
                                console.log("error")
                        }
                    }
                    if (res2.data[0].trimester === 2)
                    {
                        switch (res2.data[0].subject_id) {
                            case this.state.francais_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.grammaire_id: {
                                        grade_grammaire_2 = grade_grammaire_2 + res.data[c].grade;
                                        total_grammaire_2 = total_grammaire_2 + res.data[c].total;
                                        grade_grammaire_100_2 = (grade_grammaire_2 / total_grammaire_2) * 100;
                                        document.getElementById("grammaire_2").innerHTML = this.roundNumber(grade_grammaire_100_2);
                                        break;
                                    }
                                    case this.state.conjugaison_id: {
                                        grade_conjugaison_2 = grade_conjugaison_2 + res.data[c].grade;
                                        total_conjugaison_2 = total_conjugaison_2 + res.data[c].total;
                                        grade_conjugaison_100_2 = (grade_conjugaison_2 / total_conjugaison_2) * 100;
                                        document.getElementById("conjugaison_2").innerHTML = this.roundNumber(grade_conjugaison_100_2);
                                        break;
                                    }
                                    case this.state.lecture_id: {
                                        grade_lecture_2 = grade_lecture_2 + res.data[c].grade;
                                        total_lecture_2 = total_lecture_2 + res.data[c].total;
                                        grade_lecture_100_2 = (grade_lecture_2 / total_lecture_2) * 100;
                                        document.getElementById("lecture_2").innerHTML = this.roundNumber(grade_lecture_100_2);
                                        break;
                                    }
                                    case this.state.orthographe_id: {
                                        grade_orthographe_2 = grade_orthographe_2 + res.data[c].grade;
                                        total_orthographe_2 = total_orthographe_2 + res.data[c].total;
                                        grade_orthographe_100_2 = (grade_orthographe_2 / total_orthographe_2) * 100;
                                        document.getElementById("orthographe_2").innerHTML = this.roundNumber(grade_orthographe_100_2);
                                        break;
                                    }
                                    case this.state.vocabulaire_id: {
                                        grade_vocabulaire_2 = grade_vocabulaire_2 + res.data[c].grade;
                                        total_vocabulaire_2 = total_vocabulaire_2 + res.data[c].total;
                                        grade_vocabulaire_100_2 = (grade_vocabulaire_2 / total_vocabulaire_2) * 100;
                                        document.getElementById("vocabulaire_2").innerHTML = this.roundNumber(grade_vocabulaire_100_2);
                                        break;
                                    }
                                }
                                grade_français_2 = (grade_grammaire_100_2 * (0.2)) + (grade_conjugaison_100_2 * (0.2)) + (grade_lecture_100_2 * (0.2)) + (grade_orthographe_100_2 * (0.2)) + (grade_vocabulaire_100_2 * (0.2));
                                document.getElementById("français_2").innerHTML = this.roundNumber(grade_français_2);
                                break;
                            }
                            case this.state.math_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.calculs_id: {
                                        grade_calcul_2 = grade_calcul_2 + res.data[c].grade;
                                        total_calcul_2 = total_calcul_2 + res.data[c].total;
                                        grade_calcul_100_2 = (grade_calcul_2 / total_calcul_2) * 100;
                                        document.getElementById("calculs_2").innerHTML = this.roundNumber(grade_calcul_100_2);
                                        break;
                                    }
                                    case this.state.probleme_id: {
                                        grade_probleme_2 = grade_probleme_2 + res.data[c].grade;
                                        total_probleme_2 = total_probleme_2 + res.data[c].total;
                                        grade_probleme_100_2 = (grade_probleme_2 / total_probleme_2) * 100;
                                        document.getElementById("probleme_2").innerHTML = this.roundNumber(grade_probleme_100_2);
                                        break;
                                    }
                                    case this.state.geometrie_id: {
                                        grade_geometrie_2 = grade_geometrie_2 + res.data[c].grade;
                                        total_geometrie_2 = total_geometrie_2 + res.data[c].total;
                                        grade_geometrie_100_2 = (grade_geometrie_2 / total_geometrie_2) * 100;
                                        document.getElementById("geometrie_2").innerHTML = this.roundNumber(grade_geometrie_100_2);
                                        break;
                                    }
                                    case this.state.grandeurs_id: {
                                        grade_grandeur_2 = grade_grandeur_2 + res.data[c].grade;
                                        total_grandeur_2 = total_grandeur_2 + res.data[c].total;
                                        grade_grandeur_100_2 = (grade_grammaire_2 / total_grammaire_2) * 100;
                                        document.getElementById("grandeurs_2").innerHTML = this.roundNumber(grade_grandeur_100_2);
                                        break;
                                    }
                                    case this.state.numerisation_id: {
                                        grade_numerisation_2 = grade_numerisation_2 + res.data[c].grade;
                                        total_numerisation_2 = total_numerisation_2 + res.data[c].total;
                                        grade_numerisation_100_2 = (grade_numerisation_2 / total_numerisation_2) * 100;
                                        document.getElementById("numerisation_2").innerHTML = this.roundNumber(grade_numerisation_100_2);
                                        break;
                                    }
                                }
                                grade_math_2 = (grade_calcul_100_2 * (0.2)) + (grade_probleme_100_2 * (0.2)) + (grade_geometrie_100_2 * (0.2)) + (grade_grandeur_100_2 * (0.2)) + (grade_numerisation_100_2 * (0.2));
                                document.getElementById("math_2").innerHTML = this.roundNumber(grade_math_2);
                                break;
                            }
                            case this.state.eveil_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.histoire_id: {
                                        grade_histoire_2 = grade_histoire_2 + res.data[c].grade;
                                        total_histoire_2 = total_histoire_2 + res.data[c].total;
                                        grade_histoire_100_2 = (grade_histoire_2 / total_histoire_2) * 100;
                                        document.getElementById("histoire_2").innerHTML = grade_histoire_100_2;
                                        break;
                                    }
                                    case this.state.sciences_id: {
                                        grade_science_2 = grade_science_2 + res.data[c].grade;
                                        total_science_2 = total_science_2 + res.data[c].total;
                                        grade_science_100_2 = (grade_science_2 / total_science_2) * 100;
                                        document.getElementById("sciences_2").innerHTML = grade_science_100_2;
                                        break;
                                    }
                                    case this.state.geographie_id: {
                                        grade_geographie_2 = grade_geographie_2 + res.data[c].grade;
                                        total_geographie_2 = total_geographie_2 + res.data[c].total;
                                        grade_geographie_100_2 = (grade_geographie_2 / total_geographie_2) * 100;
                                        document.getElementById("geographie_2").innerHTML = grade_geographie_100_2;
                                        break;
                                    }
                                }
                                grade_eveil_2 = (grade_histoire_100_2 * (1 / 3)) + (grade_science_100_2 * (1 / 3)) + (grade_geographie_100_2 * (1 / 3));
                                document.getElementById("eveil_2").innerHTML = this.roundNumber(grade_eveil_2);
                                break;
                            }
                            default:
                                console.log("error")
                        }
                    }
                    if (res2.data[0].trimester === 3)
                    {
                        switch (res2.data[0].subject_id) {
                            case this.state.francais_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.grammaire_id: {
                                        grade_grammaire_3 = grade_grammaire_3 + res.data[c].grade;
                                        total_grammaire_3 = total_grammaire_3 + res.data[c].total;
                                        grade_grammaire_100_3 = (grade_grammaire_3 / total_grammaire_3) * 100;
                                        document.getElementById("grammaire_3").innerHTML = this.roundNumber(grade_grammaire_100_3);
                                        break;
                                    }
                                    case this.state.conjugaison_id: {
                                        grade_conjugaison_3 = grade_conjugaison_3 + res.data[c].grade;
                                        total_conjugaison_3 = total_conjugaison_3 + res.data[c].total;
                                        grade_conjugaison_100_3 = (grade_conjugaison_3 / total_conjugaison_3) * 100;
                                        document.getElementById("conjugaison_3").innerHTML = this.roundNumber(grade_conjugaison_100_3);
                                        break;
                                    }
                                    case this.state.lecture_id: {
                                        grade_lecture_3 = grade_lecture_3 + res.data[c].grade;
                                        total_lecture_3 = total_lecture_3 + res.data[c].total;
                                        grade_lecture_100 = (grade_lecture_3 / total_lecture_3) * 100;
                                        document.getElementById("lecture_3").innerHTML = this.roundNumber(grade_lecture_100_3);
                                        break;
                                    }
                                    case this.state.orthographe_id: {
                                        grade_orthographe_3 = grade_orthographe_3 + res.data[c].grade;
                                        total_orthographe_3 = total_orthographe_3 + res.data[c].total;
                                        grade_orthographe_100_3 = (grade_orthographe_3 / total_orthographe_3) * 100;
                                        document.getElementById("orthographe_3").innerHTML = this.roundNumber(grade_orthographe_100_3);
                                        break;
                                    }
                                    case this.state.vocabulaire_id: {
                                        grade_vocabulaire_3 = grade_vocabulaire_3 + res.data[c].grade;
                                        total_vocabulaire_3 = total_vocabulaire_3 + res.data[c].total;
                                        grade_vocabulaire_100_3 = (grade_vocabulaire_3 / total_vocabulaire_3) * 100;
                                        document.getElementById("vocabulaire_3").innerHTML = this.roundNumber(grade_vocabulaire_100_3);
                                        break;
                                    }
                                }
                                grade_français_3 = (grade_grammaire_100_3 * (0.2)) + (grade_conjugaison_100_3* (0.2)) + (grade_lecture_100_3 * (0.2)) + (grade_orthographe_100_3 * (0.2)) + (grade_vocabulaire_100_3 * (0.2));
                                document.getElementById("français_3").innerHTML = this.roundNumber(grade_français_3);
                                break;
                            }
                            case this.state.math_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.calculs_id: {
                                        grade_calcul_3 = grade_calcul_3 + res.data[c].grade;
                                        total_calcul_3 = total_calcul_3 + res.data[c].total;
                                        grade_calcul_100_3 = (grade_calcul_3 / total_calcul_3) * 100;
                                        document.getElementById("calculs_3").innerHTML = this.roundNumber(grade_calcul_100_3);
                                        break;
                                    }
                                    case this.state.probleme_id: {
                                        grade_probleme_3 = grade_probleme_3 + res.data[c].grade;
                                        total_probleme_3 = total_probleme_3+ res.data[c].total;
                                        grade_probleme_100_3 = (grade_probleme_3 / total_probleme_3) * 100;
                                        document.getElementById("probleme_3").innerHTML = this.roundNumber(grade_probleme_100_3);
                                        break;
                                    }
                                    case this.state.geometrie_id: {
                                        grade_geometrie_3 = grade_geometrie_3 + res.data[c].grade;
                                        total_geometrie_3 = total_geometrie_3 + res.data[c].total;
                                        grade_geometrie_100_3 = (grade_geometrie_3 / total_geometrie_3) * 100;
                                        document.getElementById("geometrie_3").innerHTML = this.roundNumber(grade_geometrie_100_3);
                                        break;
                                    }
                                    case this.state.grandeurs_id: {
                                        grade_grandeur_3 = grade_grandeur_3 + res.data[c].grade;
                                        total_grandeur_3 = total_grandeur_3 + res.data[c].total;
                                        grade_grandeur_100_3 = (grade_grammaire_3 / total_grammaire_3) * 100;
                                        document.getElementById("grandeurs_3").innerHTML = this.roundNumber(grade_grandeur_100_3);
                                        break;
                                    }
                                    case this.state.numerisation_id: {
                                        grade_numerisation_3 = grade_numerisation_3 + res.data[c].grade;
                                        total_numerisation_3 = total_numerisation_3 + res.data[c].total;
                                        grade_numerisation_100_3 = (grade_numerisation_3 / total_numerisation_3) * 100;
                                        document.getElementById("numerisation_3").innerHTML = this.roundNumber(grade_numerisation_100);
                                        break;
                                    }
                                }
                                grade_math_3 = (grade_calcul_100_3 * (0.2)) + (grade_probleme_100_3 * (0.2)) + (grade_geometrie_100_3 * (0.2)) + (grade_grandeur_100_3 * (0.2)) + (grade_numerisation_100_3 * (0.2));
                                document.getElementById("math_3").innerHTML = this.roundNumber(grade_math_3);
                                break;
                            }
                            case this.state.eveil_id : {
                                switch (res2.data[0].sub_subject_id) {
                                    case this.state.histoire_id: {
                                        grade_histoire_3 = grade_histoire_3 + res.data[c].grade;
                                        total_histoire_3 = total_histoire_3 + res.data[c].total;
                                        grade_histoire_100_3 = (grade_histoire_3 / total_histoire_3) * 100;
                                        document.getElementById("histoire_3").innerHTML = grade_histoire_100_3;
                                        break;
                                    }
                                    case this.state.sciences_id: {
                                        grade_science_3 = grade_science_3 + res.data[c].grade;
                                        total_science_3 = total_science_3 + res.data[c].total;
                                        grade_science_100_3 = (grade_science_3 / total_science_3) * 100;
                                        document.getElementById("sciences_3").innerHTML = grade_science_100_3;
                                        break;
                                    }
                                    case this.state.geographie_id: {
                                        grade_geographie_3 = grade_geographie_3 + res.data[c].grade;
                                        total_geographie_3 = total_geographie_3 + res.data[c].total;
                                        grade_geographie_100_3 = (grade_geographie_3 / total_geographie_3) * 100;
                                        document.getElementById("geographie_3").innerHTML = grade_geographie_100_3;
                                        break;
                                    }
                                }
                                grade_eveil_3 = (grade_histoire_100_3 * (1 / 3)) + (grade_science_100_3 * (1 / 3)) + (grade_geographie_100_3 * (1 / 3));
                                document.getElementById("eveil_3").innerHTML = this.roundNumber(grade_eveil_3);
                                break;
                            }
                            default:
                                console.log("error")
                        }
                    }
                })
            }
        })
    }

    roundNumber = (number) => {
        let result = Math.round(number * 100) / 100
        return result
    }

    getPercentage = (subsubject_name) => {
        Axios.get(`http://localhost:5000/getSubSubjectByName`, {
            employee_id: this.state.employee_id,
            name: subsubject_name
        }).then((res5) => {
            return res5.data[0].percentage
        })
    }
}
export default Bulletin
