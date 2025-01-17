import React from 'react';
import PropTypes from 'prop-types';

const DynamicTitle = ({ title }) => {
    return (
        <div className='flex flex-col justify-center items-center pt-5'>
            <h1 className='md:text-4xl border-y-2 py-2 uppercase'>{title}</h1>
        </div>
    );
};

DynamicTitle.propTypes = {
 
    title: PropTypes.string.isRequired
};

export default DynamicTitle;