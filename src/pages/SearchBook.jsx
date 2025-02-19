import { useSearchParams } from "react-router";


// useEffect(() => {
//     axios.get(`${API_URL}/books.json`)
//         .then(response => {
//             const booksObj = response.data;
//             const booksArr = Object.keys(booksObj).map((id) => ({
//                 id,
//                 ...booksObj[id]
//             }))
//             setBooksToDisplay(booksArr);
//             console.log(booksArr)
//         })
//         .catch(e => console.log("Error getting books from the API...", e));
// }, []);


// //loading items 
// if (booksToDisplay === null) {
//     return (
//         <h2>loading</h2>
//     )
// }


function SearchBook() {
    const [searchParams] = useSearchParams();
    const searchBook = searchParams.get("query");


    return (
        <div>
            <h1>Search Results for: {searchBook}</h1>
        </div>
    )
}

export default SearchBook;

