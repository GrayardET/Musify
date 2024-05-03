import { SongCard, Error, Loader } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useSelector, useDispatch } from "react-redux";
// import processData from "../components/ProcessData"


const TopCharts = () => {
    const dispatch = useDispatch();
    // console.log("Discover re-rendered");
    const { activeSong, isPlaying } = useSelector((state) => (state.player));
    const {data, isFetching, error} = useGetTopChartsQuery();
    
    if (isFetching) return <Loader title="Loading songs..."/>
    if (error) return <Error /> 
    // console.log(data);

    return (
        <div className="flex flex-col">
            <div className="w-full flex items-center justify-center pt-4 pb-10 sm:flex-row flex-col">
                <h2 className="font-bold text-white text-3xl ">Top Charts</h2>
            </div>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, index) => {
                    return <SongCard 
                        key={song.id} 
                        song={song} 
                        i={index}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                    />
                })}
            </div>
        </div>
    );
};

export default TopCharts;
