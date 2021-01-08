import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/style.css";
import Axios from "axios";

export class Quizz extends Component {

    constructor(props) {
        super(props)

        this.state = {
            good_answer : "",
            timer : ""
        }
        this.onLoadPage();
    }

    render() {
        return (
            <React.Fragment>

                <div className="container-fluid">
                    <div className="modal-dialog">
                        <div className="modal-content">
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
                                <p id="result"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    onLoadPage = () => {
        Axios.get(`http://localhost:5000/getAllQuestion`, {

        }).then((res) => {
            let random_question = this.getRandom((res.data).length);
            console.log(random_question)
            Axios.get(`http://localhost:5000/getGoodAnswerByQuestionID/${res.data[random_question].question_id}`, {

            }).then((res2) => {
                this.setState({good_answer: res2.data[0].answer},() => {
                    Axios.get(`http://localhost:5000/getBadAnswerByQuestionID/${res.data[random_question].question_id}`, {

                    }).then((res3) => {
                        let question = document.getElementById("question");
                        question.innerHTML = res.data[random_question]["question"];

                        if ((res3.data).length > 2)
                        {
                            let answer = [res2.data[0].answer,res3.data[0].answer,res3.data[1].answer,res3.data[2].answer];

                            let hidden3 = document.getElementById("answer_3")
                            hidden3.hidden = false;
                            let hidden4 = document.getElementById("answer_4")
                            hidden4.hidden = false;

                            let random_answer_order_1 = this.getRandom(4);
                            let answer1 = document.getElementById("answer_1")
                            answer1.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                            answer1.innerHTML = answer[random_answer_order_1];
                            answer.splice(random_answer_order_1,1);

                            let random_answer_order_2 = this.getRandom(3);
                            let answer2 = document.getElementById("answer_2")
                            answer2.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                            answer2.innerHTML = answer[random_answer_order_2];
                            answer.splice(random_answer_order_2,1);

                            let random_answer_order_3 = this.getRandom(2);
                            let answer3 = document.getElementById("answer_3")
                            answer3.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                            answer3.innerHTML = answer[random_answer_order_3];
                            answer.splice(random_answer_order_3,1);

                            let random_answer_order_4 = this.getRandom(1);
                            let answer4 = document.getElementById("answer_4")
                            answer4.className = "element-animation1 btn btn-lg btn-dark btn-block btn-outline-light";
                            answer4.innerHTML = answer[random_answer_order_4];
                            answer.splice(random_answer_order_4,1);
                        }
                        else
                        {
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
                        let timeout  = setTimeout(this.timerDone,(res.data[random_question]["time"])*1000)

                        this.setState({timer : timeout});
                    })
                })
            })
        })
    }

    onClick = (e) => {
        console.log(e.target.innerHTML)
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
        setTimeout(() => {
            this.onLoadPage()
            answer1.disabled = false;
            answer2.disabled = false;
            answer3.disabled = false;
            answer4.disabled = false;
            result.innerText = ""
        }, 5000);
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
            this.onLoadPage()
            answer1.disabled = false;
            answer2.disabled = false;
            answer3.disabled = false;
            answer4.disabled = false;
            result.innerText = ""
        }, 5000);
    }

    getRandom(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
export default Quizz
