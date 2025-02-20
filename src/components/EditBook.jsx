import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../config/api";


function EditBook({sendClickEventToParent}) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [ISBN, setISBN] = useState("");
    const [format, setFormat] = useState({
        audiobook: false,
        ebook: false,
        print: false
    });
    const [isAvailable, setIsAvailable] = useState(true);
    const [URL, setURL] = useState();
    const [genre, setGenre] = useState();
    const [publishDate, setPublishDate] = useState();
    const [rating, setRating] = useState();
    const [retailPrice, setRetailPrice] = useState();
    const [synopsis, setSynopsis] = useState();

    const { bookId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/books/${bookId}.json`)
            .then(response => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setISBN(response.data.ISBN)
                setFormat(response.data.format)
                setIsAvailable(response.data["availability-status"])
                setURL(response.data["cover-img"])
                setGenre(response.data.genre)
                setPublishDate(response.data["publish-date"])
                setRating(response.data.rating)
                setRetailPrice(response.data["retail-price"])
                setSynopsis(response.data.synopsis)
            })
            .catch((error) => console.log("Error getting project details from the API...", error));
    }, [bookId]);

    
    // const getBookAfterEdit = async () => {
    //         try {
    //            const response = axios.get(`${API_URL}/books.json`)
               
    //                 const booksObj = response.data;
    //                 const booksArr = Object.keys(booksObj).map((id) => ({
    //                     id,
    //                     ...booksObj[id]
    //                 }))
    //                 setBooksToDisplay(booksArr);
    //                 console.log(booksArr)
              
                
    //         }
    //         catch(error){
    //             console.log("ërror occured while receiving the book!", error)
    //         }
    // }





    const handleSubmit = (e) => {
        e.preventDefault();
       // getBookAfterEdit()

        

        const newDetails = {
            ISBN: ISBN,
            title: title,
            author: author,
            format: format,
            "availability-status": isAvailable,
            "cover-img": URL,
            genre: genre,
            "publish-date": publishDate,
            rating: rating,
            "retail-price": retailPrice,
            synopsis: synopsis
        }

        axios.put(`${API_URL}/books/${bookId}.json`, newDetails)
            .then(response => {
                const getBooksToDisplay = async () => {
                    try {
                      const response = await axios.get(`${API_URL}/books.json`)
                      const booksObj = response.data;
                      const booksArr = Object.keys(booksObj).map((id) => ({
                          id,
                          ...booksObj[id]
                      }))
                         sendClickEventToParent(booksArr)
                        console.log('books array after get:',booksArr)
                    }
                    catch(error){
                      console.log("ërror occured:",error)
                    }
                  }

                  getBooksToDisplay()

               
                navigate(`/books/${bookId}`);
            })
            .catch(e => console.log("Error creating a new project...", e));
    }

    const handleNavigateHome = () => {
        navigate(`/books/${bookId}`);
      };

    return(
        <div className="flex flex-col justify-center items-center gap-2 md:gap-4 w-full pt-24">
             <h1 className="text-2xl ">Edit Details</h1>
            <div className="flex flex-row -sm:flex-col justify-center items-center w-screen md:gap-24"> 
                <button onClick={()=>{navigate(`/`)}} className="btn-green">Back Home</button>
               
                <button onClick={handleNavigateHome} className="btn-red">Cancel</button>
                
            </div>
            

            {/* Form to edit */}
            <form className="flex flex-col md:flex-row w-screen justify-center items-start  md:gap-4 p-4"
                onSubmit={handleSubmit}>
                <div>
                    {/*Img layout */}
                    <label className="label-form">
                        Cover Image:
                        <input
                            type="url"
                            name="cover-img"
                            placeholder="url for the cover..."
                            value={URL}
                            onChange={(e) => { setURL(e.target.value) }}
                            className="input w-xs md:w-xl"
                            required
                        />
                    </label>
                    {URL ? (
                    <img 
                        src={URL} 
                        alt="Cover Preview" 
                        className="w-64 h-96 object-cover rounded-lg shadow-md"
                    />
                    ) : (
                    <div className="w-full h-96 flex items-center justify-center mt-4 bg-gray-300 text-white rounded-lg shadow-md">
                        Prev img here
                    </div>
                    )}
                </div>

                 {/*Info layout */}
                <div> 
                    <label className="label-form">
                        Title:
                        <input
                        type="text"
                        name="title"
                        placeholder="enter the title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        className="input w-xs md:w-xl"
                        required
                        />
                    </label>

                <label className="label-form">
                    Author:
                    <input
                        type="text"
                        name="author"
                        placeholder="name of the author"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                        className="input w-xs md:w-xl"
                        required
                    />
                </label>

                <label className="label-form">
                    Genre:
                    <input
                        type="text"
                        name="Genre"
                        placeholder="genre"
                        value={genre}
                        onChange={(e) => { setGenre(e.target.value) }}
                        className="input w-xs md:w-xl"
                        required
                    />
                </label>

                <label className="label-form">
                    Publish date :
                    <input
                        type="number"
                        name="publish-date"
                        placeholder="the year"
                        value={publishDate}
                        onChange={(e) => { setPublishDate(Number(e.target.value)) }}
                        className="input w-xs md:w-xl"
                        required
                    />
                </label>

                <label className="label-form">
                    Rating :
                    <input
                        type="number"
                        name="rating"
                        placeholder="rating"
                        value={rating}
                        onChange={(e) => { setRating(Number(e.target.value)) }}
                        className="input w-xs md:w-xl"
                        required
                    />
                </label>

                <label className="label-form">
                    Retail price :
                    <input
                        type="number"
                        name="retail-price"
                        placeholder="price of the book"
                        value={retailPrice}
                        onChange={(e) => { setRetailPrice(Number(e.target.value)) }}
                        className="input w-xs md:w-xl"
                        required
                    />
                </label>

                <fieldset className="flex flex-col">
                    <legend className="label-form my-4">Format</legend>

                    <label>
                        Print
                        <input
                            type="checkbox"
                            checked={format.print}
                            onChange={() => setFormat((prevState) => ({
                                ...prevState,
                                print: !prevState.print
                            }))}
                        />
                    </label>

                    <label>
                        Ebook
                        <input
                            type="checkbox"
                            checked={format.ebook}
                            onChange={() => setFormat((prevState) => ({
                                ...prevState,
                                ebook: !prevState.ebook
                            }))}
                           
                        />
                    </label>

                    <label>
                        Audiobook
                        <input
                            type="checkbox"
                            checked={format.audiobook}
                            onChange={() => setFormat((prevState) => ({
                                ...prevState,
                                audiobook: !prevState.audiobook
                            }))}
                            
                        />
                    </label>
                </fieldset>

                <label className="flex flex-row gap-2">
                    Available:

                    {isAvailable ? "Yes" : "No"}  {/* Show Yes if checked, No if unchecked */}
                    <input
                        type="checkbox"
                        checked={isAvailable} // Reflect state in checkbox
                        onChange={(e) => setIsAvailable(e.target.checked)} // Toggle state on change
                        required
                    />


                </label>


                <label className="label-form">
                    Synopsis:
                    <input
                        type="textarea"
                        name="synopsis"
                        placeholder="enter the synopsis"
                        value={synopsis}
                        onChange={(e) => { setSynopsis(e.target.value) }}
                        className="input w-xs md:w-xl"
                        required
                    />
                </label>


                <label className="label-form">
                    ISBN:
                    <input
                        type="number"
                        name="ISBN"
                        placeholder="name of the ISBN"
                        value={ISBN}
                        onChange={(e) => { setISBN(Number(e.target.value)) }}
                        className="input w-xs md:w-xl"
                        required
                    />
                </label>
                </div>
                <div className="flex flex-row">
                    <button className="btn-green">Save Changes</button>
                    
                </div>
            </form>
           

            
        </div>
    )
}

export default EditBook