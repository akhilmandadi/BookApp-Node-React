import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';

class Create extends Component {
    constructor(props) {
        super(props);
        this.handleCreateBook = this.handleCreateBook.bind(this);
        this.state = {
            redirectVar: null,
            errorMessage: null,
        }
    }
    handleCreateBook = (event) => {
        axios.post('http://localhost:3001/create', {
            bookId: event.target.elements.BookID.value,
            title: event.target.elements.Title.value,
            author: event.target.elements.Author.value
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        redirectVar: <Redirect to="/home" />
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    errorMessage: "Book with Id already exists. Input a different Id"
                });
            });
        event.preventDefault();
    }
    render() {
        if (!cookie.load('cookie')) {
            this.setState({
                redirectVar: <Redirect to="/login" />
            });
        }
        return (
            <div>
                <div>
                    {this.state.redirectVar}
                    <br />
                    <div class="container">
                        <form onSubmit={this.handleCreateBook}>
                            <div style={{ width: '30%' }} class="form-group">
                                <input type="number" class="form-control" name="BookID" placeholder="Book ID" autoFocus />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                <input type="text" class="form-control" name="Title" placeholder="Book Title" title="Should be more than 5 characters" pattern=".{5,}" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                <input type="text" class="form-control" name="Author" placeholder="Book Author" title="Should be more than 5 characters" pattern=".{5,}" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }}>
                                <button class="btn btn-success" type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="container">
                    <br />
                    <p style={{ "color": "red", "text-align": "center", "font-style": "oblique", "font-weight": "bold" }}>{this.state.errorMessage}</p>
                </div>
            </div>
        )
    }
}

export default Create;