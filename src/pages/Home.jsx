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
    // Function to shuffle the array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    //items-center md:items-start w-full md:w-auto text-center md:text-left
    return (

        <div className="flex flex-col md:flex-row w-screen justify-center items-start pt-16 md:pt-24 md:gap-4 p-4">
            {/* Show the latest book img*/}
            <div className="flex flex-col w-100 h-64">
                <div className="relative group">
                <img
                    src={latestBook["cover-img"]}
                    alt="Book Cover"
                    className="hidden md:block md:size-auto object-contain rounded-t-xl "
                />
                {/* Show the latest book info */}
                <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent 
                    flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                    <h3 className=" text-white text-3xl font-bold">{latestBook.title}</h3>
                    <p className="text-white text-2xl">by {latestBook.author}</p>
                </div>
                </div>
               
                
                <div className="text-center flex-col justify-items-stretch bg-orange-500  gap-2 p-4 w-xs md:w-auto block rounded-xl md:rounded-t-none rounded-b-xl">
                    <h1 className="text-4xl text-white font-bold mb-2">New in the collection</h1>
                 
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
                    <Link to="/NewBook" className="btn-orange text-sm md:text-2xl">Register a Book</Link>
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