import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
import { Loader, Error,SongCard } from "../components";

const AroundYou = () => {
    const [country, setCountry] = useState("CA");
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    var { data, isFetching, error } = useGetSongsByCountryQuery({ country });

    useEffect(() => {
        axios
            .get(
                `https://geo.ipify.org/api/v2/country?apiKey=at_uPCbO6V2iTvOcAlDGmdW6XCQmpDcA`
            )
            .then((res) => {
                setCountry(res?.data?.location?.country);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [country]);

    // console.log(data);
    // console.log(country);

    if (isFetching && loading)
        return <Loader title="Loading songs around you..." />;

    if (error && country) return <Error />;

    return (
        <div className="flex flex-col items-center md:min-w-[540px]">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Popular Songs in <span>{country}</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default AroundYou;
