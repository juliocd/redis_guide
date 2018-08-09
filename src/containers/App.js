import React, { Component } from 'react';
import classes from'./App.css';
import Persons from '../components/Persons/Persons';
import Radium, {StyleRoot} from 'radium'
import Cockpit from '../components/Cockpit/Cockpit'

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

    let persons = null;
    if(this.state.showPersons){
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.changeNameHandler} />
      );
    }

    return (
      <StyleRoot>
        <div className={classes.App}>
          <Cockpit
            appTitle={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonHandler} />
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
