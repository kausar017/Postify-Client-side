import { useState } from "react";

const Bannar = ({ searchQuery, setSearchQuery }) => {
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleBlur = () => {
        setIsSearchActive(false);
    };

    const handleSearch = (e) => {
        // Prevent form submission or any default behavior
        e.preventDefault();
        setSearchQuery(e.target.value); 
    };

    return (
        <div className="App"
            style={{
                backgroundImage: 'url(https://wallpapers.com/images/hd/720p-social-background-1280-x-720-jogr0kdxvgk5gnwt.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div
                className={`hero lg:min-h-[500px] md:min-h-[300px] max-sm:min-h-[200px] text-black transition duration-700 ${isSearchActive ? 'bg-black opacity-60 backdrop-blur-md' : ''}`}>
                <div className={`w-full md:max-w-lg max-sm:max-w-xs transition-all duration-700 relative ${isSearchActive ? 'hover:max-w-xl' : ''}`}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            onFocus={handleSearchClick}
                            onBlur={handleBlur}
                            onChange={handleSearch}  // Update state on input change
                            placeholder="Type here"
                            value={searchQuery}
                            className="input input-bordered bg-white w-full placeholder:text-black rounded-full"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Bannar;
