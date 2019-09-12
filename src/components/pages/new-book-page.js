import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import SearchBookForm from '../forms/search-book-form';
import BookForm from '../forms/book-form';

class NewBookPage extends Component {

  state = {
    book: null
  };

  onBookSelect = book => {
    this.setState({
      book
    });
  };

  addBook = () => console.log('hi');

  render() {
    return(
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />

        {this.state.book && (
          <BookForm submit={this.addBook} book={this.state.book} />
        )}
      </Segment>
    );
  }
}

export default NewBookPage;
