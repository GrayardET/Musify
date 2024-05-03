import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.attributes;

  const artworkUrl =
    songData?.resources["shazam-songs"][
      Object.keys(songData.resources["shazam-songs"])[0]
    ]?.attributes?.artwork?.url;

  const songTitle =
    songData?.resources["shazam-songs"][
      Object.keys(songData.resources["shazam-songs"])[0]
    ]?.attributes?.title;

  const artistName = songData
    ? Object.values(songData?.resources?.artists)[0]?.attributes?.name
    : artist?.artistName;

  const artistAdamId = songData
    ? Object.values(songData?.resources?.artists)[0]?.id
    : artist?.artistAdamId;

  return (
    <div className="relative w-full flex flex-col mb-6">
      {/* <h2 className="text-white text-2xl font-semibold mb-2">Albumn:</h2> */}
      <div className="flex flex-row items-center w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28 ">
        <div className="inset-0 flex flex-row items-center">
          <img
            alt="art"
            src={
              artistId
                ? artist?.artwork?.url
                    .replace("{w}", "500")
                    .replace("{h}", "500")
                : artworkUrl
            }
            className="sm:w-44 w-28 sm:h-44 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />

          <div className="ml-5">
            <p className="text-white font-bold sm:text-3xl text-xl ">
              {" "}
              {artistId ? artist?.name : songTitle}
            </p>
            {!artistId && (
              <Link to={`/artists/${artistAdamId}`}>
                <p className="text-base text-gray-400 mt-2">{artistName}</p>
              </Link>
            )}

            <p className="text-base text-gray-400 mt-2">
              {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
