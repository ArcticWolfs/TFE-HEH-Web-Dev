import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";


export class GradeList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            interro_name : "sqd",
            interro_class : "qsd"
        }
        this.onLoadPage2();
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Liste des points de {this.state.interro_name} de la classe {this.state.interro_class}</h1>
                </div>
                <div>
                    <table className="table table-sm table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Prénom</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Point</th>
                            <th scope="col">Total</th>
                            <th scope="col">absent</th>
                        </tr>
                        </thead>
                        <tbody id="table2">
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }

    onLoadPage2 = () => {
        try
        {
            let tableRow2 = document.getElementById('table2');
            while (tableRow2.hasChildNodes())
            {
                tableRow2.removeChild(tableRow2.firstChild);
            }
        }
        catch (e)
        {
            console.log("le tableau est vide");
        }

        let url = window.location.pathname;
        let url_info = url.split("/");
        let interro_id = url_info[2];

        console.log(interro_id)

        Axios.get(`http://localhost:5000/getGradeByInterroID/${interro_id}`,{

        }).then((res) => {
            console.log((res.data).length)
            Axios.get(`http://localhost:5000/getInterroByID/${interro_id}`,{

            }).then((res3 ) => {
                this.setState({ interro_name : res3.data[0].name})

                Axios.get(`http://localhost:5000/getClassById/${res3.data[0].class_id}`,{

                }).then((res4 ) => {
                    this.setState({interro_class: res4.data[0].name})
                })

                let tableRow = document.getElementById("table2");
                for (let i = 0; i < (res.data).length; i++)
                {
                    //Table
                    let trTable = document.createElement('tr');
                    tableRow.appendChild(trTable);
                    Axios.get(`http://localhost:5000/getUser/${res.data[i].user_id}`,{

                    }).then((res2) => {
                        //Tableau FirstName
                        let tdTableFirstName = document.createElement('td');
                        tdTableFirstName.innerHTML = res2.data.firstname;
                        trTable.appendChild(tdTableFirstName);

                        //Tableau LastName
                        let tdTableLastName = document.createElement('td');
                        tdTableLastName.innerHTML = res2.data.lastname;
                        trTable.appendChild(tdTableLastName);

                        //Tableau Grade
                        let tdTableGrade = document.createElement('td');
                        trTable.appendChild(tdTableGrade);
                        let inputGrade = document.createElement('input');
                        inputGrade.value = res.data[i].grade;
                        inputGrade.className = "text-center"
                        inputGrade.addEventListener("input",this.saveModification)
                        tdTableGrade.appendChild(inputGrade);

                        //Tableau Grade
                        let tdTableTotal = document.createElement('td');
                        trTable.appendChild(tdTableTotal);
                        let inputTotal = document.createElement('input');
                        inputTotal.value = res.data[i].total;
                        inputTotal.className = "text-center"
                        inputTotal.addEventListener("input",this.saveModification)
                        tdTableTotal.appendChild(inputTotal);

                        //Tableau Absent
                        let tdTableAbsent = document.createElement('td');
                        trTable.appendChild(tdTableAbsent);
                        let checkbox = document.createElement('input')
                        checkbox.type = "checkbox";
                        if (res.data[i].absent === true)
                        {
                            checkbox.checked = true;
                        }
                        checkbox.addEventListener("click",this.saveModification)
                        tdTableAbsent.appendChild(checkbox);
                    })
                }
            })
        })
    }

    saveModification = () => {
        console.log("modif")
    }

}
export default GradeList
