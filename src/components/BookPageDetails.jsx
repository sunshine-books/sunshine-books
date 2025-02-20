import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { useEffect, useState } from "react";


function BookPageDetails() {

    const [book, setBook] = useState(null);

    const { bookId } = useParams();

    const navigate = useNavigate();


    useEffect(() => {
        getBook();
    }, []);


    const getBook = () => {
        axios.get(`${API_URL}/books/${bookId}.json`)
            .then(response => {
                setBook(response.data);
            })
            .catch((error) => console.log("Error getting book details from the API...", error));
    }


    const deleteBook = () => {
        axios.delete(`${API_URL}/books/${bookId}.json`)
            .then(response => {
                navigate("/");
            })
            .catch((error) => console.log("Error deleting the book...", error));
    }


    //loading items 
    if (book === null) {
        return (
            <h2>loading</h2>
        )
    }


    return (
        <div className="flex flex-col justify-center items-center gap-2 md:gap-4 w-full md: p-4">

            {/* project details */}
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-4 p-4" key={book.id} >
                <img className="w-sm object-cover" src={book["cover-img"]} alt={book.title} />
                <div className="gap-4">
                    <h1 className="book-title">{book.title}</h1>
                    <h2 className="font-bold">Author: </h2><p className=""> {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Publish Date: {book["publish-date"]}</p>
                    <p>Rating: {book.rating}</p>
                    <p>Price: {book["retail-price"]}</p>
                    <p className="text-wrap">Synopsis: {book.synopsis}</p>
                    <Link to={`/books/edit/${bookId}`}>
                        <button  className="btn-green hover:bg-green-800" >Edit</button>
                    </Link>
                    <button className="btn-red hover:bg-green-800" onClick={deleteBook}>Delete</button>
                </div>
                
            </div>
                <div className="flex flex-col content-between p-8 gap-8">
                    <div className="flex flex-col p-4 h-48 justify-center text-center text-2xl font-bold gap-8 rounded shadow-xl">
                        Do you want to add a new book to our collection?
                        <Link to="/NewBook" className="btn-orange">Register a Book</Link>
                    </div>
                </div>

        </div>
    )
}

export default BookPageDetails;