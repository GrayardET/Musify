import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader } from "../components";
import RelatedSongs from '../components/RelatedSongs'
import { useSelector, useDispatch } from "react-redux";
import {
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongDetails } =
        useGetSongDetailsQuery({ songid });
    const {
        data: relatedSongsData,
        isFetching: isFetchingRelatedSongs,
        error,
    } = useGetSongRelatedQuery({ songid });
    // console.log("songData :");
    // console.log(songData);
    
    // console.log("relatedSongData :");
    // console.log(relatedSongsData);

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = (song, relatedSongsData ,i) => {
        dispatch(setActiveSong({ song, data: relatedSongsData, i }));
        dispatch(playPause(true));
    };

    if (isFetchingSongDetails || isFetchingRelatedSongs) {
        return <Loader title="Searching for song details" />;
    }

    if (error) return <Error />;

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData} />
            <div className="mb-10">
                <h2 className="text-2xl text-white font-semibold">Lyrics:</h2>

                <div className="mt-5">
                    {songData?.sections[1].type === "LYRICS" ? (
                        songData?.sections[1].text.map((line, i) => (
                            <p className="text-gray-400 my-1 text-sm font-base">
                                {line}
                            </p>
                        ))
                    ) : (
                        <p className="text-gray-400 text-3xl">
                            No Lyrics Found!
                        </p>
                    )}
                </div>
            </div>
            <div>
                <RelatedSongs
                    data={relatedSongsData}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={handlePlayClick}
                    // artistId={}
                />
            </div>
        </div>
    );
};

export default SongDetails;
