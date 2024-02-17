import { useCallback, useEffect, useRef, useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { Header, Footer } from './components/routes';
import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGE_PER_PAGE = 20;

const App = () => {
    const searchInput = useRef(null);
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [errorMsg, setErrorMsg] = useState('');

    // console.log('searchInput:', searchInput.current.value);
    // console.log('searchInput:', search);
    // console.log('page', currentPage);

    // event submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(searchInput.current.value);
        fetchImage();
        setCurrentPage(1);
    };

    // event selection
    const handleSelection = (selection) => {
        searchInput.current.value = selection;
        fetchImage();
        setCurrentPage(1);
    };

    console.log('page:', currentPage);

    // fetch API
    const fetchImage = useCallback(async () => {
        try {
            if (searchInput.current.value) {
                setErrorMsg('');
                const { data } = await axios.get(
                    `${API_URL}?query=${
                        searchInput.current.value
                    }&page=${currentPage}&per_page=${IMAGE_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
                );
                // console.log(data.results);
                setImages(data.results);
                setTotalPages(data.total_pages);
            }
        } catch (error) {
            setErrorMsg('Something goes wrong! Try again later.');
            console.log(error);
        }
    }, [currentPage]);

    // console.log('Page Number:', currentPage);
    useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    return (
        <div className='min-h-[100vh] flex flex-col justify-center items-center'>
            {/* header */}
            <Header />
            {/* error message when cannot get image */}
            {errorMsg && (
                <p
                    onClick={() => {
                        setErrorMsg('');
                        setSearch('');
                    }}
                    className='text-red-600 mt-3 font-bold transition-transform hover:translate-y-0.5 hover:cursor-pointer'
                >
                    {errorMsg}
                </p>
            )}

            {/* content: input and button search image */}
            <div className='mt-5 relative'>
                <form onSubmit={handleSubmit}>
                    {/* input form */}
                    <input
                        ref={searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                        type='text'
                        placeholder='Search high-resolution images'
                        className='border border-gray-400 px-3 py-2 rounded-lg w-[30rem] '
                    />

                    {/* icon delete input value */}
                    {search && (
                        <TiDeleteOutline
                            onClick={() => {
                                setSearch('');
                            }}
                            className='absolute top-[10px] right-20 text-2xl cursor-pointer'
                        />
                    )}

                    {/* button search */}
                    <button
                        type='submit'
                        className='font-bold border border-gray-500 px-2 py-2 rounded-lg ml-1 hover:bg-black hover:text-white'
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* filter */}
            <div id='btnFilter' className='flex mt-3'>
                <button onClick={() => handleSelection('wallpapers')}>Wallpapers</button>
                <button onClick={() => handleSelection('animals')} className='ml-5'>
                    Animals
                </button>
                <button onClick={() => handleSelection('sport')} className='ml-5'>
                    Sport
                </button>
                <button onClick={() => handleSelection('travel')} className='ml-5'>
                    Travel
                </button>
            </div>

            {/* display images */}
            {/* <div className='mt-7 grid grid-cols-5 gap-3 justify-center items-center p-5'>
                {images.map((img) => {
                    return (
                        <img
                            className='object-cover max-w-[100%] rounded-[10px] transition-transform duration-[0.5s] hover:-translate-y-1.5'
                            src={img.urls.small}
                            alt={img.urls.alt_description}
                            key={img.id}
                        />
                    );
                })}
            </div> */}
            <div className='grid-container mt-7 grid grid-cols-5 gap-3 justify-center items-center p-20'>
                {images.map((img) => {
                    return (
                        <div key={img.id} className='relative rounded-lg overflow-hidden w-full aspect-w-1 aspect-h-1'>
                            {/* image */}
                            <img
                                className='imgItem object-cover rounded-lg'
                                src={img.urls.small}
                                alt={img.urls.alt_description}
                                key={img.id}
                            />

                            {/* view more option */}
                            <div className='absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 flex justify-center items-end'>
                                <a
                                    href={img.links.html}
                                    className='text-white font-bold text-lg hover:text-black hover:text-2xl transform transition-transform duration-300 hover:translate-y-[-5px]'
                                >
                                    View
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* button next & previous */}
            <div className='mt-3 text-center w-52 flex justify-center space-x-7 mb-3'>
                {currentPage > 1 && (
                    <button
                        className='bg-white border border-gray-900 text-black w-20 h-10 rounded-lg font-bold hover:bg-black hover:text-white hover:text-lg'
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>
                )}
                {currentPage < totalPages && (
                    <button
                        className='bg-white border border-gray-900 text-black w-20 h-10 rounded-lg font-bold hover:bg-black hover:text-white hover:text-lg'
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                )}
            </div>

            {/* footer */}
            {searchInput.current ? <></> : <Footer />}
        </div>
    );
};

export default App;
