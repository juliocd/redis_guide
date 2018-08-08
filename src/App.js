import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import Radium, {StyleRoot} from 'radium'

class App extends Component {
  state = {
    persons : [
      {id: 'rer', name : "Ana", age: 12},
      {id: 'sasdf', name : "Carlos", age: 32},
      {id: 'yhtyh', name : "Julian", age: 22}
    ],
    showPersons: false
  } 

  switchNameHandler = (newName) => {
    // DON'T DO THIS: this.state.persons[0].name = "Max"
    this.setState({
      persons : [
        {name : newName, age: 12},
        {name : "Carlos", age: 32},
        {name : "Julio", age: 22}
      ]
    })
  }

  changeNameHandler = (event, id) => {
    const indexPerson = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    const person = {
      ...this.state.persons[indexPerson]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[indexPerson] = person;
    this.setState({persons : persons})
  }

  deletePersonHandler = (indexPerson) => {
    // const persons = this.state.persons; Bad practice, istead of create a copy
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(indexPerson, 1);
    this.setState({persons: persons});
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={this.deletePersonHandler.bind(this, index)}
            name={person.name} 
            age={person.age}
            key={person.id}
            changed={(event) => this.changeNameHandler(event, person.id)} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working</p>
          {/* working but waste resources */}
          {/* <button style={style} onClick={() => this.switchNameHandler('Yeral')}>Switch name</button> */}
          <button style={style} onClick={this.togglePersonHandler}>Switch name</button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
