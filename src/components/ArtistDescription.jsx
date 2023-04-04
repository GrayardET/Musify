import { React } from 'react';
import parse from 'html-react-parser';

const ArtistDescription = ({artistData}) => {

    return (
        <div className="mt-5 flex flex-col">
            {artistData?.attributes?.artistBio? (
                <div className="text-gray-300 text-justify leading-loose md:pl-6 md:pr-16">{parse(artistData.attributes.artistBio)}</div>
            ) : (
                <p className="text-gray-300 text-xl py-1">
                    No Description Found!
                </p>
            )}
        </div>
    )
}

export default ArtistDescription;