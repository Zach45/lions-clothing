import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

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

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot( Snapshot => {
          this.setState({
            currentUser: {
              id: Snapshot.id,
              ...Snapshot.data()
            }
          });
        })
      }
      else{
        this.setState({currentUser: userAuth});
      }

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
