import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { SignInWithGoogle, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends Component{
    constructor(props) {
        super();

        this.state = {
            email:'',
            password:''
        }
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value});
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email:'', password:''})
    }

    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" handleChange={this.handleChange} label="email" value={this.state.email} />
                    
                    <FormInput name="password" type="password" handleChange={this.handleChange} label="password" value={this.state.password} />
                    
                    <div className="button">
                        <CustomButton type="submit"> sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn > sign in with Goolge </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }

}

export default SignIn;