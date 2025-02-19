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
        <div className="BookDetailsPage">

            {/* project details */}
            <div key={book.id} >

                <img src={book["cover-img"]} alt={book.title} />
                <h1 className="book-title">{book.title}</h1>
                <h2>Author: {book.author}</h2>
                <p>Genre: {book.genre}</p>
                <p>Publish Date: {book["publish-date"]}</p>
                <p>Rating: {book.rating}</p>
                <p>Price: {book["retail-price"]}</p>
                <p>Synopsis: {book.synopsis}</p>
            </div>
            <br></br>
            <Link to={`/NewBook`}>
                <button>Register a new book</button>
            </Link>

            <br></br>

            <Link to={`/projects/edit/${bookId}`}>
                <button>Edit</button>
            </Link>
            <br></br>
            <button onClick={deleteBook}>Delete</button>
        </div>
    )
}

export default BookPageDetails;