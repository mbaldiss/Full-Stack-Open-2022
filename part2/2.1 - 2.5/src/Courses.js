let count = 0;
const randomKey = () => {
    return count++;
}

const Header = props => <h1>{props.name}</h1>;

const Part = props => <p>{props.part.name} {props.part.exercises}</p>;

const Content = props => props.parts.map(part => <Part key={randomKey()} part={part}/>);

const Total = (props) => {
/* 
  let plus = 0;
  props.total.map(part => {
    return plus += part.exercises
  });
 */
  let prev = 0;
  let  plus_ = props.total.reduce(
    (previous, current) => {
      if(previous.exercises !== undefined) {
        prev += previous.exercises;
      }
      prev += current.exercises;
      return prev;
    }
  );
  return <b>total of {plus_} exercises</b>;
};

const Course = props => {
  return (
    <div>
            {props.courses.map(course => {
                    return (
                        <div key={randomKey()}>
                            <Header key={randomKey()} name={course.name}/>
                            <Content key={randomKey()} parts={course.parts}/>
                            <Total key={randomKey()} total={course.parts}/>
                        </div>
                        )})}
    </div>  
        )
    }

export default Course;