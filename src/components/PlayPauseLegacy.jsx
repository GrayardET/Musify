import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

const PlayPauseLegacy = ({song, isPlaying, activeSong, handlePause, handlePlay, data}) => {
  return (
    isPlaying && activeSong?.key === song.key ? (
      <FaPauseCircle 
        onClick={handlePause}
        size={35}
        className="text-gray-300"
      />
    ) : (
      <FaPlayCircle 
        onClick={handlePlay}
        size={35}
        className="text-gray-300"
      />
    )
  );
}

export default PlayPauseLegacy;
