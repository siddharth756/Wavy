import React from 'react'
import Album from '../components/Home/Album'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../features/album/albumSlice'

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAlbums())
    }, [dispatch]);

    const { allItems } = useSelector((state) => state.albums)

    return (
        <>
            <Album allItems={allItems} />
        </>
    )
}

export default Home
