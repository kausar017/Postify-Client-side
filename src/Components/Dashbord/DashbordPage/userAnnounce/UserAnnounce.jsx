import React from 'react';
import DynamicTitle from '../../../Shared/DynamicTitle/DynamicTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../AllHooks/axiosSecure/useAxiosSecure';

const UserAnnounce = () => {
    const axiosSecure = useAxiosSecure()
    const { data: announcements = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcement')
            refetch()
            return res.data;
        }
    })
    // console.log(announcements);

    return (


        <div>
            <DynamicTitle title='Announcement' />


            {announcements?.length > 0 && (
                <div className="mt-8 w-full max-w-7xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
                    {announcements?.map((announcement, index) => (
                        <div key={index} className="card card-bordered mb-4 shadow-md">
                            <div className="card-body">
                                <div className="flex items-center">
                                    <img
                                        src={announcement?.image}
                                        alt="Author"
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h3 className="font-medium">{announcement?.Title}</h3>
                                        <p className="text-sm text-gray-500">By: {announcement?.Author_Name
                                        }</p>
                                    </div>
                                </div>
                                <p className="mt-2">{announcement?.Description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserAnnounce;