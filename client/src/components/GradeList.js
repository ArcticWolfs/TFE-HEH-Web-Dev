/*import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import Modal from "react-modal";


export class GradeList extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
        this.onLoadPage();
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Liste des points</h1>
                    <form className="form-inline">
                        <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Matières</label>
                        <select className="custom-select my-1 mr-sm-2" id="subFilter" onChange={this.onSubjectFilterChange}></select>
                        <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Sous-Matière</label>
                        <select className="custom-select my-1 mr-sm-2" id="subSubFilter" onChange={this.onSubSubjectFilterChange}></select>
                        <input type="text"/>
                        <button type="button" className="btn btn-primary mb-2" onClick={this.onFilter}>Filtrer
                        </button>
                    </form>
                </div>
                <div>
                    <table className="table table-sm table-dark">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nom de l'interro</th>
                            <th scope="col">Classe</th>
                            <th scope="col">Matières</th>
                            <th scope="col">Sous-Matière</th>
                            <th scope="col">Total</th>
                            <th scope="col">Modify</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        <tbody id="table">
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }

    onLoadPage = () => {
        Axios.get(`http://localhost:5000/getSubject/${this.state.employee_id}`, {

        }).then((res ) => {
            this.deleteChild("subFilter");
            try
            {
                let tableRow = document.getElementById('table');
                while (tableRow.hasChildNodes())
                {
                    tableRow.removeChild(tableRow.firstChild);
                }
            }
            catch (e)
            {
                console.log("le tableau est vide");
            }


            for (let c = 0; c < (res.data).length; c++)
            {
                let option = document.createElement('option');
                option.value = res.data[c].name;
                option.innerHTML = res.data[c].name;
                document.getElementById("subFilter").appendChild(option);
            }
            this.setState({subject_nameFilter: res.data[0].name})
            this.setState({selectSubjectIDFilter: res.data[0].subject_id},() => {

                Axios.get(`http://localhost:5000/getSubSubject/${this.state.selectSubjectIDFilter}`, {

                }).then((res) => {
                    this.createChildSubSub("subSubFilter",res)
                })
            })


        })

        Axios.get(`http://localhost:5000/getInterro/${this.state.employee_id}`,{

        }).then((res) => {
            let tableRow = document.getElementById("table");
            for (let i = 0; i < (res.data).length; i++)
            {
                //Tableau ID
                let trTable = document.createElement('tr');
                tableRow.appendChild(trTable);

                let tdTableID = document.createElement('td');
                tdTableID.innerHTML = res.data[i].interro_id;
                trTable.appendChild(tdTableID);

                //Tableau Name
                let tdTableName = document.createElement('td');
                tdTableName.innerHTML = res.data[i].name;
                trTable.appendChild(tdTableName);

                //Tableau Classe
                Axios.get(`http://localhost:5000/getClassById/${res.data[i].class_id}`,{

                }).then((res2) => {
                    let tdTableClass = document.createElement('td');
                    tdTableClass.innerHTML = res2.data[0].name;
                    trTable.appendChild(tdTableClass);

                    //Tableau Matières
                    Axios.get(`http://localhost:5000/getSubjectById/${res.data[i].subject_id}`,{

                    }).then((res3) => {
                        let tdTableSubject = document.createElement('td');
                        tdTableSubject.innerHTML = res3.data[0].name;
                        trTable.appendChild(tdTableSubject);

                        //Tableau sous matière
                        Axios.get(`http://localhost:5000/getSubSubjectById/${res.data[i].sub_subject_id}`,{

                        }).then((res4) => {
                            let tdTableSubSubject = document.createElement('td');
                            tdTableSubSubject.innerHTML = res4.data[0].sub_subject_name;tdTableID.className = "tableData";
                            trTable.appendChild(tdTableSubSubject);

                            //Tableau total
                            let tdTableTotal = document.createElement('td');
                            tdTableTotal.innerHTML = res.data[i].total;
                            trTable.appendChild(tdTableTotal);

                            //Tableau Note
                            let tdTableNote = document.createElement('td');
                            trTable.appendChild(tdTableNote);
                            let buttonNote = document.createElement('button');
                            buttonNote.textContent = "Points" ;
                            buttonNote.className = "btn btn-primary"
                            buttonNote.value = res.data[i].interro_id;
                            tdTableNote.appendChild(buttonNote);

                            //Tableau modify
                            let tdTableModify = document.createElement('td');
                            trTable.appendChild(tdTableModify);
                            let buttonModify = document.createElement('button');
                            buttonModify.textContent = "Modify" ;
                            buttonModify.className = "btn btn-warning"
                            buttonModify.value = res.data[i].interro_id;
                            buttonModify.addEventListener("click",this.handleOpenModify)
                            tdTableModify.appendChild(buttonModify);

                            //Tableau delete
                            let tdTableDelete = document.createElement('td');
                            trTable.appendChild(tdTableDelete);
                            let buttonDelete = document.createElement('button');
                            buttonDelete.textContent = "Delete" ;
                            buttonDelete.className = "btn btn-danger"
                            buttonDelete.value = res.data[i].interro_id;
                            tdTableDelete.appendChild(buttonDelete);
                        })
                    })
                })
            }
        })


    }

    onClick = () => {
        Axios.get(`http://localhost:5000/createInterro/${this.state.id}`, {

            name: this.state.name,
            total: this.state.total

        }).then((res) => {
            if (res.data.id) {
            } else {
                console.log("Données incorrectes");
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                emailAddress: this.state.emailAddress,
                password: null
            })
        })
    }

}
export default InterroList*/
