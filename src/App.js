import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import './App.css';

import Homepage from './pages/homepage/homepage.component';



class App extends Component {


  render(){
    return(    
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} /> 
          <Route path='/shop' component={ShopPage} />
        </Switch>
        
      </div>  
    );
  }
}
 
export default App;
