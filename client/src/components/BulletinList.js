import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";


export class BulletinList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.userId,
            is_employee: this.props.employee,
            firstname : "",
            lastname : ""
        }
        if (this.state.is_employee === "true")
        {
            console.log(this.state.user_id)
            this.onLoadPageEmployee();
        }
        else
        {
            this.onLoadPageUser();
        }

    }

    render() {
        if (this.state.is_employee === "true")
        {
            return (
                <React.Fragment>
                    <div>
                        <h1>Liste des élèves</h1>
                    </div>
                    <div>
                        <table className="table table-sm table-dark">
                            <thead>
                            <tr>
                                <th scope="col">Prénom</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Classe</th>
                                <th scope="col">Voir le bulletin</th>
                            </tr>
                            </thead>
                            <tbody id="table3">
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            )
        }
        else
        {
            return (
                <React.Fragment>
                    <div>
                        <h1>Bulletin de {this.state.lastname} {this.state.firstname}</h1>
                    </div>
                    <div>
                        <table className="table table-sm table-dark">
                            <thead>
                            <tr>
                                <th scope="col">Classe</th>
                                <th scope="col">Année</th>
                                <th scope="col">Voir le bulletin</th>
                            </tr>
                            </thead>
                            <tbody id="table3">
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            )
        }
    }


    onLoadPageEmployee = () => {

        Axios.get(`http://localhost:5000/getClass/${this.state.user_id}`,{

        }).then((res) => {
            try
            {
                let tableRow = document.getElementById('table3');
                while (tableRow.hasChildNodes())
                {
                    tableRow.removeChild(tableRow.firstChild);
                }
            }
            catch (e)
            {
                console.log("le tableau est vide");
            }

            for (let i = 0; i< (res.data).length; i++)
            {
                Axios.get(`http://localhost:5000/getWholeClass/${res.data[0].class_id}`,{

                }).then((res2 ) => {

                    let tableRow = document.getElementById("table3");

                    for (let c = 0; c < (res2.data).length; c++) {
                        //Table
                        let trTable = document.createElement('tr');
                        tableRow.appendChild(trTable);

                        //Tableau FirstName
                        let tdTableFirstName = document.createElement('td');
                        tdTableFirstName.innerHTML = res2.data[c].firstname;
                        trTable.appendChild(tdTableFirstName);

                        //Tableau LastName
                        let tdTableLastName = document.createElement('td');
                        tdTableLastName.innerHTML = res2.data[c].lastname;
                        trTable.appendChild(tdTableLastName);

                        Axios.get(`http://localhost:5000/getClassById/${res2.data[c].class_id}`, {

                        }).then((res3) => {
                            //Tableau Class
                            let tdTableClass = document.createElement('td');
                            tdTableClass.innerHTML = res3.data[0].name;
                            trTable.appendChild(tdTableClass);

                            //Tableau Bulletin
                            let tdTableBulletin = document.createElement('td');
                            trTable.appendChild(tdTableBulletin);
                            let buttonBulletin = document.createElement('a');
                            buttonBulletin.textContent = "Bulletin" ;
                            buttonBulletin.className = "btn btn-primary"
                            buttonBulletin.href = `/bulletin/${res2.data[c].class_id}`;
                            tdTableBulletin.appendChild(buttonBulletin);
                        })
                    }
                })
            }
        })
    }

    onLoadPageUser = () => {

        Axios.get(`http://localhost:5000/getUser/${this.state.user_id}`,{

        }).then((res) => {
            try
            {
                let tableRow = document.getElementById('table3');
                while (tableRow.hasChildNodes())
                {
                    tableRow.removeChild(tableRow.firstChild);
                }
            }
            catch (e)
            {
                console.log("le tableau est vide");
            }

            Axios.get(`http://localhost:5000/getClass/${res.data.class_id}`,{

            }).then((res2 ) => {

                let tableRow = document.getElementById("table3");

                this.setState({firstname : res.data.firstname})
                this.setState({lastname : res.data.lastname})

                Axios.get(`http://localhost:5000/getClassById/${res.data.class_id}`, {

                }).then((res2) => {

                    //Table
                    let trTable = document.createElement('tr');
                    tableRow.appendChild(trTable);

                    //Tableau Class
                    let tdTableClass = document.createElement('td');
                    tdTableClass.innerHTML = res2.data[0].name;
                    trTable.appendChild(tdTableClass);

                    //Tableau Year
                    let tdTableYear = document.createElement('td');
                    tdTableYear.innerHTML = res2.data[0].year;
                    trTable.appendChild(tdTableYear);

                    //Tableau Bulletin
                    let tdTableBulletin = document.createElement('td');
                    trTable.appendChild(tdTableBulletin);
                    let buttonBulletin = document.createElement('a');
                    buttonBulletin.textContent = "Bulletin" ;
                    buttonBulletin.className = "btn btn-primary"
                    buttonBulletin.href = `/bulletin/${res.data.class_id}`;
                    tdTableBulletin.appendChild(buttonBulletin);
                })
            })
        })
    }
}
export default BulletinList
