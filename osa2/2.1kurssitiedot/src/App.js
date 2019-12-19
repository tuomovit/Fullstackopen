import React from 'react';
import './App.css';


const Header = ({ course }) => (
  <div>
   <h1>{course.name}</h1>
  </div>
)


// En saanut tätä .map funktiolla tunninkaan jälkeen toimimaan, joten päätin tehdä forilla.
// Pelittää testailun mukaan samalla tavalla vaikka kurssimäärää kasvattaisi
const Content = ({ course }) => {
  
  var courses = [];
  
  for (let x in course) {
    courses.push(<h2 key={x}>{course[x].name}</h2>)


    for (let a in course[x].parts) {
    courses.push(<p key={x+a}>{course[x].parts[a].name}</p>)
    
    }

    var summa = (course[x].parts.map(part => part.exercises).reduce((id, currentValue) => id + currentValue )); 
    courses.push(<b key={x + summa}>Total of {summa} exercises</b>)
  
  }

  console.log(courses)
  

return (
  <div>
  <ul>
 {courses}




  </ul> 
  </div>
)
}

const Course = ({course}) => {

return (

  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
  )
}








const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course course={courses} />
    </div>
  )
}

export default App;
