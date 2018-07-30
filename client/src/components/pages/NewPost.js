import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

class NewPost extends React.Component{
    state ={
        title:'',
        content:'',
        file:''
    };

    onInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        // send data
        try{
            // Formdata manually
            const formData = new FormData();
            formData.append('title', this.state.title);
            formData.append('content', this.state.content);
            formData.append('postimg', this.state.file);

            await axios.post('/api/posts', formData);
            this.props.history.push('/');

        }catch (e) {
            console.log(e.response);
        }
    };

    onDrop= (files) => {
        this.setState({
            file:files[0]
        });
    };



    render(){
        return(
        <div className='NewPost'>
            <h1>Create new Post</h1>
            <form onSubmit={this.onFormSubmit}>
                <input
                    value={this.state.title}
                    onChange={this.onInputChange}
                    name="title"
                    type="text"
                    placeholder='Post title'
                />
                <textarea
                    value={this.state.content}
                    onChange={this.onInputChange}
                    placeholder="Post Content"
                    name="content"
                />
                <div className="dropzone">
                    <Dropzone
                        className="post-image"
                        style={{backgroundImage:`url(${this.state.file.preview})`}}
                        onDrop={this.onDrop}>
                        <p>Post image</p>
                    </Dropzone>
                </div>
                <button>Create Post</button>
            </form>
        </div>
        )
    }
}

export default NewPost