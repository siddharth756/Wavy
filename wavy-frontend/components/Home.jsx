import React from 'react'
import Album from '../components/Home/Album'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums, fetchTracks } from '../features/musicSlice'

function Home() {
    const dispatch = useDispatch()
    const { allAlbums, hasFetchedAlbums, allTracks, hasFetchedTracks } = useSelector((state) => state.albums)

    useEffect(() => {
        if (!allAlbums && !hasFetchedAlbums) {
            dispatch(fetchAlbums())
        }
        if (!allTracks && !hasFetchedTracks) {
            dispatch(fetchTracks())
        }
    }, [allAlbums, hasFetchedAlbums, allTracks, hasFetchedTracks, dispatch]);

    return (
        <>
            <Album allAlbums={allAlbums} />
        </>
    )
}

export default Home
