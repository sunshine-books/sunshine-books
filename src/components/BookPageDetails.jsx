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

    // const deleteBook = () => {
    //     axios.delete(`${API_URL}/books/${bookId}.json`)
    //     .then(response => {
    //         const getBooksToDisplay = async () => {
    //             try {
    //               const response = await axios.get(`${API_URL}/books.json`)
    //               const booksObj = response.data;
    //               const booksArr = Object.keys(booksObj).map((id) => ({
    //                   id,
    //                   ...booksObj[id]
    //               }))
    //                  sendClickEventToParent(booksArr)
    //                 console.log('books array after get:',booksArr)
    //             }
    //             catch(error){
    //               console.log("ërror occured:",error)
    //             }
    //           }

    //           getBooksToDisplay()

           
    //         navigate(`/`);
    //     })
    //         .catch((error) => console.log("Error deleting the book...", error));
    // }


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
                    <img className="w-xs md:w-md object-cover" src={book["cover-img"]} alt={book.title} />
                    <div className="gap-4 w-xs md:w-screen">

                        <p className="font-bold" >Genre: </p> <p>{book.genre}</p>
                        <p className="font-bold" >Publish Date: {book["publish-date"]}</p>
                        <p className="font-bold" >Rating: {book.rating}</p>
                        <p className="font-bold" >Price: {book["retail-price"]}</p>
                        <p className="text-wrap break-all">Synopsis: {book.synopsis}</p>
                        <Link to={`/books/edit/${bookId}`}>
                            <button className="btn-green hover:bg-green-800" >Edit</button>
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
        </div>
    )
}

export default BookPageDetails;