import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";


function SearchBooks({booksToDisplay}) {
    const navigate = useNavigate()
    const [books, setBooks] = useState(null)


    const handleChange = (e) =>{
        navigate(`/books/${e.value}`)
    }
    useEffect(()=> {
        booksToDisplay   && setBooks(booksToDisplay.map(book => ({ value: book.id,  label:book.title})))
        console.log("books, ", books)
    }, [booksToDisplay])

   return booksToDisplay && books &&  (
        <Select options={books}  onChange={ handleChange} placeholder={"Buscar libro 📚"}/>
    )
   



  
}

export default SearchBooks