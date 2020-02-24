import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'

import SearchBook from './Components/SearchBook'
import ListBooks from './Components/ListBooks'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ListBooks}></Route>
        <Route path="/search" component={SearchBook}></Route>
        
      </div>
    )
  }
}

export default BooksApp
