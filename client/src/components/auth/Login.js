import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/authAction';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };

    onInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state, this.props.history)
    };

    render() {
        return (
            <div className='Register-Login'>
                {this.props.auth.message &&
                <div className='message'>{this.props.auth.message}</div>}
                <form onSubmit={this.onFormSubmit}>
                    <input
                        autoComplete="new-email"
                        type="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onInputChange}
                        name='email'/>
                    <input
                        autoComplete="new-password"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                        name='password'/>

                    <button>Login</button>
                    {this.props.errors.message &&
                    <div className="message">{this.props.errors.message}</div>
                    }
                </form>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth:state.auth,
        errors:state.errors
    }
};

export default connect (mapStateToProps, actions) (Login)