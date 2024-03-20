import React, {useEffect, useState} from 'react'
import useFetch from '../hooks/useFetch'
import requests from '../Request'
const Main = () => {
    const [movies,
        setMovies] = useState([])
    const [film,
        setFilm] = useState()
    const {data, loading, error} = useFetch(requests.requestPopular)

    const truncateString = (str, num) => {
        if (str
            ?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    useEffect(() => {
        if (data) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const film = data.results[randomIndex]
            setFilm(film)
            setMovies(data.results)
        }
    }, [data])
    console.log(movies, film)

    return (
        <React.Fragment>
            {film && (
                <div className='w-full h-[600px] text-white'>
                    <div className='w-full h-full'>
                        <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
                        <img
                            className='w-full h-full object-cover'
                            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
                            alt={film.title}/>
                        <div className='absolute w-full top-[20%] p-4 md:p-8'>
                            <h1 className='text-3xl md:text-5xl font-bold'>{film.title}</h1>
                            <div className='my-4'>
                                <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
                                    Play
                                </button>
                                <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
                                    Watch Later
                                </button>
                            </div>
                            <p className='text-gray-400 text-sm'>
                                Released: {film.release_date}
                            </p>

                            <p
                                className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                                {truncateString(film
                                    ?.overview, 150)}
                            </p>

                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );

}

export default Main

/*
 */