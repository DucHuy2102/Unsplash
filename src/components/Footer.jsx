import { FaFacebook, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-black text-white mt-2 h-10 w-full flex justify-center items-center'>
            <div>
                <h1 className='text-lg font-serif'>Nguyen Duc Huy</h1>
            </div>
            <div className='ml-2 text-xl mt-1'>
                <button className='hover:text-2xl'>
                    <a href='https://www.facebook.com/Duc.Huy2102'>
                        <FaFacebook />
                    </a>
                </button>
                <button className='ml-2 hover:text-2xl'>
                    <a href='https://github.com/DucHuy2102'>
                        <FaGithub />
                    </a>
                </button>
            </div>
        </div>
    );
};

export default Footer;
