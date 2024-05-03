import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50
        group-hover:flex ${
          activeSong?.id === song?.id ? "flex bg-black bg-opacity-70" : "hidden"
        }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        </div>
        {song?.attributes.artwork.url ? (
          <img alt="songCover" src={song?.attributes.artwork.url} />
        ) : (
          <div className="h-56 text-gray-300 text-3xl text-center">
            Not Available
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col">
        <p className="text-base text-white/90 font-semibold truncate">
          <Link to={`/songs/${song?.id}`}>{song?.attributes?.name}</Link>
        </p>
        <p className="text-sm text-gray-400 truncate mt-0.5">
          <Link
            to={
              song?.relationships?.artists?.data?.[0]?.id
                ? `/artists/${song?.relationships?.artists?.data?.[0]?.id}`
                : "/top-artists"
            }
          >
            {song?.attributes?.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
export {};
