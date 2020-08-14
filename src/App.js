import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils'

import './App.css';

import Homepage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component'


class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user});
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return(    
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Homepage} /> 
          <Route path='/shop' component={ShopPage} />
          <Route path='/sign-in' component={SignInAndSignUpPage} />
        </Switch>
        
      </div>  
    );
  }
}
 
export default App;
