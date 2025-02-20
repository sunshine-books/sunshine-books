import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { useEffect, useState } from "react";


function BookPageDetails({getBooksToDisplay}) {

    const [book, setBook] = useState(null);
    const { bookId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        getBook();
    }, [bookId]);

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
                getBooksToDisplay();

                navigate("/?result=deleted");
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
        // <div className="flex flex-col justify-center items-center min-h-screen p-8 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="mt-16 md:mt-24 p-8 md:max-w-lvh">
                <h1 className="text-4xl md:text-7xl font-bold">{book.title}</h1>
                <h2 className="text-md md:text-2xl font-bold">by: {book.author}</h2>
                {/* project details */}
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 mt-4" key={book.id} >
                    <img className="w-xs md:max-w-md object-cover" src={book["cover-img"]} alt={book.title} />
                    <div className="gap-4 w-xs md:w-screen">
                        <div className="inline md:gap-2 md:text-xl"> <h2 className="font-bold" >Genre:</h2> <p className="font-sans">{book.genre}</p> </div>
                        <div className="inline md:gap-2  md:text-xl"><h2 className="font-bold" >Publish Date:</h2><p className="font-sans"> {book["publish-date"]}</p></div>
                        <div className="inline md:gap-2  md:text-xl"><p className="font-bold" >Rating:</p> <p className="font-sans"> {book.rating}</p></div>
                        <div className="inline md:gap-2  md:text-xl"><p className="font-bold" >Price: </p> <p className="font-sans"> € {book["retail-price"]}</p></div>
                        <div  lang="en" className="flex flex-col gap-2  md:text-xl"><p className="font-bold" >Synopsis: </p> <p className="text-wrap hyphens-auto "> {book.synopsis}</p></div>
                        <Link to={`/books/edit/${bookId}`}>
                            <button className="btn-green text-sm md:text-xl hover:bg-green-800" >Edit</button>
                        </Link>
                        <button className="btn-red text-sm md:text-xl hover:bg-green-800" onClick={deleteBook}>Delete</button>
                    </div>

                </div>
                <div className="flex flex-col content-between gap-8">
                    <div className="flex flex-col justify-center items-center p-8 rounded shadow-md font-bold md:text-2xl">
                        Do you want to add a new book to our collection?
                        <Link to="/NewBook" className="btn-orange text-sm md:text-xl">Register a Book</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BookPageDetails;