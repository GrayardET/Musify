import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import "swiper/css"
import "swiper/css/free-mode"

const TopChartCard = ({song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => (
  <div className="w-full flex flex-row items-center
  text-white text-base font-semibold hover:bg-[#4c426e] py-2 p-5 rounded-lg cursor-pointer mb-2 truncate">
    <h3 className="text-white pr-3">{i+1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center ">
      <img src={song?.images?.coverart} className="w-20 rounded-lg"></img>

      <div className="flex-auto flex flex-col justify-start mx-3 truncate">
        <Link to={`/songs/${song?.id}`}>
          <p className="font-semibold text-lg truncate">{song?.attributes?.name}</p>
        </Link>
        {/* <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 truncate">{song?.attributes?.artistName}</p>
        </Link> */}
      </div>
      <div className="flex flex-none">
        <PlayPause
          song = {song}
          isPlaying = {isPlaying}  
          activeSong = {activeSong}
          handlePause = {handlePauseClick}
          handlePlay = {handlePlayClick}
        />
        </div>
    </div>
    {/* <div className="flex-1 flex flex-row justify-start items-start"></div> */}
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const topPlays = data?.slice(0, 5);
  const topRef = useRef(null); // used to scroll to the top
  

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }
  
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  }

  useEffect(()=>{
    topRef.current.scrollIntoView({
      behavior: "smooth"
    });
  });


  return(
    <div ref={topRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      {/* <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
        <h2 className="text-white text-xl font-bold">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.id} 
              song={song} 
              i={i} 
              activeSong = {activeSong}
              isPlaying = {isPlaying}
              handlePauseClick = {handlePauseClick}
              handlePlayClick = {() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div> */}

      {/* <div className="w-full flex flex-col mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.slice(0, 5).map((artist) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${artist?.artists[0].adamid}`}>
                <img src={artist?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </div>
  )
};

export default TopPlay;
