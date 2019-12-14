import React from 'react';
import firebase from 'firebase/app';
import firebaseConnection from '../helpers/data/connection';
import './App.scss';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import BoardsContainer from '../components/BoardsContainer/BoardsContainer';

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <MyNavbar authed={authed}/>
        <button className='btn btn-danger'>HELP ME</button>
      {
        (authed) ? (<BoardsContainer />) : (<Auth />)
      }
      </div>
    );
  }
}

export default App;
