import { Link } from "react-router";



function ShowBooks(props) {

    // Function to shuffle the array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // Array without the latest book in the array
    const booksWithoutLatest =[...props.arrOfBooks].slice(0, -1);

    // Shuffle the books array and slice the first 2 books
    const booksToShow = shuffleArray([...booksWithoutLatest]).slice(0, 2);
    
    return(
        <div className="flex flex-col md:min-md:flex-row gap-16">
            {booksToShow.map((booksDetails) => {
                console.log(booksDetails)
                return (
                    <div lang="en" className="flex flex-col gap-4 overflow-hidden text-wrap bg-white hyphens-auto" key={booksDetails.id}>
                        <h1 className="font-bold text-xl w-full text-center ">{booksDetails.title}</h1>
                    
                    {/* Image Wrapper */}
                    <div className="relative flex flex-row justify-center">
                        <img 
                            src={booksDetails["cover-img"]} 
                            alt={booksDetails.title} 
                            className="max-h-84 w-xs md:w-3xs object-fit"
                        />
                        <Link 
                            to={`/books/${booksDetails.id}`}
                            className="absolute btn-green bottom-0"
                        >
                            More details
                        </Link>
                    </div>
                </div>                
                
                );
            })}
        </div>
    )
}

export default ShowBooks