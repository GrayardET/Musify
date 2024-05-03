import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader } from "../components";
import RelatedSongs from "../components/RelatedSongs";
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
  const oldTrackId =
    songData?.data?.length > 0 ? songData.data[0].id : undefined;
  const {
    data: relatedSongsData,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ oldTrackId });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, relatedSongsData, i) => {
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
          {songData?.resources?.lyrics[
            Object.keys(songData?.resources?.lyrics)[0]
          ]?.attributes?.text != null ? (
            songData?.resources?.lyrics[
              Object.keys(songData?.resources?.lyrics)[0]
            ]?.attributes?.text.map((line, i) => (
              <p className="text-gray-400 my-1 text-sm font-base" key={i}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-3xl">No Lyrics Found!</p>
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
