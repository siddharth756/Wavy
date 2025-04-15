import { useSelector } from 'react-redux';

const useAlbumWithTracks = (id) => {

    const allAlbums = useSelector((state) => state.music.allAlbums);
    const allTracks = useSelector((state) => state.music.allTracks);

    const album = allAlbums.find((album) => album._id === id)
    const tracks = allTracks.filter((track) => track.albumId === id)

    return { album, tracks };
};

export default useAlbumWithTracks;