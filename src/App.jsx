import { useCallback, useEffect, useRef, useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { Header, Footer, Filter } from './components/routes';
import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGE_PER_PAGE = 20;

const App = () => {
    const searchInput = useRef(null);
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

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

    // fetch API
    const fetchImage = useCallback(async () => {
        try {
            const { data } = await axios.get(
                `${API_URL}?query=${
                    searchInput.current.value
                }&page=${currentPage}&per_page=${IMAGE_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
            );
            // console.log(data.results);
            setImages(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
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
            <Filter handleSelection={handleSelection} />

            {/* display images */}
            <div className='mt-7 grid grid-cols-5 gap-[10px] justify-center items-center'>
                {images.map((img) => {
                    return (
                        <img
                            className='w-[200px] h-[200px] justify-self-center items-self-center rounded-[10px] transition-transform duration-[0.5s]'
                            src={img.urls.small}
                            alt={img.urls.alt_description}
                            key={img.id}
                        />
                    );
                })}
            </div>

            {/* button next & previous */}
            <div className='mt-5 text-center w-52 flex justify-center space-x-7 mb-3'>
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
            {/* {images && <Footer />} */}
        </div>
    );
};

export default App;
