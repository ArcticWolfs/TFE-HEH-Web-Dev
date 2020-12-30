import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import Modal from "react-modal";


export class QuizzList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isModifyOpen: false,
            questions: "",
            image: "",
            subject : "",
            time : "",
            good_answer : "",
            bad_answer:"",
            bad_answer_2 :"",
            bad_answer_3 : "",
            trueOrFalse_answer: 1
        }
        //this.onLoadPage();
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
                    <div id="créer une question"><h1>Créer une Question</h1></div>
                    <p className="champConnect"><input class="champConnect" placeholder="Question" name="questions" type="text" value={this.state.questions} onChange={this.onChange}/></p>
                    <p className="champConnect"><input class="champConnect" placeholder="Lien vers l'image" name="image" type="text" value={this.state.image} onChange={this.onChange}/></p>
                    <p className="champConnect"><input className="champConnect" placeholder="Matière" name="subject" type="text" value={this.state.subject} onChange={this.onChange}/></p>
                    <p className="champConnect"><input className="champConnect" placeholder="Temps" name="time" type="text" value={this.state.time} onChange={this.onChange}/></p>
                    <div>
                        <h2>Type de question</h2>
                        <input type="radio" id="trueOrFalseType" name="typeQuestion" value="trueOrFalse" defaultChecked onClick={this.onQuestionTypeChangeForTrueOrFalse}/>
                        <label htmlFor="trueOrFalseType">Vrai ou faux</label><br/>
                        <input type="radio" id="multipleAnswerType" name="typeQuestion" value="multipleAnswer" onClick={this.onQuestionTypeChangeForMultipleAnswer}/>
                        <label htmlFor="multipleAnswerType">Question à choix multiple</label><br/>
                        <h2>Réponses</h2>
                    </div>
                    <div id="multipleAnswer" hidden>
                        <p className="champConnect"><input className="champConnect" placeholder="Bonne réponse" name="good_answer" type="text" value={this.state.good_answer} onChange={this.onChange}/></p>
                        <p className="champConnect"><input className="champConnect" placeholder="Mauvaise réponse 1" name="bad_answer" type="text" value={this.state.bad_answer} onChange={this.onChange}/></p>
                        <p className="champConnect"><input className="champConnect" placeholder="Mauvaise réponse 2" name="bad_answer_2" type="text" value={this.state.bad_answer_2} onChange={this.onChange}/></p>
                        <p className="champConnect"><input className="champConnect" placeholder="Mauvaise réponse 3" name="bad_answer_3" type="text" value={this.state.bad_answer_3} onChange={this.onChange}/></p>
                    </div>
                    <div id="trueOrFalse">
                        <input type="radio" id="true" name="trueOrFalseChoice" value="trueOrFalse" defaultChecked onClick={this.onAnswerForTrue}/>
                        <label htmlFor="true">Vrai</label>
                        <input type="radio" id="false" name="trueOrFalseChoice" value="multipleAnswer" onClick={this.onAnswerForFalse}/>
                        <label htmlFor="false">Faux</label><br/>
                    </div>
                    <button className="boutonModal btn btn-outline-light"  onClick={this.handleClose}>Annuler</button>
                    <button className="boutonModal btn btn-outline-light" onClick={this.onCreateQuestion}>Créer la question</button>
                </Modal>
                <Modal
                    isOpen={this.state.isModifyOpen}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}>
                    <div id="connectezvous">Modifier une interro</div>
                    <p className="champConnect"><input class="champConnect" id="nameModify" placeholder="Nom de l'interro" name="nameModify" type="text" value={this.state.nameModify} onChange={this.onChange}/></p>
                    <p className="champConnect"><input class="champConnect" id="totalModify" onKeyDown={this.onKeyDown} name="totalModify" type="text" value={this.state.totalModify}  onChange={this.onChange}/></p>
                    <select className="custom-select my-1 mr-sm-2" id="modalSubModify" onChange={this.onSubjectChangeModify}/>
                    <select className="custom-select my-1 mr-sm-2" id="modalSubSubModify" onChange={this.onSubSubjectChangeModify}/>
                    <select className="custom-select my-1 mr-sm-2" id="modalClassModify" onChange={this.onClassChangeModify}/>
                    <button className="boutonModal btn btn-outline-light"  onClick={this.handleCloseModify}>Annuler</button>
                    <button className="boutonModal btn btn-outline-light" onClick={this.onModifyInterro}>Modifier l'interro</button>
                </Modal>
                <div>
                    <h1>Question du Quizz</h1>
                    <button class="btn btn-primary" onClick={this.handleOpen}>Créer une question</button>
                    <form className="form-inline">
                        <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Matières</label>
                        <select className="custom-select my-1 mr-sm-2" id="subFilter" onChange={this.onSubjectFilterChange}/>
                        <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Sous-Matière</label>
                        <select className="custom-select my-1 mr-sm-2" id="subSubFilter" onChange={this.onSubSubjectFilterChange}/>
                        <input type="text"/>
                        <button type="button" className="btn btn-primary mb-2" onClick={this.onFilter}>Filtrer
                        </button>
                    </form>
                </div>
                <div>
                    <table className="table table-sm table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Question N°</th>
                            <th scope="col">Question</th>
                            <th scope="col">Temps</th>
                        </tr>
                        </thead>
                        <tbody id="table">
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }

    /*onLoadPage = () => {
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
            if ((res.data).length!==0){
                this.setState({subject_nameFilter: res.data[0].name})
                this.setState({selectSubjectIDFilter: res.data[0].subject_id},() => {

                    Axios.get(`http://localhost:5000/getSubSubject/${this.state.selectSubjectIDFilter}`, {

                    }).then((res) => {
                        this.createChildSubSub("subSubFilter",res)
                    })
                })
            }
        })

        Axios.get(`http://localhost:5000/getInterro/${this.state.employee_id}`,{

        }).then((res) => {
            let tableRow = document.getElementById("table");
            for (let i = 0; i < (res.data).length; i++)
            {
                //Tableau
                let trTable = document.createElement('tr');
                tableRow.appendChild(trTable);

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
                            tdTableSubSubject.innerHTML = res4.data[0].sub_subject_name;
                            trTable.appendChild(tdTableSubSubject);

                            //Tableau Trimester
                            let tdTableTrimester = document.createElement('td');
                            tdTableTrimester.innerHTML = res.data[i].trimester;
                            trTable.appendChild(tdTableTrimester);

                            //Tableau total
                            let tdTableTotal = document.createElement('td');
                            tdTableTotal.innerHTML = res.data[i].total;
                            trTable.appendChild(tdTableTotal);

                            //Tableau Note
                            let tdTableNote = document.createElement('td');
                            trTable.appendChild(tdTableNote);
                            let buttonNote = document.createElement('a');
                            buttonNote.textContent = "Points" ;
                            buttonNote.className = "btn btn-primary"
                            buttonNote.href = `/gradeList/${res.data[i].interro_id}`;
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
                            buttonDelete.addEventListener("click",this.onDeleteInterro)
                            tdTableDelete.appendChild(buttonDelete);
                        })
                    })
                })
            }
        })
    }*/

    onCreateQuestion = (e) => {
        try{
            Axios.post(`http://localhost:5000/createQuestion`, {
                question: this.state.questions,
                image : this.state.image,
                subject : this.state.subject,
                time : this.state.time
            }).then((res) => {
                this.handleClose();
                //this.onLoadPage();
            })
        }
        catch (e)
        {
            this.handleClose();
            this.onLoadPage();
            console.log("Error while creating a Question !")
        }

    }

    onQuestionTypeChangeForMultipleAnswer = () => {
        document.getElementById("multipleAnswer").hidden = false;
        document.getElementById("trueOrFalse").hidden = true;
    }
    onQuestionTypeChangeForTrueOrFalse = () => {
        document.getElementById("multipleAnswer").hidden = true;
        document.getElementById("trueOrFalse").hidden = false;
    }

    onAnswerForTrue = () => {
        this.setState({trueOrFalse_answer : 1},() => {
            console.log(this.state.trueOrFalse_answer)
        })
    }
    onAnswerForFalse = () => {
        this.setState({trueOrFalse_answer : 0},() => {
            console.log(this.state.trueOrFalse_answer)
        })
    }

    onModifyInterro= () => {
        Axios.put(`http://localhost:5000/modifyInterro`, {
            interro_id: this.state.interroIDModify,
            employee_id:this.state.employee_id,
            class_id: this.state.selectClassIDModify,
            subject_id: this.state.selectSubjectIDModify,
            sub_subject_id: this.state.selectSubSubjectIDModify,
            name : this.state.nameModify,
            total : this.state.totalModify
        }).then(() => {
            this.onLoadPage();
        })
        this.handleCloseModify();
    }

    onDeleteInterro = (e) => {
        console.log(e.path[0].value)
        Axios.delete(`http://localhost:5000/deleteInterroByID/${e.path[0].value}`,{

        }).then((res) => {
            this.onLoadPage();
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
    };

    handleOpenModify = (e) => {
        this.setState({isModifyOpen : true})
        Axios.get(`http://localhost:5000/getInterroByID/${e.path[0].value}`,{

        }).then((res) => {
            this.setState({nameModify: res.data[0].name})
            this.setState({totalModify: res.data[0].total})
            this.setState({interroIDModify: res.data[0].interro_id})

            Axios.get(`http://localhost:5000/getSubject/${this.state.employee_id}`, {

            }).then((res2) => {
                for (let c = 0; c < (res2.data).length; c++) {
                    let option = document.createElement('option');
                    option.value = res2.data[c].name;
                    option.innerHTML = res2.data[c].name;
                    if (res2.data[c].subject_id === res.data[0].subject_id)
                    {
                        option.selected = true;
                        this.setState({selectSubjectNameModify: res2.data[c].name})
                        this.setState({selectSubjectIDModify: res2.data[c].subject_id})
                    }
                    document.getElementById("modalSubModify").appendChild(option);
                }
                Axios.get(`http://localhost:5000/getSubSubject/${this.state.selectSubjectIDModify}`, {

                }).then((res3) => {

                    let subSubjectSelect = document.getElementById("modalSubSubModify");

                    for (let i = 0; i < (res3.data).length; i++)
                    {
                        let optionSubSub = document.createElement('option');
                        optionSubSub.value = res3.data[i].sub_subject_name;
                        optionSubSub.innerHTML = res3.data[i].sub_subject_name;

                        if (res3.data[i].sub_subject_id === res.data[0].sub_subject_id)
                        {
                            optionSubSub.selected = true;
                        }

                        subSubjectSelect.appendChild(optionSubSub);
                    }
                    this.setState({selectSubSubjectNameModify: res3.data[0].name})
                    this.setState({selectSubSubjectIDModify: res3.data[0].sub_subject_id})

                    Axios.get(`http://localhost:5000/getClass/${this.state.employee_id}`, {

                    }).then((res4) => {
                        for (let c = 0; c < (res4.data).length; c++)
                        {
                            let optionClass = document.createElement('option');
                            optionClass.value = res4.data[c].name;
                            optionClass.innerHTML = res4.data[c].name;
                            if (res4.data[c].class_id === res.data[0].class_id)
                            {
                                optionClass.selected = true;
                            }
                            document.getElementById("modalClassModify").appendChild(optionClass);
                        }
                        this.setState({selectClassNameModify: res4.data[0].name})
                        this.setState({selectClassIDModify: res4.data[0].class_id})

                    })
                })
            })
        })
    }

    handleCloseModify = () => {
        this.setState({ isModifyOpen: false },() => {
        });
    };


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
}
export default QuizzList
