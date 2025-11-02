import React from 'react'

const PostAReview = ({ isModelOpen, handleClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModelOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='bg-white p-6 rounded-md shadow-lg w-96 z-50'>
        <h2 className='text-lg font-medium mb-4'>POST A REVIEW</h2>
        <div className='flex items-center mb-4'>
            {
                [1,2,3,4,5].map((star)=>(
                    <span>
                        {
                            rating>=star?(<i className='ri-start-fill'></i>):(<i className='ri-start-line'></i>)
                        }
                    </span>
                ))
            }
        </div>

      </div>
    </div>
  );
};

export default PostAReview;
