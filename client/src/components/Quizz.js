import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/style.css";
import Axios from "axios";

export class Quizz extends Component {

    constructor(props) {
        super(props)

        this.state = {
            good_answer : "",
            timer : "",
            quizz_subject: "",
            question: [],
            length : 0,
            random : 0,
            total : 0,
            interval: ""
        }
        this.onLoadPage();
    }

    render() {
        return (
            <React.Fragment>

                <div className="container-fluid">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="bg-dark">
                                <p className="text-white-50 text-xl-center" id="time"/>
                            </div>
                            <div className="modal-header bg-dark">
                                <h3 id="question"/>
                            </div>
                            <div className="modal-body bg-dark">
                                <div className="col-xs-3 5"/>
                                <div className="quiz" id="quiz" data-toggle="buttons">
                                    <button className="element-animation1 btn btn-lg btn-dark btn-block btn-outline-light" id="answer_1" onClick={this.onClick}/>
                                    <button className="element-animation1 btn btn-lg btn-dark btn-block btn-outline-light" id="answer_2" onClick={this.onClick}/>
                                    <button className="element-animation1 btn btn-lg btn-dark btn-block btn-outline-light" id="answer_3" onClick={this.onClick}/>
                                    <button className="element-animation1 btn btn-lg btn-dark btn-block btn-outline-light" id="answer_4" onClick={this.onClick}/>
                                </div>
                                <p id="result"/>
                            </div>
                            <div className="bg-dark">
                                <p className="text-white-50 text-xl-center" id="total"/>
                            </div>
                            <div className="bg-dark">
                                <a id="return" hidden href="/quizzChoice" className="button">Retourner au menu</a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    onLoadPage = () => {

        let url = window.location.pathname;
        let url_info = url.split("/");
        let subject = url_info[2];
        console.log(subject)

        if (subject !== "All")
        {
            Axios.get(`http://localhost:5000/getQuestionBySubject/${subject}`, {

            }).then((res) => {
                let question = [];
                question = res.data;
                this.setState({question: question}, () => {
                    this.setState({length : question.length}, () => {
                        this.onQuestionLoad(question);
                    })
                })
            })
        }
        else
        {
            Axios.get(`http://localhost:5000/getAllQuestion`, {

            }).then((res) => {
                let question = [];
                question = res.data;
                this.setState({question: question}, () => {
                    this.setState({length : question.length}, () => {
                        this.onQuestionLoad(question);
                    })
                })
            })
        }
    }

    onQuestionLoad = (questionList) => {
        console.log("taille de la liste : " + questionList.length)
        this.setState({question : questionList});
        let question = document.getElementById("question");
        let random_question = this.getRandom(this.state.length);
        this.setState({length : this.state.length - 1}, () => {
            this.setState({random : random_question}, () => {
                console.log("taille : " + this.state.length)
                console.log("numéro du random : " + random_question)
                console.log(questionList)
                console.log("question actuelle : " + questionList[random_question].question)

                question.innerHTML = questionList[random_question].question;
                Axios.get(`http://localhost:5000/getGoodAnswerByQuestionID/${questionList[random_question].question_id}`, {

                }).then((res2) => {
                    this.setState({good_answer: res2.data[0].answer},() => {
                        Axios.get(`http://localhost:5000/getBadAnswerByQuestionID/${questionList[random_question].question_id}`, {

                        }).then((res3) => {
                            if ((res3.data).length > 1) {
                                let answer = [res2.data[0].answer, res3.data[0].answer, res3.data[1].answer, res3.data[2].answer];

                                let hidden3 = document.getElementById("answer_3")
                                hidden3.hidden = false;
                                let hidden4 = document.getElementById("answer_4")
                                hidden4.hidden = false;

                                let random_answer_order_1 = this.getRandom(4);
                                let answer1 = document.getElementById("answer_1")
                                answer1.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                                answer1.innerHTML = answer[random_answer_order_1];
                                answer.splice(random_answer_order_1, 1);

                                let random_answer_order_2 = this.getRandom(3);
                                let answer2 = document.getElementById("answer_2")
                                answer2.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                                answer2.innerHTML = answer[random_answer_order_2];
                                answer.splice(random_answer_order_2, 1);

                                let random_answer_order_3 = this.getRandom(2);
                                let answer3 = document.getElementById("answer_3")
                                answer3.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                                answer3.innerHTML = answer[random_answer_order_3];
                                answer.splice(random_answer_order_3, 1);

                                let random_answer_order_4 = this.getRandom(1);
                                let answer4 = document.getElementById("answer_4")
                                answer4.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                                answer4.innerHTML = answer[random_answer_order_4];
                                answer.splice(random_answer_order_4, 1);
                            } else {
                                let answer1 = document.getElementById("answer_1")
                                answer1.innerHTML = "Vrai";
                                answer1.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                                let answer2 = document.getElementById("answer_2")
                                answer2.innerHTML = "Faux";
                                answer2.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                                let answer3 = document.getElementById("answer_3")
                                answer3.hidden = true;
                                answer3.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                                let answer4 = document.getElementById("answer_4")
                                answer4.hidden = true;
                                answer4.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                            }
                            let seconds = questionList[random_question].time
                            let time = document.getElementById("time");

                            let interval = setInterval(() => {
                                if (seconds === 0 )
                                {
                                    clearInterval(interval)
                                }
                                time.innerHTML = "Question suivante dans : " + seconds-- + " secondes";
                            },1000)

                            let timeout = setTimeout(() => {
                                this.timerDone()
                            }, seconds * 1000);

                            this.setState({interval : interval})
                            this.setState({question: questionList});
                            this.setState({timer: timeout});
                        })
                    })
                })
            })
        })
    }

    onClick = (e) => {
        let result = document.getElementById("result");
        let answer1 = document.getElementById("answer_1");
        let answer2 = document.getElementById("answer_2");
        let answer3 = document.getElementById("answer_3");
        let answer4 = document.getElementById("answer_4");
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;

        if (e.target.innerHTML === this.state.good_answer)
        {
            e.target.className = "element-animation1 btn btn-lg btn-success btn-block";
            result.className = "text-success text-center"
            result.innerHTML = "Bien joué tu as la bonne réponse !"
            this.setState({total : this.state.total + 1})
        }
        else
        {
            e.target.className = "element-animation1 btn btn-lg btn-danger btn-block";

            if (answer1.innerHTML === this.state.good_answer)
            {
                answer1.className = "element-animation1 btn btn-lg btn-success btn-block";
            }
            if (answer2.innerHTML === this.state.good_answer)
            {
               answer2.className = "element-animation1 btn btn-lg btn-success btn-block";
            }
            if (answer3.innerHTML === this.state.good_answer)
            {
                answer3.className = "element-animation1 btn btn-lg btn-success btn-block";
            }
            if (answer4.innerHTML === this.state.good_answer)
            {
                answer4.className = "element-animation1 btn btn-lg btn-success btn-block";
            }
            result.className = "text-danger text-center"
            result.innerHTML = "Mauvaise réponse !"
        }
        clearTimeout(this.state.timer)
        clearInterval(this.state.interval)
        setTimeout(() => {
            this.state.question.splice(this.state.random,1)
            if (this.state.length !== 0)
            {
                this.onQuestionLoad(this.state.question)
                answer1.disabled = false;
                answer2.disabled = false;
                answer3.disabled = false;
                answer4.disabled = false;
            }
            else
            {
                this.score();
            }
            result.innerText = ""
        }, 6000);

        this.countDown(5)
    }

    timerDone = () => {
        let result = document.getElementById("result");
        let answer1 = document.getElementById("answer_1");
        let answer2 = document.getElementById("answer_2");
        let answer3 = document.getElementById("answer_3");
        let answer4 = document.getElementById("answer_4");
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;

        if (answer1.innerHTML === this.state.good_answer)
        {
            answer1.className = "element-animation1 btn btn-lg btn-success btn-block";
        }
        if (answer2.innerHTML === this.state.good_answer)
        {
            answer2.className = "element-animation1 btn btn-lg btn-success btn-block";
        }
        if (answer3.innerHTML === this.state.good_answer)
        {
            answer3.className = "element-animation1 btn btn-lg btn-success btn-block";
        }
        if (answer4.innerHTML === this.state.good_answer)
        {
            answer4.className = "element-animation1 btn btn-lg btn-success btn-block";
        }
        result.className = "text-danger text-center"
        result.innerHTML = "Temps écoulé voila la bonne réponse :" + this.state.good_answer
        setTimeout(() => {
            this.state.question.splice(this.state.random,1)
            if (this.state.length !== 0)
            {
                this.onQuestionLoad(this.state.question)
                answer1.disabled = false;
                answer2.disabled = false;
                answer3.disabled = false;
                answer4.disabled = false;
            }
            else
            {
                this.score();
            }
            result.innerText = ""
        }, 6000);

        this.countDown(5)
    }

    score = () => {
        console.log("test finis")
        let total = document.getElementById("total");
        let noteTotal = this.state.length + 1
        total.innerHTML = "ton score est : " + this.state.total + " / " + noteTotal;
        document.getElementById("return").hidden = false;
    }

    getRandom(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    countDown(seconds) {
        let time = document.getElementById("time");
        for (let c = 5; c > 0; c--)
        {
            setTimeout( () => {
                let variable = 5 - c;
                if (c > 0)
                {
                    time.innerHTML = "Question suivante dans : " + variable + " secondes";
                }
            },c*1000)
        }
    }
}
export default Quizz
