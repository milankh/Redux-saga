import React from 'react';
import '../App.css';
import { connect } from 'react-redux';

class Posts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            posts:[],
            inputField: '',
            textareaField: ''
        }
    }


    handleInputOnChange = (e) => {
        this.setState({
            inputField: e.target.value,
        })
    }


    handleTextareaOnChange = (e) => {
        this.setState({
            textareaField: e.target.value,
        })
    }

    //This is not working, gotta work on this
    handleOnSubmit = (e) => {
        e.preventDefault();
        this.addPosts({
            title: 'new title'
        })
    }

    addPosts(data) {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };
        
        return fetch('https://jsonplaceholder.typicode.com/todos/', options)
        .then(response => this.state.posts.unshift([data])
        )

    }

    fetchAllPosts() {
        fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response => response.json())
        .then(data => this.setState({posts:data}))
    }

    componentDidMount(){
        this.fetchAllPosts();        
    }

    render(){
        return(
            <div className="posts-div">
            <h3>Create your own post</h3>
                <form action="POST" onSubmit={this.handleOnSubmit}>
                    <label htmlFor="postTitle">Post Title:</label>
                    <input onChange= {this.handleInputOnChange} type="text" name="postTitle" value={this.state.inputField}/>

                    <label htmlFor="postDetails">Post Details: </label>
                    <textarea onChange={this.handleTextareaOnChange} type="text" name="postDetails" value={this.state.textareaField}/>

                    <button type="submit" value="submit">Submit</button>
                </form>

                <h3>Recent Posts</h3>
                    <ol>
                    {this.state.posts.map((post) => (
                        <li key={post.id} style={{backgroundColor:"lightgray", color:"green"}}>
                
                    <p>{post.title} {post.completed ? <span className="done"> Done</span> : <span className="not-done">Not Done</span>}</p>  
                        </li>
                ))}
                 </ol>

                
            </div>
        );
    }
}



export default Posts 