import { useSelector } from 'react-redux';

const useAlbumWithTracks = (id) => {

    const allAlbums = useSelector((state) => state.albums.allAlbums);
    const allTracks = useSelector((state) => state.albums.allTracks);

    const album = allAlbums.find((album) => album._id === id)
    const tracks = allTracks.filter((track) => track.albumId === id)

    return { album, tracks };
};

export default useAlbumWithTracks;