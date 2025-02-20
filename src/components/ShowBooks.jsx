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
        <div className="flex flex-col justify-center md:flex-row gap-16">
            {booksToShow.map((booksDetails) => {
                console.log(booksDetails)
                return (
                    <div className="flex flex-col gap-4 overflow-hidden text-wrap bg-white" key={booksDetails.id}>
                        <h1 className="text-xl  max-w-max text-wrap break-word">{booksDetails.title}</h1>
                    
                    {/* Image Wrapper */}
                    <div className="relative w-center">
                        <img 
                            src={booksDetails["cover-img"]} 
                            alt={booksDetails.title} 
                            className="max-h-fit max-w-fit object-cover"
                        />
                        <Link 
                            to={`/books/${booksDetails.id}`}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 btn-green text-nowrap"
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