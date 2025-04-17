import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from "../Loader"

function Album() {

    const allAlbums = useSelector(state => state.albums.allAlbums)
    const albumLoading = useSelector(state => state.albums.albumLoading)

    return (
        <>
            <div className="px-4 lg:px-16 py-10">
                <h1 className="font-bold text-4xl md:text-5xl text-white text-center album-h1">
                    ALBUMS
                </h1>
                <h2 className="text-center text-gray-400 album-header-2 text-xl pt-5 tracking-wider">
                    MUSIC THAT'S HOT AND HAPPENING!
                </h2>

                {
                    albumLoading ? <Loader /> :
                        <div className="pt-8">
                            <h3 className="text-white text-bold text-2xl md:text-3xl text-left pb-6">
                                INDIAS BIGGEST HITS
                            </h3>

                            {/* Horizontal scrollable album list */}
                            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent pb-4">

                                {allAlbums.map((album) => (
                                    <div
                                        key={album._id}
                                        className="flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] cursor-pointer"
                                    >
                                        <div className="rounded-2xl overflow-hidden border border-white aspect-square">
                                            <Link to={`/albums/${album._id}`}>
                                                <img
                                                    src={`${album.albumImage}`}
                                                    alt={album.artist}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 ease-in-out"
                                                    loading="lazy"
                                                />
                                            </Link>
                                        </div>
                                        <div className="font-semibold text-white mt-2 text-sm sm:text-base lg:text-lg text-left truncate">
                                            {album.artist}
                                        </div>
                                        <div className="text-white mt-2 text-sm sm:text-base text-left opacity-75 truncate">
                                            {album.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default Album