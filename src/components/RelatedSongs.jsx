import SongBar from  './SongBar';
const RelatedSongs = ({data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-2xl text-white">Related Songs:</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i)=>(
        <SongBar 
          data={data}
          key={`${song.key}-${artistId}-${i}`}
          song={song}
          i={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
