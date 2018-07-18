import React, { Component } from 'react';
import './Quiz.css';


class Question extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      answer: null
    }
  }
  handleChangeRadio(event) {
    this.setState({
      answer: event.target.value,
    })    
  }
  handleQuestionAnswer() {
    this.props.onOptionChoice(this.state.answer);
  }


  render() {
    const title = this.props.questionText;
    const options = this.props.questionOptions;

    return (
      <div className="question">
        <h3 className="question-title">{title}</h3>
        <ul className="question-options">
          {options.map((opt, j) => 
            <li key={j}>
              <input
                type="radio"
                id={"radio"+this.props.step+j}
                value={opt.is_right}
                name={"radio"+this.props.step}                
                onChange={this.handleChangeRadio.bind(this)} />
              <label htmlFor={"radio"+this.props.step+j}>{opt.value}</label>
            </li> 
          )}
        </ul>

          <button className="btn" onClick={this.handleQuestionAnswer.bind(this)}>
            { (this.props.step === this.props.amount-1) ? "Results" : "Next"}
          </button>

      </div>
    );
  }
}



class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      quiz_data: null,
      user_answers:[],
      step: 0
    };
  }
  writeDownAnswer(answer){
    let answers = this.state.user_answers;
    answers.push(answer);    
    this.setState({
      user_answers: answers,
      step: this.state.step + 1
    })
    console.log(this.state.user_answers)
  }
  componentDidMount() {
    // v1 fetch
    // fetch('data.json')
    //   .then(res => { return res.json() })
    //   .then(res => { this.setState({ quiz_data: res}) });

    // v2 ajax
    var req  = new XMLHttpRequest();
    req.open('GET', 'data.json');
    req.addEventListener('load', () => {
      var parsed = JSON.parse(req.responseText);
      if (parsed.error){
        console.log('error '+ parsed.error)
        return;
      }
      this.setState({
        quiz_data: parsed
      })
    });
    req.send();
  }

  render() {
    if (this.state.quiz_data) {
      var questions = this.state.quiz_data.questions;

      return (
        <section className="quiz">          
          <h2>{this.state.quiz_data.title}</h2>

          { (this.state.step !== questions.length) ?
            <div className="quiz-questions">
              {questions.filter((el, i) => i === this.state.step).map((el, i) => 
                <Question 
                  key={i}
                  step={this.state.step}
                  questionText={el.question}
                  questionOptions={el.answers}
                  onOptionChoice={this.writeDownAnswer.bind(this)}
                  amount={questions.length}
                />              
              )}
            </div>
          : 
            <div className="quiz-results">
              <ul>
              {this.state.user_answers.map((el, i) => 
                <li key={i}>Вопрос №{i+1} - ответ { (String(el) === "true") ? 'правильный' : 'неправильный' }</li>
              )}
              </ul>
            </div>
          }
        </section>
      )
    }
    else {
      return <div>Loading...</div>
    }
  }
}

export default Quiz;
