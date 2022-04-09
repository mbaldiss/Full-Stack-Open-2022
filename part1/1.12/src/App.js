import { useState } from "react";

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

function App() {

  const [{anecdote, votes}, nextAnecdote] = useState({
    anecdote: 0,
    votes: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
  })

  const selectAnecdote = () => {
    let randomAnecdote =  Math.floor((anecdotes.length) * Math.random());
    nextAnecdote({anecdote: randomAnecdote, votes: {...votes}});
  }

  let copyVotes = {...votes};

  const voteAnecdote = () => {
    copyVotes[anecdote]++;
    nextAnecdote({anecdote: anecdote, votes: {...copyVotes}})
    console.log(votes)
  }

  const most = () => {
    let aux = 0;
    let index = -1
    for(let i in votes){
      if(votes[i] > aux){
        aux = votes[i];
        index = i;
      }
    }
    return [aux, index]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[anecdote]}
      <br />
      has {votes[anecdote]} votes
      <br />
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={selectAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[most()[1]]}<br /> 
      has {votes[most()[1]]} votes
    </div>
  );
}

export default App;
