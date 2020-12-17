import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import Modal from "react-modal";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";


export class InterroList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            total: "",
            class: "",
            subject_name: "",
            subSubject_name: "",
            subjectFilter_name: "",
            subSubjectFilter_name: "",
            selectSubjectID: "",
            selectSubSubjectID: "",
            selectSubjectIDFilter: "",
            selectSubSubjectIDFilter: "",
            isOpen: false,
            subject: "",
            employee_id: "1",
            class_id: "",
            filtered: 0
        }
        this.onLoadPage();
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}>
                    <div id="connectezvous">Créer une interro</div>
                    <p className="champConnect"><input class="champConnect" placeholder="Nom de l'interro" name="name" type="text" value={this.state.emailAddress} onChange={this.onChange}/></p>
                    <p className="champConnect"><input class="champConnect" onKeyDown={this.onKeyDown} placeholder="Total" name="total" type="value" value={this.state.password} onChange={this.onChange }/></p>
                    <select className="custom-select my-1 mr-sm-2" id="modalSub" onChange={this.onSubjectChange}></select>
                    <select className="custom-select my-1 mr-sm-2" id="modalSubSub" onChange={this.onSubSubjectChange}></select>
                    <select className="custom-select my-1 mr-sm-2" id="modalClass" onChange={this.onClassChange}></select>
                    <button className="boutonModal btn btn-outline-light"  onClick={this.handleClose}>Annuler</button>
                    <button className="boutonModal btn btn-outline-light" onClick={this.onCreateInterro}>Créer l'interro</button>
                </Modal>
                <div>
                    <h1>Interro</h1>
                    <button class="btn btn-primary" onClick={this.handleOpen}>Créer une interro</button>
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
                            tdTableNote.appendChild(buttonNote);

                            //Tableau modify
                            let tdTableModify = document.createElement('td');
                            trTable.appendChild(tdTableModify);
                            let buttonModify = document.createElement('button');
                            buttonModify.textContent = "Modify" ;
                            buttonModify.className = "btn btn-warning"
                            tdTableModify.appendChild(buttonModify);

                            //Tableau delete
                            let tdTableDelete = document.createElement('td');
                            trTable.appendChild(tdTableDelete);
                            let buttonDelete = document.createElement('button');
                            buttonDelete.textContent = "Delete" ;
                            buttonDelete.className = "btn btn-danger"
                            tdTableDelete.appendChild(buttonDelete);
                        })
                    })
                })
            }
        })


    }

    onCreateInterro = (e) => {

        Axios.post(`http://localhost:5000/createInterro`, {
            employee_id: this.state.employee_id,
            class_id: this.state.class_id,
            subject_id: this.state.selectSubjectID,
            sub_subject_id: this.state.selectSubSubjectID,
            name : this.state.name,
            total : this.state.total
        }).then(() =>
        {
            this.handleClose();
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
        Axios.get(`http://localhost:5000/getSubject/${this.state.employee_id}`, {

        }).then((res ) => {
            for (let c = 0; c < (res.data).length; c++)
            {
                let option = document.createElement('option');
                option.value = res.data[c].name;
                option.innerHTML = res.data[c].name;
                document.getElementById("modalSub").appendChild(option);
            }
            this.setState({subject_name: res.data[0].name})
            this.setState({selectSubjectID: res.data[0].subject_id})

            Axios.get(`http://localhost:5000/getSubSubject/${this.state.selectSubjectID}`, {

            }).then((res) => {
                this.createChildSubSub("modalSubSub",res)
                this.setState({subSubject_name: res.data[0].name})
                this.setState({selectSubSubjectID: res.data[0].sub_subject_id})

                Axios.get(`http://localhost:5000/getClass/${this.state.employee_id}`, {

                }).then((res) => {
                    for (let c = 0; c < (res.data).length; c++)
                    {
                        let option = document.createElement('option');
                        option.value = res.data[c].name;
                        option.innerHTML = res.data[c].name;
                        document.getElementById("modalClass").appendChild(option);
                    }
                    this.setState({class: res.data[0].name})
                    this.setState({class_id: res.data[0].class_id})

                })
            })
        })
    };

    handleClose = () => {
        this.setState({ isOpen: false });
        this.onLoadPage();
    };

    onSubjectChange = (e) => {
        let subjectName = document.getElementById("modalSub").value;

        this.setState({subject_name: subjectName}, () =>
        {

            Axios.post(`http://localhost:5000/getSubjectByName`,
        {

                employee_id: this.state.employee_id,
                name: this.state.subject_name

            }).then((res) =>
            {
                this.setState({selectSubjectID: res.data[0].subject_id}, () =>
                {
                    Axios.get(`http://localhost:5000/getSubSubject/${this.state.selectSubjectID}`, {}).then((res) =>
                    {
                        this.deleteChild("modalSubSub");
                        this.createChildSubSub("modalSubSub",res);

                    })
                })
            })
        })
    }

    onSubSubjectChange = () =>
    {
        let modalSubSubjectName = document.getElementById("modalSubSub").value;

        this.setState({subSubject_name: modalSubSubjectName}, () =>
        {
            Axios.post(`http://localhost:5000/getSubSubjectByName`,
                {

                    subject_id: this.state.selectSubjectID,
                    sub_subject_name: this.state.subSubject_name

                }).then((res) =>
            {
                this.setState({selectSubSubjectID: res.data[0].sub_subject_id}, () => {
                    this.setState({subSubject_name: res.data[0].sub_subject_name},() =>
                    {

                    })
                })

            })
        })
    }

    onClassChange = () =>
    {
        let modalClass = document.getElementById("modalClass").value;

        this.setState({class_name:modalClass}, () =>
        {
            Axios.get(`http://localhost:5000/getClassByName/${this.state.class_name}`,
                {

                }).then((res) =>
            {
                this.setState({class_id: res.data[0].class_id}, () => {
                    this.setState({class: res.data[0].name})
                })

            })
        })
    }

    onSubjectFilterChange = (e) => {
        let subjectFilterName = document.getElementById("subFilter").value;

        this.setState({subjectFilter_name: subjectFilterName}, () =>
        {

            Axios.post(`http://localhost:5000/getSubjectByName`,
                {

                    employee_id: this.state.employee_id,
                    name: this.state.subjectFilter_name

                }).then((res) =>
            {
                this.setState({selectSubjectIDFilter: res.data[0].subject_id}, () =>
                {
                    Axios.get(`http://localhost:5000/getSubSubject/${this.state.selectSubjectIDFilter}`, {}).then((res) =>
                    {
                        this.setState({selectSubSubjectIDFilter : res.data[0].sub_subject_id})
                        this.deleteChild("subSubFilter");
                        this.createChildSubSub("subSubFilter",res);
                    })
                })
            })
        })
    }

    /*onSubSubjectFilterChange = (e) => {
        let subSubjectFilterName = document.getElementById("subSubFilter").value;

        this.setState({subSubjectFilter_name: subSubjectFilterName}, () =>
        {
            console.log(this.state.selectSubjectIDFilter)
            console.log(this.state.subSubjectFilter_name)
            Axios.get(`http://localhost:5000/getSubSubjectByNameOnly`,
                {

                    subject_id: this.state.selectSubjectIDFilter,
                    sub_subject_name: this.state.subSubjectFilter_name

                }).then((res) =>
            {
                console.log(res.data.sub_subject_id)
                this.setState({selectSubSubjectIDFilter: res.data.sub_subject_id})
            })
        })
    }*/

    deleteChild = (select) => {
        let selectList = document.getElementById(select);
        let numberOfChild = selectList.length;
        for (let d = 1; d < numberOfChild + 1 ; d++)
        {
            selectList.remove(0);
        }
    }

    createChildSubSub = (select,res) => {
        let subSubjectSelect = document.getElementById(select);

        for (let i = 0; i < (res.data).length; i++)
        {
            let optionSubSub = document.createElement('option');
            optionSubSub.value = res.data[i].sub_subject_name;
            optionSubSub.innerHTML = res.data[i].sub_subject_name;
            subSubjectSelect.appendChild(optionSubSub);
        }
    }

    /*onFilter = () => {
        console.log(this.state.selectSubjectIDFilter)
        console.log(this.state.selectSubSubjectIDFilter)
        Axios.get(`http://localhost:5000/getInterroFiltered/${this.state.employee_id}`,{
            subject_id: this.state.selectSubjectIDFilter,
            sub_subject_id : this.state.selectSubSubjectIDFilter

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
                            tdTableNote.appendChild(buttonNote);

                            //Tableau modify
                            let tdTableModify = document.createElement('td');
                            trTable.appendChild(tdTableModify);
                            let buttonModify = document.createElement('button');
                            buttonModify.textContent = "Modify" ;
                            buttonModify.className = "btn btn-warning"
                            tdTableModify.appendChild(buttonModify);

                            //Tableau delete
                            let tdTableDelete = document.createElement('td');
                            trTable.appendChild(tdTableDelete);
                            let buttonDelete = document.createElement('button');
                            buttonDelete.textContent = "Delete" ;
                            buttonDelete.className = "btn btn-danger"
                            tdTableDelete.appendChild(buttonDelete);
                        })
                    })
                })
            }
        })
    }*/

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
export default InterroList
