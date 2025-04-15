import React from 'react'
import { Link } from 'react-router-dom'

function Album({ allAlbums }) {

    return (
        <>

            <div className="lg:px-50 lg:pt-10">
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white pt-10 text-center album-h1">
                    ALBUMS
                </h1>
                <h2 className="text-center text-gray-400 album-header-2 text-xl md:text-2xl pt-5 tracking-wider">
                    MUSIC THAT'S HOT AND HAPPENING!
                </h2>

                {
                    allAlbums ?
                        <div className="p-4">
                            <h3 className="album-header-1 text-white text-3xl md:text-4xl text-left pb-6 pt-14">
                                India’s Biggest Hits
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pb-4">
                                {allAlbums.map((album) => (
                                    <div
                                        key={album._id}
                                        className="cursor-pointer"
                                    >
                                        <div className="border border-white rounded-3xl overflow-hidden">
                                            <Link to={`/albums/${album._id}`}>
                                                <img
                                                    src={`${album.albumImage}`}
                                                    alt={album.artist}
                                                    className="w-full h-auto object-cover transition-all aspect-1/1 duration-300 hover:scale-[1.05] ease-in-out"
                                                    loading='lazy'
                                                />
                                            </Link>
                                        </div>
                                        <div className="font-semibold text-white mt-4 lg:text-2xl md:text-xl text-left">
                                            {album.artist}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <div className="flex items-center justify-center h-[60vh]">
                            <h1 className="album-header-1 text-gray-400 text-center text-2xl md:text-4xl">
                                No Albums Are Available.
                            </h1>
                        </div>

                }
            </div>


        </>
    )
}

export default Album