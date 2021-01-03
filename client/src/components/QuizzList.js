import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import Modal from "react-modal";

let LIST_ROW = [];

export class QuizzList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            questions: "",
            image: "",
            select_subject : "français",
            time : "",
            type : "TrueOrFalse",
            good_answer : "",
            bad_answer:"",
            bad_answer_2 :"",
            bad_answer_3 : "",
            trueOrFalse_answer: 1,
            entries : null
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
                    <div id="créer une question"><h1>Créer une Question</h1></div>
                    <p className="champConnect"><input class="champConnect" placeholder="Question" name="questions" type="text" value={this.state.questions} onChange={this.onChange}/></p>
                    <p className="champConnect"><input class="champConnect" placeholder="Lien vers l'image" name="image" type="text" value={this.state.image} onChange={this.onChange}/></p>
                    <select id="subject" onChange={this.onSubjectChange}>
                        <option value="français">Français</option>
                        <option value="mathématiques">Mathématiques</option>
                        <option value="histoire">Histoire</option>
                        <option value="géographie">Géographie</option>
                        <option value="sciences">Sciences</option>
                    </select>
                    <p className="champConnect"><input className="champConnect" placeholder="Temps" name="time" type="number" value={this.state.time} onChange={this.onChange}/></p>
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
                <div>
                    <h1>Question du Quizz</h1>
                    <button class="btn btn-primary" onClick={this.handleOpen}>Créer une question</button>
                </div>
                <div>
                    <table className="table table-sm table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Question N°</th>
                            <th scope="col">Question</th>
                            <th scope="col">Sujet</th>
                            <th scope="col">Temps</th>
                            <th scope="col">Bonne réponse</th>
                            <th scope="col">Mauvais réponse</th>
                            <th scope="col">Mauvaise réponse 2</th>
                            <th scope="col">Mauvaise réponse 3</th>
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
        Axios.get(`http://localhost:5000/getAllQuestion`, {

        }).then((res ) => {
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

            let tableRow = document.getElementById("table");
            for (let i = 0; i < (res.data).length; i++)
            {
                //Tableau
                let trTable = document.createElement('tr');
                tableRow.appendChild(trTable);

                //Tableau Number
                let tdTableNumber = document.createElement('td');
                tdTableNumber.innerHTML = i+1;
                trTable.appendChild(tdTableNumber);

                //Tableau Question
                let tdTableQuestion = document.createElement('td');
                trTable.appendChild(tdTableQuestion);
                let inputQuestion = document.createElement('input');
                inputQuestion.type = "text";
                inputQuestion.value = res.data[i]["question"];
                tdTableQuestion.appendChild(inputQuestion);

                //Tableau Subject
                let tdTableSubject = document.createElement('td');
                tdTableSubject.innerHTML = res.data[i]["subject"];
                trTable.appendChild(tdTableSubject);


                //Tableau Temps
                let tdTableTime = document.createElement('td');
                trTable.appendChild(tdTableTime);
                let inputTime = document.createElement('input');
                inputTime.type = "text";
                inputTime.value = res.data[i]["time"];
                tdTableTime.appendChild(inputTime);

                Axios.get(`http://localhost:5000/getGoodAnswerByQuestionID/${res.data[i]["question_id"]}`, {

                }).then((res2) => {
                    //Tableau Bonne réponse
                    let tdTableGoodAnswer = document.createElement('td');
                    trTable.appendChild(tdTableGoodAnswer);
                    let inputGoodAnswer = document.createElement('input');
                    inputGoodAnswer.type = "text";
                    inputGoodAnswer.value = res2.data[0]["answer"];
                    tdTableGoodAnswer.appendChild(inputGoodAnswer);

                    Axios.get(`http://localhost:5000/getBadAnswerByQuestionID/${res.data[i]["question_id"]}`, {

                    }).then((res3) => {
                        if ((res3.data).length < 2)
                        {
                            //Tableau Mauvaise réponse
                            let tdTableBadAnswer = document.createElement('td');
                            trTable.appendChild(tdTableBadAnswer);
                            let inputBadAnswer = document.createElement('input');
                            inputBadAnswer.type = "text";
                            inputBadAnswer.value = res3.data[0]["answer"];
                            tdTableBadAnswer.appendChild(inputBadAnswer);

                            //Tableau Mauvaise réponse 2
                            let tdTableBadAnswer2 = document.createElement('td');
                            tdTableBadAnswer2.innerHTML = "/";
                            trTable.appendChild(tdTableBadAnswer2);
                            let inputBadAnswer2 = document.createElement('input');

                            //Tableau Mauvaise réponse 3
                            let tdTableBadAnswer3 = document.createElement('td');
                            tdTableBadAnswer3.innerHTML = "/";
                            trTable.appendChild(tdTableBadAnswer3);
                        }
                        else
                        {
                            //Tableau Mauvaise réponse
                            let tdTableBadAnswer = document.createElement('td');
                            trTable.appendChild(tdTableBadAnswer);
                            let inputBadAnswer = document.createElement('input');
                            inputBadAnswer.type = "text";
                            inputBadAnswer.value = res3.data[0]["answer"];
                            tdTableBadAnswer.appendChild(inputBadAnswer);

                            //Tableau Mauvaise réponse 2
                            let tdTableBadAnswer2 = document.createElement('td');
                            trTable.appendChild(tdTableBadAnswer2);
                            let inputBadAnswer2 = document.createElement('input');
                            inputBadAnswer2.type = "text";
                            inputBadAnswer2.value = res3.data[1]["answer"];
                            tdTableBadAnswer2.appendChild(inputBadAnswer2);

                            //Tableau Mauvaise réponse 3
                            let tdTableBadAnswer3 = document.createElement('td');
                            trTable.appendChild(tdTableBadAnswer3);
                            let inputBadAnswer3 = document.createElement('input');
                            inputBadAnswer3.type = "text";
                            inputBadAnswer3.value = res3.data[2]["answer"];
                            tdTableBadAnswer3.appendChild(inputBadAnswer3);
                        }

                        //Tableau Delete
                        let tdTableDelete= document.createElement('td');
                        trTable.appendChild(tdTableDelete);
                        let buttonDelete = document.createElement('button');
                        buttonDelete.textContent = "Delete" ;
                        buttonDelete.className = "btn btn-danger"
                        buttonDelete.value = res.data[i].question_id;
                        buttonDelete.addEventListener("click",this.onDeleteQuestion)
                        tdTableDelete.appendChild(buttonDelete);
                    })
                })
            }
        })
    }

    onCreateQuestion = (e) => {
        try{
            Axios.post(`http://localhost:5000/createQuestion`, {
                question: this.state.questions,
                image : this.state.image,
                subject : this.state.select_subject,
                time : this.state.time
            }).then((res) => {
                console.log(res.data.question_id)
                if (this.state.type === "TrueOrFalse")
                {
                    if (this.state.trueOrFalse_answer === 1)
                    {
                        Axios.post(`http://localhost:5000/createAnswer`, {
                            question_id : res.data.question_id,
                            answer : "Vrai",
                            trueanswerornot: true
                        }).then((res9) => {
                            Axios.post(`http://localhost:5000/createAnswer`, {
                                answer : "Faux",
                                trueanswerornot : false,
                                question_id : res.data.question_id
                            }).then((res8) => {
                                this.handleClose();
                                this.onLoadPage();
                            })
                        })
                    }
                    else
                    {
                        Axios.post(`http://localhost:5000/createAnswer`, {
                            answer : "Vrai",
                            trueanswerornot: false,
                            question_id : res.data.question_id
                        }).then((res6) => {
                            Axios.post(`http://localhost:5000/createAnswer`, {
                                answer : "Faux",
                                trueanswerornot : true,
                                question_id : res.data.question_id
                            }).then((res7) => {
                                this.handleClose();
                                //this.onLoadPage();
                            })
                        })
                    }
                }
                else
                {
                    Axios.post(`http://localhost:5000/createAnswer`, {
                        answer : this.state.good_answer,
                        trueanswerornot : true,
                        question_id : res.data.question_id
                    }).then((res2) => {
                        Axios.post(`http://localhost:5000/createAnswer`, {
                            answer : this.state.bad_answer,
                            trueanswerornot : false,
                            question_id : res.data.question_id
                        }).then((res3) => {
                            Axios.post(`http://localhost:5000/createAnswer`, {
                                answer : this.state.bad_answer_2,
                                trueanswerornot : false,
                                question_id : res.data.question_id

                            }).then((res4) => {
                                Axios.post(`http://localhost:5000/createAnswer`, {
                                    answer : this.state.bad_answer_3,
                                    trueanswerornot : false,
                                    question_id : res.data.question_id
                                }).then((res5) => {
                                    this.handleClose();
                                    //this.onLoadPage();
                                })
                            })
                        })
                    })
                }

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
        this.setState({type : "MultipleAnswer"});
        document.getElementById("multipleAnswer").hidden = false;
        document.getElementById("trueOrFalse").hidden = true;
    }
    onQuestionTypeChangeForTrueOrFalse = () => {
        this.setState({type : "TrueOrFalse"});
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

    onModifyQuestion= () => {
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
    };

    handleClose = () => {
        this.setState({ isOpen: false });
        this.setState({select_subject : "français"});
    };

    onSubjectChange = () => {
        this.setState({select_subject : document.getElementById("subject").value})
    }

    onSubjectChangeModify = () => {
        this.setState({select_subject_modify : document.getElementById("subject_modify").value})
    }

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
