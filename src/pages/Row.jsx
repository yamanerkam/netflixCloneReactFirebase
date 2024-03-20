import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Movies from '../components/Movies';
import Slider from 'react-slick';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Row = ({ rowID, title, fetchURL }) => {
    const { user } = UserAuth()

    const { data, loading, error } = useFetch(fetchURL)
    const [movies,
        setMovies] = useState([])





    useEffect(() => {
        if (data) {
            setMovies(data.results)
        }
    }, [data])
    console.log(movies, rowID)

    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowID);
        if (slider.scrollLeft + slider.clientWidth === slider.scrollWidth) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
            return
        }
        console.log(slider.scrollLeft + slider.clientWidth, slider.scrollWidth)

        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        var slider = document.getElementById('slider' + rowID);
        console.log(slider.scrollLeft + slider.clientWidth, slider.scrollWidth)
        if (slider.scrollLeft + slider.clientWidth + 1 >= slider.scrollWidth) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
            return
        }
        slider.scrollLeft = slider.scrollLeft + 500;
    };





    return (
        <>

            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>


                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
                <div id={'slider' + rowID}
                    className='w-full h-full overflow-x-scroll  whitespace-nowrap scroll-smooth scrollbar-hide relative'>

                    {movies && (movies.map((movie, id) => (


                        movie.title !== 'Kung Fu Panda 4' && < Movies key={movie.id} item={movie} ></Movies>





                    )
                    ))}


                </div>




                <MdChevronRight
                    onClick={slideRight}
                    className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
            </div >



        </>

    )
}

export default Row