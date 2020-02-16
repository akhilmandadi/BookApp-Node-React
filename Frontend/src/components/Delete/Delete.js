import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';

class Delete extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
        this.state = {
            redirectVar: null,
            errorMessage: null,
        }
    }
    handleDeleteBook = (event) => {
        axios.post('http://localhost:3001/delete', {
            bookId: event.target.elements.BookID.value,
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
                    errorMessage: "Book with Entered Id doesnt exist"
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
            <div  class="container">
                <div class="container">
                    {this.state.redirectVar}
                    <form onSubmit={this.handleDeleteBook}>
                        <div style={{ width: "30%", float: "left" }} class="form-group">
                            <input type="number" class="form-control" name="BookID" placeholder="Search a Book by Book ID" autoFocus/>
                        </div>
                        <div style={{ width: "50%", float: "left" }}>
                            <button class="btn btn-success" type="submit">Delete</button>
                        </div>
                    </form>
                </div>
                <div  class="container">
                    <br />
                <p style={{"color": "red", "text-align" : "center","font-style": "oblique","font-weight": "bold"}}>{this.state.errorMessage}</p>
                </div>
            </div>
        )
    }
}

export default Delete;