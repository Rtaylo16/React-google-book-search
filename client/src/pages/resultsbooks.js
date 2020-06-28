import React, { Component } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';

import API from "../utils/API";
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { List } from "../components/list";
import { ListItem } from "../components/listitems";
import  BookBtn  from "../components/Bookbtn";



class resultsbooks extends Component {

    state = {
        books: [],
        target: "",
        noResults: false
    };

    componentDidMount() {
        const data = this.props.location.data
        if (data && data.results.length > 0) {

            this.setState({
                books: data.results.filter((value, index) => index < 5),
                target: "_blank"
            });
        } else {
            this.setState({
                noResults: true
            });
        }
    }

    saveBook = book => {
        API.saveBook(book)
            .then(res => {
                const currentBooks =
                    this.state.books;
                const filterBooks =
                    currentBooks.filter(book => book.id !== res.data.id);
                this.setState({
                    books: filterBooks
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.noResults) {
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
                <h2>Results</h2>
                <List>
                    {this.state.books.map((book, index) => (
                        <ListItem key={book.id}>
                            <a key={"" + index + book.id}
                                href={book.volumeInfo.infoLink}
                                target={this.state.target}>

                                {book.volumeInfo.title}
                            </a>
                            <p>Written By {book.volumeInfo.authors[0]}</p>
                            <p>
                                <img align="left" style={{ paddingRight: 10 }}
                                    src={book.volumeInfo.imageLinks.smallThumbnail} alt="new"
                                />
                                {book.volumeInfo.description}
                            </p>

                    <BookBtn
                    key={"" + book.id + index}
                    btntype="info"
                    disabled={book.volumeInfo.infoLink === "/"}
                    onClick={() => this.saveBook({
                      title: book.volumeInfo.title,
                      author: book.volumeInfo.authors[0],
                      description: book.volumeInfo.description,
                      image: book.volumeInfo.imageLinks.smallThumbnail,
                      link: book.volumeInfo.infoLink,
                      _id: book.id
                    })}>
                    Save
                  </BookBtn>
                        </ListItem>
                    ))}
                </List>
            </Container>

        );





    }









}

export default resultsbooks;