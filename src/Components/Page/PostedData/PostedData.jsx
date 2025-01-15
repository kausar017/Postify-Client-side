import { useQuery } from '@tanstack/react-query'
import useAxiosPiblic from '../../AllHooks/useAxiosPiblic';
import { format } from 'date-fns';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const PostedData = () => {

    const axiosPiblic = useAxiosPiblic()

    const { isPending, error, data: poast = [] } = useQuery({
        queryKey: ['postedData'],
        queryFn: async () => {
            const res = await axiosPiblic('/addpost')
            return res.data;
        }
    })

    console.log(poast);

    if (isPending) {
        return <Loader></Loader>
    }

    if (error) {
        return 'An error has occurred: ' + error.message
    }



    return (
        <div className='bg-gray-200'>
            {
                poast?.length > 0 ? (
                    <div className="w-full max-w-4xl p-5 mx-auto space-y-6">
                        {poast.map((item, index) => (
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
                                    <div className="flex item?s-center justify-between mt-4">
                                        <div className="flex items-center space-x-2">
                                            <img
                                                referrerPolicy='no-referrer'
                                                src={item?.userPhoto || item?.userPhoto}
                                                alt="Author"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <span className="text-md font-medium text-gray-800">{item?.authorName}</span>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className="text-md text-gray-500 ">{format(item?.carentTime, 'HH:mm:ss')}</span>
                                            <span>{item?.tag}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <Link to={`/detals/${item?._id}`} className="btn btn-primary btn-sm">Read More</Link>
                                        <p>{'coment.length'}</p>
                                        <div className="flex items-center space-x-4">

                                            <p className="btn btn-sm btn-outline btn-success">
                                                upVote {item?.upVote}
                                            </p>
                                            <button className="btn btn-sm btn-outline btn-error">
                                                downVote {item?.downVote}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h3 className="text-center text-gray-500 my-10 text-3xl">Data not Found</h3>
                )
            }

        </div>
    );
};

export default PostedData;
