import { Routes, Route } from 'react-router'
import axios from 'axios'
import {useState,  useEffect} from 'react'
import { API_URL } from "./config/api";

import './App.css'

import Navbar from './components/Navbar.jsx'
import BookPageDetails from './components/BookPageDetails.jsx'
import Footer from './components/Footer.jsx'
import EditBook from './components/EditBook.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import NewBook from './pages/NewBook.jsx'
import SearchBook from './pages/SearchBook.jsx'






function App() {
  const [booksToDisplay, setBooksToDisplay] = useState(null);


  //Getting the data from the API and convert to array


  useEffect(() => {
      axios.get(`${API_URL}/books.json`)
          .then(response => {
              const booksObj = response.data;
              const booksArr = Object.keys(booksObj).map((id) => ({
                  id,
                  ...booksObj[id]
              }))
              setBooksToDisplay(booksArr);
              console.log(booksArr)
          })
          .catch(e => console.log("Error getting books from the API...", e));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar booksToDisplay={booksToDisplay} />
      
      <Routes>
        <Route path="/" element={<Home booksToDisplay={booksToDisplay}/>} />
        <Route path="/books/:bookId" element={<BookPageDetails />} />
        <Route path="/books/edit/:bookId" element={<EditBook />} />
        <Route path="/newBook" element={<NewBook />} />
        <Route path="/searching" element={<SearchBook />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
