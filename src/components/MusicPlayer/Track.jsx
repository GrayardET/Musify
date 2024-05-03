import React from "react";

const Track = ({
  isPlaying,
  isActive,
  activeSong,
  forRelatedSongs = false,
}) => {
  const imgSrc = forRelatedSongs
    ? activeSong?.images?.coverart
    : activeSong?.attributes?.artwork?.url;

  const songTitle =
    (forRelatedSongs ? activeSong?.title : activeSong?.attributes?.name) ??
    "No active Song";

  const artistName =
    (forRelatedSongs
      ? activeSong?.subtitle
      : activeSong?.attributes?.artistName) ?? "No active Song";

  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img src={imgSrc} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">{songTitle}</p>
        <p className="truncate text-gray-300">{artistName}</p>
      </div>
    </div>
  );
};

export default Track;
