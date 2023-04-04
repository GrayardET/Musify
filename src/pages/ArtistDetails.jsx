import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, ArtistTopSongs } from "../components";
import {
   useGetArtistDetailsQuery 
} from "../redux/services/shazamCore";
import ArtistDescription from '../components/ArtistDescription';


const ArtistDetails = () => {
    const { id: artistId } = useParams();
    // console.log(artistId);
    const { data, isFetching: isFetchingArtistDetails, error } =
      useGetArtistDetailsQuery({ artistId });

    var artistData = data?.data?.[0]; 
    // console.log("artistData :");
    // console.log(artistData);

    var artistTopSongs = artistData?.views?.["top-songs"]?.data;
    console.log(`artistTopSongs:`);
    console.log(artistTopSongs);

    if (isFetchingArtistDetails) {
        return <Loader title="Searching for artist details" />;
    }

    if (error) return <Error />;

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} artistData={artistData} />
            <ArtistDescription artistData={artistData}/>
            <div className="pt-8">
            <div className="flex flex-row items-center w-full md:pl-6 md:pr-16 mb-8 bg-gradient-to-l from-transparent to-black h-20 " >
              <h3 className=" text-white text-2xl font-bold">Related Songs:</h3>
            </div>
            
              {artistTopSongs 
              ? artistTopSongs.map((song, i)=>(
                <ArtistTopSongs 
                  key={song.id}
                  song={song}
                  i={i}
                />
              ))
              : <h3>Sorry, we cannot find other songs from the artist!</h3>
              }
            </div>
        </div>
    );
};

export default ArtistDetails;
