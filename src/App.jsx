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

  const clickEventFromEditPage = (data) => {
    console.log("received data from edit submit btn:",data)
    setBooksToDisplay(data)
  }

  const getBooksToDisplay = async () => {
    try {
      const response = await axios.get(`${API_URL}/books.json`)
      const booksObj = response.data;
      const booksArr = Object.keys(booksObj).map((id) => ({
          id,
          ...booksObj[id]
      }))
        setBooksToDisplay(booksArr);
         sendClickEventToParent(booksArr)

        console.log('books array after get:',booksArr)
    }
    catch(error){
      console.log("ërror occured:",error)
    }
  }


  useEffect(() => {
      getBooksToDisplay()
  }, []);




  return (
    <div className="flex flex-col max-w-screen min-h-screen">
      <Navbar booksToDisplay={booksToDisplay} />
      
      <Routes>
        <Route path="/" element={<Home booksToDisplay={booksToDisplay}/>} />
        <Route path="/books/:bookId" element={<BookPageDetails sendClickEventToParent={clickEventFromEditPage}/>} />
        <Route path="/books/edit/:bookId" element={<EditBook sendClickEventToParent={clickEventFromEditPage}  />} />
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
