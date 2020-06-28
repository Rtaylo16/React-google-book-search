
import React, { Component } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron'
import API from "../utils/API";
import Container from 'react-bootstrap/Container'
import {  Redirect } from "react-router-dom";
import { Input} from "../components/input";
import { FormBtn } from "../components/Formbtn";
import {Link} from "react-router-dom";

class searchbooks extends Component{
state = {
title: "",
toResults: false,
results: []
};

handleInputChange = event => {
    const {name,value} = event.target;
    this.setState({
    [name]: value 
    });
};

handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title){
        const title = this.state.title.trim();

        API.getBooks(title)
        .then(res =>{

    
            this.setState({
                toResults: true,
                results: res.data.items
            });

            
        })
        
        .catch(err => console.log(err));
   
    } 
    
};

render(){
if (this.state.toResults){
    return <Redirect to={{
        pathname: "/results",
        data :{ results: this.state.results}
    }} />
}
return (
<Container fluid>
<Jumbotron fluid>
  <Container>
    <h1>Google Book Search</h1>
    <p>
      Search and save your favorite books titles!
    </p>
    <Link className="btn btn-default btn-lg" to="/" role="button">New Search</Link>
    <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Books</Link>
  </Container>
</Jumbotron>
<Container>
<form>
    <Input
    value={this.state.title}
    onChange={this.handleInputChange}
    name="title"
    label="Book Title"
    placeholder="Search Book Title(required)"
    />
        <FormBtn         
              onClick={this.handleFormSubmit}
              className="btn btn-info">
              Search
            </FormBtn>
</form>
</Container>
</Container>

);

}

}

export default searchbooks;



