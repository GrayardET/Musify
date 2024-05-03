import { SongCard, Error, Loader } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Search = () => {
    const { searchTerm } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => (state.player));
    const {data, isFetching, error} = useGetSongsBySearchQuery({searchTerm});
    const songs = data?.tracks?.hits?.map((song)=>song.track);
    
    if (isFetching) return <Loader title="Loading songs..."/>
    if (error) return <Error /> 
    // console.log(data);

    return (
        <div className="flex flex-col md:min-w-[540px]">
            <div className="w-full flex items-center justify-center pt-4 pb-10 sm:flex-row flex-col">
                <h2 className="font-bold text-white text-3xl ">
                  Showing results for <span className="font-black">{searchTerm}</span>
                </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {songs?.map((song, index) => {
                    return (<SongCard 
                        key={song.id} 
                        song={song} 
                        i={index}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                    />)
                })}
            </div>
        </div>
    );
};

export default Search;
