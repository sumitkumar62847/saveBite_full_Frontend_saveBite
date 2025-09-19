import React from 'react';

function Loader({searchByAi}) {
  return (
        <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-white/60 z-50">
            {searchByAi && <h1 className='text-2xl text-green-400'>We Search By Ai Please Wait</h1>}
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
  );
}

export default Loader;