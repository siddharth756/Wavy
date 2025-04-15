import React from 'react'

function Loader() {
    return (
        <div className="flex justify-center items-center h-[60vh]">
      <div className="flex space-x-1">
        <div className="w-2 h-8 bg-blue-500 animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2 h-8 bg-blue-400 animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2 h-8 bg-blue-300 animate-pulse"></div>
      </div>
    </div>
    );
  }

export default Loader