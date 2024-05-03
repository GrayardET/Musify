// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import PalyerPause from './PlayPause';
// import{ playPause, setActiveSong} from '../redux/features/playerSlice' 
// import PlayPause from './PlayPause';


const ArtistTopSongs = ({song, i}) => {
  return (
    <div className={`w-full flex flex-row items-center bg-[#4c426e] bg-transparent pt-1 p-4 rounded-lg cursor-pointer mb-2 gap-8 justify-between`}>
        <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
        <div className="flex-1 flex flex-row items-center">
            <img
                className="w-20 h-20 rounded-lg"
                src={song?.attributes?.artwork?.url}
                alt="image"
            />
            <div className="flex-1 flex flex-col mx-3">
                <p className="text-lg font-bold text-white">
                    {song?.attributes?.name}
                </p>
            
                <p className="text-base font-semibold text-gray-300 mt-1">
                    {song?.attributes?.albumName}
                </p>
            </div>
        </div>
    </div>
  )
}

  

export default ArtistTopSongs; 
