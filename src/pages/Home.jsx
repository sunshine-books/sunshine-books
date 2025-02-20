import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
import '../App.css'
import { Link } from "react-router";
import ShowBooks from "../components/ShowBooks";
import SearchBooks from "../components/SearchBooks";



function Home({booksToDisplay}) {

   

    //loading items 
    if (booksToDisplay === null) {
        return (
            <h2>loading</h2>
        )
    }

    // Get the latest book (last item in the array)

    const latestBook = booksToDisplay[booksToDisplay.length - 1];
    

    //items-center md:items-start w-full md:w-auto text-center md:text-left
    return (

        <div className="flex flex-col md:flex-row w-screen justify-center items-start pt-16 md:pt-24 md:gap-4 p-4">
            {/* Show the latest book */}
            <div className="flex flex-col w-100 h-64">
                <img
                    src={latestBook["cover-img"]}
                    alt="Book Cover"
                    className="hidden md:block md:size-auto object-contain rounded-t-xl "
                />
                <div className="text-center flex-col justify-items-stretch bg-orange-500  gap-2 p-4 w-xs md:w-auto block rounded-xl md:rounded-t-none rounded-b-xl">
                    <h1 className="text-4xl text-white font-bold">New in the collection</h1>
                    <h3 className=" text-white font-bold">{latestBook.title}</h3>
                    <p className="text-white">by {latestBook.author}</p>
                    <Link
                        className="btn-green hover:bg-green-800"
                        to={`/books/${latestBook.id}`}>
                        More details
                    </Link>
                </div>
            </div>

            {/* Show the rest of the books */}
            <div className="flex flex-col content-between justify-items-stretch items-center gap-8">
                <div className="flex flex-col p-4 h-48 w-xs md:w-xl text-center justify-center text-2xl font-bold gap-8 rounded shadow-xl">
                    Do you want to add a new book to our collection?
                    <Link to="/NewBook" className="btn-orange">Register a Book</Link>
                </div>
                {/* Do the search */}
                <div className="flex flex-col p-4 h-48 w-xs md:w-xl text-center justify-items-stretch text-2xl font-bold gap-8 rounded shadow-xl">
                    Search for a book in our collection:
                    <SearchBooks booksToDisplay={booksToDisplay} />
                </div>
                
                <ShowBooks arrOfBooks={booksToDisplay} latestBook={latestBook} />

            </div>
        </div>
    );
}

export default Home;