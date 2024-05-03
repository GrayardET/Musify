import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({
  song,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
  data,
}) => {
  return isPlaying && activeSong?.id === song?.id ? (
    <FaPauseCircle onClick={handlePause} size={35} className="text-gray-300" />
  ) : (
    <FaPlayCircle onClick={handlePlay} size={35} className="text-gray-300" />
  );
};

export default PlayPause;
