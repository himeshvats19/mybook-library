import React, { Component } from 'react'
import BookShelf from './Bookshelf'
import * as BooksAPI from '../BooksAPI'

export default class ListBooks extends Component {
    state = {
        books:[],
        currentlyReading: [],
        wantToRead: [],
        read: []
    }
    componentDidMount(){
        BooksAPI.getAll().then((books) => {
          const currentlyReading = books.filter( book => {
            return book.shelf === "currentlyReading"
                ;
          });
          const wantToRead = books.filter( book => {
              return book.shelf === "wantToRead";
          });
          const read = books.filter( book => {
              return book.shelf === "read";
          });
          this.setState({
            books,
            currentlyReading,
            wantToRead,
            read
          })
        })
    }

    getBookFromId = (bookIdToParse) => {
        return this.state.books.filter(book => {
            return bookIdToParse.some((id) => {
                return book.id === id;
            });
        })
    }
    

    updateShelf = (shelf, book) => {
        BooksAPI.update(book, shelf).then((bookIds) => {
            const { currentlyReading, wantToRead, read } = bookIds;
            this.setState({
                currentlyReading : this.getBookFromId(currentlyReading),
                wantToRead : this.getBookFromId(wantToRead),
                read : this.getBookFromId(read)
              })
          });
    }

    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                    books={this.state.currentlyReading}
                    shelfSelected={this.updateShelf} 
                    sectionTitle="Currently Reading"/>
                <BookShelf 
                    books={this.state.wantToRead}
                    shelfSelected={this.updateShelf}  
                    sectionTitle="Want To Read"/>
                <BookShelf 
                    books={this.state.read}
                    shelfSelected={this.updateShelf}  
                    sectionTitle="Read"/>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )
    }
}
