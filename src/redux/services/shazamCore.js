import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


    export const shazamCoreApi = createApi({
        reducerPath: 'shazamCoreApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core.p.rapidapi.com',
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-Key', 'c8bd22a896msh47889c3daa72347p123bf7jsnd3c78af252b7');
                headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com'); 
                return headers
            },
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({
                query: ()=> ("/v1/charts/world")
            }),
            getSongByGenre: builder.query({
                query: ({genreListId}) => (`v1/charts/genre-world?genre_code=${genreListId}`)
            }),
            getSongDetails: builder.query({
                query: ({songid}) => (`/v1/tracks/details?track_id=${songid}`)
            }),
            getSongRelated: builder.query({
                query: ({songid}) => (`/v1/tracks/related?track_id=${songid}`)
            }),
            getArtistDetails: builder.query({
                query: ({artistId}) => (`/v2/artists/details?artist_id=${artistId}`)
            }),
            getSongsByCountry: builder.query({
                query: ({country}) => (`/v1/charts/country?country_code=${country}`)
            }),
            getSongsBySearch: builder.query({
                query: ({searchTerm}) => (`/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`)
            })
        })
    });

    export const { 
        useGetTopChartsQuery, 
        useGetSongByGenreQuery,
        useGetSongDetailsQuery, 
        useGetSongRelatedQuery, 
        useGetArtistDetailsQuery, 
        useGetSongsByCountryQuery,
        useGetSongsBySearchQuery
    } = shazamCoreApi;

