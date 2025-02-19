import { useSearchParams } from "react-router";
import { useState, useEffect } from 'react';
import { API_URL } from "../config/api";
import axios from 'axios'


function SearchBook() {
    // const [searchParams] = useSearchParams();
    // const searchBook = searchParams.get("query");
    // const [apiData, setApiData] = useState(null);

    // useEffect(() => {
    //     if (!searchBook || !searchBook.trim()) return;
           
    
    //     const fetchBookData = async () => {
    //         try {
    //             const response = await axios.get(`${API_URL}/searching`, {
    //                 params: {
    //                     orderBy: '"title"',
    //                     startAt: `"${searchBook}"`,
    //                     endAt: `"${searchBook}\uf8ff"`
    //                 }
    //             });
                
    //             console.log("Fetched data:", response.data);
    //             setApiData(response.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     fetchBookData();

    // },[searchBook]);




    // return (
    //     <div>
    //         <h1>Search Results for: {searchBook}</h1>
    //         <div>
    //         {apiData ? (
    //                 Object.values(apiData).map((book, index) => (
    //                     <p key={index}>{book.title}</p>
    //                 ))
    //             ) : (
    //                 <p>No results found.</p>
    //             )}

    //         </div>
    //     </div>
    // )
}

export default SearchBook;

