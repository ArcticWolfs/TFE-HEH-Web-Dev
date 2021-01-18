import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/style.css";
import Axios from "axios";

import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


export class Bulletin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.userId,
            is_employee: this.props.employee,
            id: this.props.userId,
            firstname : "",
            lastname : ""
          }
          if (this.state.is_employee === "true")
          {
              this.onLoadPageEmployee();
          }
          else
          {
              this.loadTable();
          }

    }

    render() {
        return (
            <React.Fragment>
                <a id="toPDF" onClick={this.exportPdf}>Télécharger en PDF</a>
                <div id="bulletinCentrer">
                    <div id="bulletin">
                        <h1 id="titreBulletin">Bulletin de {this.state.firstname} {this.state.lastname}</h1>

                        <div className="matiereBulletin">
                            <tr>
                                <th className="bulletin titre principal">Branches</th>
                                <th className="bulletin principal">Maximum</th>
                                <th className="bulletin principal">Période 1</th>
                                <th className="bulletin principal">Période 2</th>
                                <th className="bulletin principal">Période 3</th>
                            </tr>
                        </div>
                        <div className="matiereBulletin">
                            <tr>
                                <th className="bulletin titre principal">Français</th>
                                <th className="bulletin principal">/100</th>
                                <th className="bulletin principal" id="français1"></th>
                                <th className="bulletin principal" id="français2"></th>
                                <th className="bulletin principal" id="français3"></th>
                            </tr>
                            <tr>
                                <td className="bulletin titre">Lire, parler, écouter</td>
                                <td className="bulletin">/40</td>
                                <td className="bulletin" id="lire1"></td>
                                <td className="bulletin" id="lire2"></td>
                                <td className="bulletin" id="lire3"></td>
                            </tr>
                            <tr>
                                <td className="bulletin titre">Écrire</td>
                                <td className="bulletin">/60</td>
                                <td className="bulletin" id="ecrire1"></td>
                                <td className="bulletin" id="ecrire2"></td>
                                <td className="bulletin" id="ecrire3"></td>
                            </tr>
                        </div>
                        <div className="matiereBulletin">
                            <tr>
                                <th className="bulletin titre principal">Mathémathiques</th>
                                <th className="bulletin principal">/100</th>
                                <th className="bulletin principal" id="mathématiques1"></th>
                                <th className="bulletin principal" id="mathématiques2"></th>
                                <th className="bulletin principal" id="mathématiques3"></th>
                            </tr>
                            <tr>
                                <td className="bulletin titre demi">Mesurer et structurer l'espace</td>
                                <td rowSpan="2" className="bulletin">/50</td>
                                <td rowSpan="2" className="bulletin" id="mesurer1"></td>
                                <td rowSpan="2" className="bulletin" id="mesurer2"></td>
                                <td rowSpan="2" className="bulletin" id="mesurer3"></td>
                            </tr>
                            <tr>
                                <td className="bulletin titre demi">Établir des liens logiques</td>
                            </tr>
                            <tr>
                                <td className="bulletin titre demi">Calculer et faire des opérations</td>
                                <td rowSpan="2" className="bulletin">/50</td>
                                <td rowSpan="2" className="bulletin" id="calculer1"></td>
                                <td rowSpan="2" className="bulletin" id="calculer2"></td>
                                <td rowSpan="2" className="bulletin" id="calculer3"></td>
                            </tr>
                            <tr>
                                <td className="bulletin titre demi">Établir des liens logiques</td>
                            </tr>
                        </div>
                        <div className="matiereBulletin">
                            <tr>
                                <th className="bulletin titre principal">Éveil</th>
                                <th className="bulletin principal">/50</th>
                                <th className="bulletin principal" id="eveil1"></th>
                                <th className="bulletin principal" id="eveil2"></th>
                                <th className="bulletin principal" id="eveil3"></th>
                            </tr>
                        </div>
                        <div className="matiereBulletin">
                            <tr>
                                <th className="bulletin titre principal">Néerlandais</th>
                                <th className="bulletin principal">/20</th>
                                <th className="bulletin principal" id="neerlandais1"></th>
                                <th className="bulletin principal" id="neerlandais2"></th>
                                <th className="bulletin principal" id="neerlandais3"></th>
                            </tr>
                        </div>
                        <div className="matiereBulletin">
                            <tr>
                                <th className="bulletin titre principal">Gymnastique</th>
                                <th className="bulletin principal">/20</th>
                                <th className="bulletin principal" id="gymnastique1"></th>
                                <th className="bulletin principal" id="gymnastique2"></th>
                                <th className="bulletin principal" id="gymnastique3"></th>
                            </tr>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    onLoadPageEmployee = () => {
        let url = window.location.pathname;
        let url_info = url.split("/");
        this.state.id = url_info[2]
        this.loadTable();
    }

    loadTable = () => {
        Axios.get(`http://localhost:5000/getUser/${this.state.id}`, {

        }).then((res) => {
            this.setState({lastname: res.data.lastname})
            this.setState({firstname: res.data.firstname})
        })
        Axios.get(`http://localhost:5000/getGradeByUserID/${this.state.id}`, {

        }).then((res) => {

            let points = new Array(res.data.length);//matière - sous-matière - trimestre - points (points/total)
            
            for(let i = 0; i<res.data.length;i++){
                points[i] = new Array(res.data.length);
                for (let j=0;j<res.data.length;j++){
                    points[i][j] = new Array (res.data.length);
                    for (let k=0;k<res.data.length;k++){
                        points[i][j][k] = new Array (res.data.length);
                        for (let l=0;l<res.data.length;l++){
                            points[i][j][k][l]=0;
                        }
                    }
                }
            }
            for(let c = 0; c < res.data.length; c++){
                Axios.get(`http://localhost:5000/getInterroByID/${res.data[c].interro_id}`, {
                }).then((res2) => {
                    Axios.get(`http://localhost:5000/getSubSubjectById/${res2.data[0].sub_subject_id}`, {
                    }).then((res3) => {
                        Axios.get(`http://localhost:5000/getSubjectById/${res2.data[0].subject_id}`, {
                        }).then((res4) => {
                            for (let i=1; i<4; i++){ //trimestre
                                if(res2.data[0].trimester === i){
                                    points[res2.data[0].subject_id][res2.data[0].sub_subject_id][i][0]+=res.data[c].grade;
                                    points[res2.data[0].subject_id][res2.data[0].sub_subject_id][i][1]+=res.data[c].total;
                                    points[res2.data[0].subject_id][res2.data[0].sub_subject_id][i][2]=res3.data[0].percentage;
                                    let result = points[res2.data[0].subject_id][res2.data[0].sub_subject_id][i][0]/points[res2.data[0].subject_id][res2.data[0].sub_subject_id][i][1]*res3.data[0].percentage;
                                    let sub_subject = res3.data[0].sub_subject_name.replace(',',' ');
                                    sub_subject = (sub_subject.split(" ",2)[0]+i).toLowerCase();
                                    document.getElementById(sub_subject).innerHTML = this.roundNumber(result);

                                    Axios.get(`http://localhost:5000/getSubSubject/${res3.data[0].subject_id}`, {
                                    }).then((res5)=> {
                                        let moyenne=0;
                                        for (let j=0; j<res.data.length;j++){
                                            if(points[res5.data[0].subject_id][j][i][0]!==0) moyenne += points[res5.data[0].subject_id][j][i][0]/points[res5.data[0].subject_id][j][i][1]*points[res5.data[0].subject_id][j][i][2]
                                        }
                                        let subject = res4.data[0].name.replace(',',' ');
                                        subject = (subject.split(" ",2)[0]+i).toLowerCase();
                                        document.getElementById(subject).innerHTML = this.roundNumber(moyenne);
                                    })
                                }
                            }
                        })
                        
                    })
                })
            }
        })
    }

    roundNumber = (number) => {
        let result = Math.round(number * 100) / 100
        return result
    }

    exportPdf = () => {
        htmlToImage.toPng(document.getElementById('bulletin'), { quality: 0.95 })
        .then((dataUrl) => {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          const pdf = new jsPDF();          
          pdf.addImage(dataUrl, 'PNG', 0, 0);
          pdf.save("bulletin_"+this.state.lastname+this.state.firstname+".pdf"); 
        });
    }
}
export default Bulletin
