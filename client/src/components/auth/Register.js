import React from 'react';
import * as actions from '../../actions/authAction';
import {connect} from 'react-redux';


class Register extends React.Component {

    state={
        email:'',
        firstname:'',
        lastname:'',
        password:'',
        password2:'',
        errors:{},
    };

    onInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };

    register = (e) => {
        e.preventDefault();
        const errors = {};
        if (this.state.password!==this.state.password2){
            errors.password='Password doesn\'t match';
            return this.setState({errors})
        }
        this.setState({errors:{}});

        this.props.register(this.state , this.props.history)
    };

    render() {
        const {errors}=this.props;
        return (
            <div className='Register-Login'>
                <form onSubmit={this.register}>
                    <input type="email"
                           placeholder="Email"
                           value={this.state.email}
                           onChange={this.onInputChange}
                           name='email'/>
                    {errors.email && <span>{errors.email}</span>}
                    <input type="text"
                           placeholder="First Name"
                           value={this.state.firstname}
                           onChange={this.onInputChange}
                           name='firstname'/>
                    {errors.firstname && <span>{errors.firstname}</span>}
                    <input type="text"
                           placeholder="Last Name"
                           value={this.state.lastname}
                           onChange={this.onInputChange}
                           name='lastname'/>
                    {errors.lastname && <span>{errors.lastname}</span>}
                    <input type="password"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.onInputChange}
                           name='password'/>
                    {errors.password && <span>{errors.password}</span>}
                    <input type="password"
                           placeholder="Confirm Password"
                           value={this.state.password2}
                           onChange={this.onInputChange}
                           name='password2'/>
                    {errors.password && <span>{errors.password}</span>}
                    <button>Register</button>
                </form>
                {this.state.errors.password && <span>{this.state.errors.password}</span>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        errors:state.errors
    }
};

export default connect(mapStateToProps, actions)(Register)