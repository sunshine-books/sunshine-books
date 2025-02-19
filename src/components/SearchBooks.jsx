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
        <Select options={books}  onChange={ handleChange} placeholder={"Procurar libro 📚"}/>
    )
    // let navigate = useNavigate();
    // const [searchBook, setSearchBook] = useState("");



    // const handleSearch = () => {
    //     if (searchBook.trim()) {
    //         navigate(`/searching?query=${encodeURIComponent(searchBook)}`);
    //     }
    // };

    // return(
    //     <div >
    //         <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-center w-full">
    //             <input
    //                 type="text"
    //                 placeholder="Search your book..."
    //                 className="bg-gray-100 px-4 py-2 rounded-full md:rounded-r-lg text-black"
    //                 onChange={(e) => setSearchBook(e.target.value)}
    //             />
    //             <button onClick={handleSearch}  className="bg-orange-500 text-white px-4 py-2  rounded-full md:rounded-l-lg">Search</button>
    //             </div>
    //     </div>
    // )
}

export default SearchBooks