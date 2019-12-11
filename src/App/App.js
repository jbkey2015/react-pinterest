import React from 'react';
import firebase from 'firebase/app';
import firebaseConnection from '../helpers/data/connection';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../components/Auth/Auth';

firebaseConnection.firebaseApp();

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
        <button className='btn btn-danger'>HELP ME</button>
      {
        (authed) ? (<div>You loggine in</div>) : (<Auth />)
      }
      </div>
    );
  }
}

export default App;
