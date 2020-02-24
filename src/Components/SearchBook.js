import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './Bookshelf'

export default class SearchBook extends Component {
  constructor(){
    super();
    this.state = {
      query:'',
      books:[]
    }
  }
  parseBooksForShelf = (books) => {
    const { savedBooks } = this.props.location.state;
      books.forEach((book) => {
      savedBooks.forEach((savedBook) => {
        if(book.id === savedBook.id){
          book.shelf = savedBook.shelf;
        }
      })
    });
  }
  searchQuery = (query) => {
    query = query.trim()
    if(query.length > 0){
      BooksAPI.search(query).then((books) => {
        if(books.length > -1){
          this.parseBooksForShelf(books);
          this.setState({
            books
          });
        }
      });
    }
    this.setState({
      books:[]
    });
  }

  updateShelf = (shelf, book) => {
    BooksAPI.update(book, shelf);
  }
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
              <button className="close-search">Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                <input  
                  type="text" 
                  placeholder="Search by title or author" 
                  onChange={(event) => this.searchQuery(event.target.value)}/>
              </div>
            </div>
            { this.state.books.length > 0 && (
            <div className="search-books-results">
            <BookShelf 
                    books={this.state.books}
                    shelfSelected={this.updateShelf} 
                    sectionTitle="Searched Books"/>
            </div>
            )}
          </div>
        )
    }
}
