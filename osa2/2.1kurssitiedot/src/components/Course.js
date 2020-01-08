import React from "react";

const Content = ({ course }) => {

	const parts = course.parts
	const rivit  = () => parts.map(part =>
		<Part key={part.id} name={part.name} exercises={part.exercises}/>
	)

	return (
		<>
		{rivit()}
		</>
	)
}

const Part = (props) => {
    return (<p>{props.name} {props.exercises}</p>);
};

const Total = ({ course }) => {

	const parts = course.parts
    const total = parts.reduce((summa,thisPart) => {
    return summa + thisPart.exercises;
    },0);
  
      return (<h5>Number of exercises {total}</h5>);
};

const Header = ({ course }) => (
  <div>
   <h2>{course.name}</h2>
  </div>
)

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};




export default Course;