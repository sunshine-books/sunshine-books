import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../config/api";



function NewBook() {

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

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = {
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

        axios.post(`${API_URL}/books.json`, newBook)
            .then(response => {
                navigate("/");
            })
            .catch(e => console.log("Error creating a new project...", e));
    }

    return (
        <div className="flex flex-col justify-center items-center gap-2 md:gap-4 w-full pt-24">
            <h3 className="text-2xl text-nowrap">Register New Book</h3>

            <form className="flex flex-col-reverse md:flex-row w-screen justify-center items-start pt-16 md:pt-24 md:gap-4 p-4"
                onSubmit={handleSubmit}>
                <div>
                    <label className="label-form">
                        Cover Image:
                        <input
                            type="url"
                            name="cover-img"
                            placeholder="url for the cover..."
                            value={URL}
                            onChange={(e) => { setURL(e.target.value) }}
                            className="input w-xs md:w-xl"
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
                            className="input md:max-w-auto"
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
                            className="input md:max-w-auto"
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
                            className="input md:max-w-auto"
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
                            className="input md:max-w-auto"
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
                            className="input md:max-w-auto"
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
                            className="input md:max-w-auto"
                            required
                        />
                    </label>
                    <button className="btn-green hidden md:block">Create</button>
                </div>
                
            </form>
        </div>
    )
}

export default NewBook;