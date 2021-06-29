import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import Target from './Target';
import Card from './Card';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
const update = require('immutability-helper');

class App extends Component {
  state = {
    items: [
      { id: 1, name: 'Dialog 1' },
      { id: 2, name: 'Dialog 2' },
      { id: 3, name: 'Dialog 3' },
      { id: 4, name: 'Dialog 4' },
    ],
    cards: [
      {
        id: 1,
        text: 'Hello!',
      },
      {
        id: 2,
        text: 'Welcome to React trial development',
      },
      {
        id: 3,
        text: 'Above we have various dialogues which can be dragged',
      },
      {
        id: 4,
        text: 'I can be dragged too',
      },
      {
        id: 5,
        text:
          'Hope you liked the trial dev',
      },
      {
        id: 6,
        text: 'Thank you',
      },
      {
        id: 7,
        text: 'Bye!',
      },
    ],
  }

  deleteItem = id => {
    this.setState(prevState => {
      return {
        items: prevState.items.filter(item => item.id !== id)
      }
    })
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React Trial Dev 🗂</h1>
        </header>
        <div className="App-intro">
          <div className="app-container">
            <div className="item-container">
              {this.state.items.map((item, index) => (
                <Item key={item.id} item={item} handleDrop={(id) => this.deleteItem(id)} />
              ))}
            </div>

            <Target />
          </div>
          <div className="card-container">
            {this.state.cards.map((card, i) => (
              <Card
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
                moveCard={this.moveCard}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);