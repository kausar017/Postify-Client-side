import { useState } from "react";


const Bannar = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleBlur = () => {
        setIsSearchActive(false);
    };

    return (
        <div className="App "
            style={{
                backgroundImage: 'url(https://wallpapers.com/images/hd/720p-social-background-1280-x-720-jogr0kdxvgk5gnwt.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}

        >

            <div
                className={`hero min-h-[500px] text-black transition duration-700 ${isSearchActive ? 'bg-black opacity-60 backdrop-blur-md' : ''}`}

            >

                <div className={`w-full max-w-lg transition-all duration-700 relative ${isSearchActive ? 'hover:max-w-xl' : ''}`}>

                    <input
                        type="text"
                        onFocus={handleSearchClick}
                        onBlur={handleBlur}
                        placeholder="Type here"
                        className="input input-bordered bg-white w-full placeholder:text-black rounded-full" />

                </div>
               
            </div>
        </div>
    );
};

export default Bannar;
