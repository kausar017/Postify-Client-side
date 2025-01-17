import { useQuery } from '@tanstack/react-query'
import useAxiosPiblic from '../../AllHooks/useAxiosPiblic';
import { format } from 'date-fns';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Bannar from '../Bannar/Bannar';
import { FaDatabase } from 'react-icons/fa6';


const PostedData = () => {

    const axiosPiblic = useAxiosPiblic();
    const [sortByPopularity, setSortByPopularity] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');


    // Comments data fetch with tanstack query
    const { data: coment = [] } = useQuery({
        queryKey: ['queary'],
        queryFn: async () => {
            const res = await axiosPiblic('/coment');
            return res.data;
        }
    });

    // Home page data fetching with tanstack query
    const { isLoading, error, data: poast = [] } = useQuery({
        queryKey: ['postedData', searchQuery, sortByPopularity],
        queryFn: async () => {
            const endpoint = sortByPopularity
                ? `/posts/popularity?search=${searchQuery}&sortByPopularity=true`
                : `/addpost?search=${searchQuery}`;
            const res = await axiosPiblic(endpoint);
            return res.data;
        }
    });


    if (error) {
        return 'An error has occurred: ' + error.message;
    }


    return (
        <>
            <Bannar searchQuery={searchQuery} setSearchQuery={setSearchQuery}></Bannar>

            <div className='bg-gray-200 min-h-screen'>
                <div className='w-full flex flex-wrap items-center space-x-3 max-w-4xl p-2 mx-auto'>
                    <button
                        onClick={() => setSortByPopularity(!sortByPopularity)}
                        className="btn btn-primary ">
                        {sortByPopularity ? 'Sort by Newest' : 'Sort by Popularity'}
                    </button>
                    <div>
                        <button className="btn btn-sm">

                            <div className="badge badge-secondary">Technology</div>
                        </button>
                        <button className="btn btn-sm">

                            <div className="badge badge-secondary">Science</div>
                        </button>
                        <button className="btn btn-sm">

                            <div className="badge badge-secondary">Health</div>
                        </button>
                        <button className="btn btn-sm">

                            <div className="badge badge-secondary">Education</div>
                        </button>

                    </div>
                </div>
                {isLoading ? (
                    <div className="text-center my-10">
                        <Loader></Loader>;
                    </div>
                ) : poast?.length > 0 ? (
                    <div className="w-full max-w-4xl p-5 mx-auto space-y-6">

                        {poast?.map((item, index) => {
                            const filteredComments = coment.filter(c => c.comentId === item._id);

                            return (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <figure>
                                        <img
                                            src={item?.image}
                                            alt="Post Image"
                                            className="w-full h-96 object-cover"
                                        />
                                    </figure>
                                    <div className="p-5">
                                        <h2 className="text-xl font-bold text-gray-800">{item?.title}</h2>
                                        <p className="text-sm text-gray-600 mt-2">{item?.postDescription}</p>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    referrerPolicy='no-referrer'
                                                    src={item?.image || item?.image}
                                                    alt="Author"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <span className="text-md font-medium text-gray-800">{item?.authorName}</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className="text-md text-gray-500 ">{format(new Date(item?.carentTime), 'hh:mm:ss a')}</span>
                                                <span className='bg-lime-500/50  rounded-full font-bold text-center px-2'>{item?.tag}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap max-sm:space-y-2 justify-between items-center mt-4">
                                            <Link to={`/detals/${item?._id}`} className="btn btn-primary btn-sm">Details</Link>
                                            <button className="btn btn-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                                <div className="badge badge-secondary">{filteredComments.length}</div>
                                            </button>
                                            <div className="flex items-center space-x-4">
                                                <button className="btn btn-sm ">
                                                    upVote
                                                    <div className="badge badge-secondary">{item?.upVote}</div>
                                                </button>
                                                <button className="btn btn-sm">
                                                    downVote
                                                    <div className="badge badge-secondary">{item?.downVote}</div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center'>
                        <h3 className="text-center my-10 text-3xl font-bold">Data not Found</h3>
                        <FaDatabase size={50}></FaDatabase>
                    </div>
                )}
            </div>

        </>

    );
};

export default PostedData;
