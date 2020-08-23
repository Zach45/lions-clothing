import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux';
import './App.css';
import { setCurrentUser } from './redux/user/user.action'

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
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot( Snapshot => {
          setCurrentUser ({
              id: Snapshot.id,
              ...Snapshot.data()
            })
        })
      }
      else{
        setCurrentUser(userAuth);
      }

    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return(    
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} /> 
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/sign-in' render={() => this.props.currentUser? (<Redirect to='/' />) : (<SignInAndSignUpPage />) } />
        </Switch>
        
      </div>  
    );
  }
}
const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchTOProps = dispach => ({
  setCurrentUser: user => dispach(setCurrentUser(user))
})
 
export default connect(mapStateToProps, mapDispatchTOProps)(App);
