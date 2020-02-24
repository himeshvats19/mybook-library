import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './Bookshelf'
import * as BooksAPI from '../BooksAPI'

export default class ListBooks extends Component {
    state = {
        books:[],
        currentlyReading: [],
        wantToRead: [],
        read: [],
        showLoader: false
    }
    componentDidMount(){
        this.setState({ showLoader: true });
        BooksAPI.getAll().then((books) => {
          const currentlyReading = books.filter( book => {
            return book.shelf === "currentlyReading"
          })
          const wantToRead = books.filter( book => {
              return book.shelf === "wantToRead"
          })
          const read = books.filter( book => {
              return book.shelf === "read"
          });
          this.setState({
            books,
            currentlyReading,
            wantToRead,
            read
          })
        this.setState({ showLoader: false })
        })
    }

    getBookFromId = (bookIdToParse) => {
        return this.state.books.filter(book => {
            return bookIdToParse.some((id) => {
                return book.id === id
            })
        })
    }
    
    updateShelf = (shelf, book) => {
        this.setState({ showLoader: true })
        BooksAPI.update(book, shelf).then((bookIds) => {
            const { currentlyReading, wantToRead, read } = bookIds
            this.setState({
                currentlyReading : this.getBookFromId(currentlyReading),
                wantToRead : this.getBookFromId(wantToRead),
                read : this.getBookFromId(read),
                showLoader: false
              })
          })
    }

    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
              {this.state.showLoader && (
                    <div className="spinner-wrap">
                        <div className="spinner"></div>
                    </div>)
                }
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
                <Link to={{
                    pathname: '/search',
                    state: {savedBooks: this.state.books}
                }}>
                    <button>Add a Book</button>
                </Link>
            </div>
          </div>
        )
    }
}
