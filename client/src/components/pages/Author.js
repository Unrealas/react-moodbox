import React from 'react';
import axios from 'axios';

class Author extends React.Component {

    state = {
        firstname: '',
        lastname: '',
        email: '',
    };

    componentDidMount = async () => {
        // req to node , after res - update state
        const res = await axios.get('/api/users/' + this.props.match.params.id);
        console.log(res.data);
        const {firstname,lastname,email}= res.data[0];
        this.setState({firstname,lastname,email});
    };

    render() {
        if(!this.state.firstname) return <div>Loading user...</div>;
        return (
            <div className='Author'>
                <h1>{this.state.firstname} {this.state.lastname}</h1>
                <h2>{this.state.email}</h2>
            </div>
        )
    }
}

export default Author