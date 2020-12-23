import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";


export class GradeList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            interro_name : "",
            interro_class : "",
            employee_id: this.props.userId,
            interro_id : ""
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

        let url = window.location.pathname;
        let url_info = url.split("/");
        let interro_id = url_info[2];
        this.setState({interro_id : interro_id})

        Axios.get(`http://localhost:5000/getGradeByInterroID/${interro_id}`,{

        }).then((res) => {
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
                        tdTableGrade.className = `${res.data[i].grade_id}`
                        trTable.appendChild(tdTableGrade);
                        let inputGrade = document.createElement('input');
                        inputGrade.value = res.data[i].grade;
                        inputGrade.className = `text-center id/${res.data[i].grade_id}`
                        inputGrade.name = "Grade";
                        if (res.data[i].absent === true)
                        {
                            inputGrade.disabled = true;
                        }
                        inputGrade.addEventListener("input",this.saveModification)
                        tdTableGrade.appendChild(inputGrade);

                        //Tableau Total
                        let tdTableTotal = document.createElement('td');
                        tdTableTotal.className = `${res.data[i].grade_id}`
                        trTable.appendChild(tdTableTotal);
                        let inputTotal = document.createElement('input');
                        inputTotal.value = res.data[i].total;
                        inputTotal.className = `text-center id/${res.data[i].grade_id}`
                        inputTotal.name = "Total";
                        if (res.data[i].absent === true)
                        {
                            inputTotal.disabled = true;
                        }
                        inputTotal.addEventListener("input",this.saveModification)
                        tdTableTotal.appendChild(inputTotal);

                        //Tableau Absent
                        let tdTableAbsent = document.createElement('td');
                        tdTableAbsent.className = `${res.data[i].grade_id}`
                        trTable.appendChild(tdTableAbsent);
                        let checkbox = document.createElement('input')
                        checkbox.type = "checkbox";
                        checkbox.name = "Absent";
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

    saveModification = (e) => {
        let grade_id = e.path[1].className

        Axios.get(`http://localhost:5000/getGradeByID/${grade_id}`, {


        }).then((res) => {

            let grade = res.data[0].grade;
            let total = res.data[0].total;
            let absent = res.data[0].absent;
            if  (e.path[0].value !== "")
            {
                switch (e.target.name)
                {
                    case "Grade":
                    {
                        if (e.path[0].value <= total)
                        {
                            grade = e.path[0].value;
                            Axios.put(`http://localhost:5000/modifyGradeByID`, {

                                grade_id : grade_id,
                                grade: grade,
                                total : total,
                                absent: absent
                            })
                            break;
                        }
                        else
                        {
                            console.log("The grade is bigger than the total which is impossible !")
                            this.onLoadPage2();
                            break;
                        }

                    }
                    case "Total":
                        if (e.path[0].value >= grade)
                        {
                            total = e.path[0].value;
                            Axios.put(`http://localhost:5000/modifyGradeByID`, {

                                grade_id : grade_id,
                                grade: grade,
                                total : total,
                                absent: absent
                            })
                            break;
                        }
                        else
                        {
                            console.log("The total is smaller than the grade which is impossible !")
                            this.onLoadPage2();
                            break;
                        }


                    case "Absent":
                        absent = !absent;
                        if (absent === true)
                        {
                            let inputClass = e.path[1].className;
                            document.getElementsByClassName("id/"+inputClass).disabled = true
                            grade = 0;
                            total = 0
                        }
                        else
                        {
                            let inputClass = e.path[1].className;
                            document.getElementsByClassName("id/"+inputClass).disabled = false;
                        }

                        Axios.put(`http://localhost:5000/modifyGradeByID`, {

                            grade_id : grade_id,
                            grade: grade,
                            total : total,
                            absent: absent
                        }).then((res) => {
                            this.onLoadPage2();
                        })

                        break;
                    default:
                        console.log("Error while finding the element");
                }
            }

        })
    }

}
export default GradeList
