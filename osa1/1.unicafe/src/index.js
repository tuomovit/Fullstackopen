import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
  
    const settoGood = newValue => {
      setGood(newValue)
    }

    const settoNeutral = newValue => {
        setNeutral(newValue)
      }

      const settoBad = newValue => {
        setBad(newValue)
      }

    const Button = (props) => (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )

    
      const palaute = {
        good: good,
        neutral: neutral,
        bad: bad,
        }
  
    return (
      <div>
        
        <h2>give feedback</h2>

        <Button handleClick={() => settoGood(good + 1)} text="good"/>
        <Button handleClick={() => settoNeutral(neutral + 1)} text="neutral"/>
        <Button handleClick={() => settoBad(bad + 1)} text="bad"/>
        
         <h2>statistics</h2>
         
        <Statistics props={palaute}/>

      </div>
    )
  }

  const Statistics = ({props}) => {

    const { good, neutral, bad } = props
    const keskiarvo = (good - bad) / (good + neutral + bad)
    const positiivisia = ((good) / (good + neutral + bad)) * 100
    const kaikki = good + neutral + bad

    if (good + neutral + bad === 0) {
      return <p>No feedback given</p>
    } 

    else return (
    <div>
      
      <table>
        <tbody>
        <Statistic text="good" value ={good} />
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value ={bad} />
        <Statistic text="all" value ={kaikki} />
        <Statistic text="average" value ={keskiarvo} />
        <Statistic text="positive" value ={positiivisia + " %"} />
        </tbody>  
      </table>  
                       
    </div>
    )  
  }

  const Statistic = (props) => {
    const {text, value} = props

    return (<tr><td>{text} {value}</td></tr>)
  }

 
ReactDOM.render(
  <App />, 
  document.getElementById('root')
)





