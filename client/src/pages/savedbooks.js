import React, { Component } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron'
import API from "../utils/API";
import Container from 'react-bootstrap/Container'
import {Link} from "react-router-dom";
import {List} from "../components/list";
import {ListItem} from "../components/listitems";

class savedbooks extends Component {
    state = {
        books: [],
        target: "",
        noResults: false
    };

    componentDidMount() {
        this.getsavedbooks();
    }

    getsavedbooks = () => {
        API.getsavedbooks()
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        books: res.data,
                        target: "blank"
                    });
                } else {
                    this.setState({
                        noResults: true
                    });
                }
            })

            .catch(err => (err));
    }

    render() {
        if (this.state.noResults) {
            return (
                <Container fluid>
                    <Jumbotron fluid>
                        <Container>
                            <h1>Google Book Search</h1>
                            <p>
                                Search and save your favorite books titles!
    </p>
                        </Container>
                    </Jumbotron>
                    <Link to="/">There are no books saved </Link>
                </Container>
            )
        }

        return (
            <Container fluid>
                <Jumbotron fluid>
                    <Container>
                        <h1>Google Book Search</h1>
                        <p>
                            Search and save your favorite books titles!</p>
                            <Link className="btn btn-default btn-lg" to="/" role="button">New Search</Link>
                            <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Books</Link>
                    </Container>
                </Jumbotron>
                <h2>SavedBooks!</h2>
                <List>
                    {this.state.books.map(book => (
                        <ListItem key={book._id}>
                            <a key={book._id + "link"}
                                href={book.link}
                                target={this.state.target}>

                                {book.title}
                            </a>
                            <p>Written By {book.author}</p>
                            <p>
                                <img align="left" style={{ paddingRight: 10 }}
                                    src={book.image} alt="new"
                                />
                                {book.description}
                            </p>
                        </ListItem>
                    ))}
                </List>
            </Container>

        );
    }
}

export default savedbooks;