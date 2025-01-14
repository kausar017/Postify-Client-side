import { useQuery, } from '@tanstack/react-query'
import useAxiosPiblic from '../../AllHooks/useAxiosPiblic';


const PostedData = () => {

    const axiosPiblic = useAxiosPiblic()


    const { isPending, error, data: post } = useQuery({
        queryKey: ['postedData'],
        queryFn: async () => {
            const res = await axiosPiblic('/addpost')
            return res;
        }
    })
    console.log(post);

    if (isPending) {
        return <p>Loading............</p>
    }

    return (
        <div>

        </div >
    );
};

export default PostedData;