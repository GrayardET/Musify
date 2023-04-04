import { SongCard, Error, Loader } from "../components";
import { genres } from "../assets/constants";
import { useGetSongByGenreQuery } from "../redux/services/shazamCore";
import { useSelector, useDispatch } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

// import processData from "../components/ProcessData"

function mapGenere(x) {
    return (
        <option key={x.value} value={x.value}>
            {x.title}
        </option>
    );
}

const Discover = () => {
    const dispatch = useDispatch();
    // console.log("Discover re-rendered");
    const { activeSong, isPlaying, genreListId } = useSelector(
        (state) => state.player
    );
    const { data, isFetching, error } = useGetSongByGenreQuery({genreListId});

    if (isFetching) return <Loader title="Loading songs..." />;
    if (error) return <Error />;

    return (
        <div className="flex flex-col md:min-w-[540px]">
            <div className="w-full flex flex-col items-center justify-around gap-2 mb-8">
                <h2 className="flex font-bold text-white text-3xl ">
                    Discover
                </h2>
                <select
                    onChange={(e) =>
                        dispatch(selectGenreListId(e.target.value))
                    }
                    value={genreListId || "pop"}
                    className="flex text-gray-300 bg-black text-sm rounded-md p-2 outline-none"
                >
                    {genres.map((genre) => {
                        return mapGenere(genre);
                    })}
                </select>
            </div>

            <div className="flex flex-wrap  justify-center gap-8">
                {data?.map((song, index) => {
                    return (
                        <SongCard
                            key={song.key}
                            song={song}
                            i={index}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Discover;
