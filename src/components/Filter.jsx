const Filter = ({ handleSelection }) => {
    return (
        <div id='btnFilter' className='flex mt-3'>
            <button onClick={() => handleSelection('car')}>Car</button>
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
    );
};

export default Filter;
