import React, { Component } from 'react'

export default class Bookshelf extends Component {

    handleChange = (shelf, book) => {
        book.shelf = shelf;
        this.props.shelfSelected(shelf, book);
    };
    render() {
        return (
            <div className="bookshelf">
    <h2 className="bookshelf-title">{this.props.sectionTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.books.map((book) => (
                        <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select 
                                onChange={(event) => this.handleChange(event.target.value, book)}
                                value={book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                    <div className="book-title">{book.title}</div>
                    { book.authors.map((author, index) => (
                        <div key={ index } className="book-authors">{author}</div>
                    ))}
                        </div>
                      </li>
                    ))}
                    </ol>
                  </div>
            </div>
        )
    }
}
