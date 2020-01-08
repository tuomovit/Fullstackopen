import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  
  const vaihda = () => {

    var min = 0; 
    var max = anecdotes.length;  
    var random = Math.floor(Math.random() * (max - min)) +min; 
      
    setSelected(random)
    console.log("valittu" + selected)
    
 
  }  
  
  const vote = (selected) => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  }




  const enitenAania = () => {
  
    var max = 0;  
    var indeksi = 0;
    var i = 0;
    var length = votes.length;
    

for (; i < length; ) {
  
  if (votes[i] > max){
    max = votes[i]
    indeksi = i;
  } 

  i++;
}

   console.log("eniten aania indeksilla" + indeksi)
    if (max === 0) return null; else return indeksi
  }


  return (
    <div>
      <h3>Anecdote of the day</h3>
      <div>{props.anecdotes[selected]}</div>
      <p>has {votes[selected]} votes</p>
      <button onClick={vaihda}>
        Vaihda anekdoottia!
      </button>
      <button onClick={() => vote(selected)}>
        Anna ääni!
      </button>
      
  
  <h3>Anecdotes with most votes</h3>
  {props.anecdotes[enitenAania()]}
    </div>
    
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
