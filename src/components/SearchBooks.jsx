import { useNavigate } from "react-router-dom"
import { useState } from "react";



function SearchBooks(props) {
    
    let navigate = useNavigate();
    const [searchBook, setSearchBook] = useState("");

    const handleSearch = () => {
        if (searchBook.trim()) {
            navigate(`/searching?query=${encodeURIComponent(searchBook)}`);
        }
    };

    return(
        <div >
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-center w-full">
                <input
                    type="text"
                    placeholder="Search your book..."
                    className="bg-gray-100 px-4 py-2 rounded-full md:rounded-r-lg text-black"
                    onChange={(e) => setSearchBook(e.target.value)}
                />
                <button onClick={handleSearch}  className="bg-orange-500 text-white px-4 py-2  rounded-full md:rounded-l-lg">Search</button>
                </div>
        </div>
    )
}

export default SearchBooks