import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { key } from '../Request';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { doc, getDoc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
const Movies = ({ item }) => {
    const { user } = UserAuth()
    const [like,
        setLike] = useState(false)

    const getUserdetails = async () => {
        const docRef = doc(db, "users", user.email)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data())
            docSnap
                .data()
                .savedShows
                .map(show => {
                    console.log(show)

                    if (show.title === item.title) {
                        console.log(show)
                        setLike(true)

                    }
                });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!")
        }
    }

    useEffect(() => {
        if (user && user.email) {
            getUserdetails()
        }
    }, [user])

    async function likeORdislike(itemTitle) {
        if (like) {
            console.log(user.email);
            const docRef = doc(db, 'users', user.email);
            const docSnap = await getDoc(docRef);
            const likedShow = itemTitle;
            const updatedShows = docSnap
                .data()
                .savedShows
                .filter(show => show.title !== likedShow);
            console.log(updatedShows);
            await updateDoc(docRef, { savedShows: updatedShows });

            console.log(docSnap.data());
            setLike(false)
        } else {

            console.log(user.email)
            const docRef = doc(db, 'users', user.email);
            const docSnap = await getDoc(docRef);
            const likedShow = itemTitle
            const updatedShows = [
                ...docSnap
                    .data()
                    .savedShows,
                likedShow
            ];
            console.log(updatedShows)
            await updateDoc(docRef, {
                savedShows: arrayUnion({ id: item.id, title: item.title, img: item.backdrop_path })
            });
            console.log(docSnap.data())
            setLike(true)
        }
    }

    useEffect(() => {
        console.log(like)
    }, [like])

    const trailer = () => {
        console.log('i')
    }

    return (
        <>
            <div
                className='w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] inline-block cursor-pointer relative p-2'>
                <img
                    className='w-96 h-96 sm:w-64 sm:h-64 object-cover rounded-lg transition duration-500 ease-in-out transform hover:scale-110'
                    src={`https://image.tmdb.org/t/p/w500/${item
                        ?.backdrop_path}`}
                    alt={item.title} />

                <div
                    className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>

                    <p
                        className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                        {item.title}
                    </p>

                    {like
                        ? (
                            <FaHeart
                                onClick={((e) => likeORdislike(item.title))}
                                className='absolute top-4 left-4 text-gray-300'></FaHeart>
                        )
                        : (
                            <FaRegHeart
                                onClick={((e) => likeORdislike(item.title))}
                                className='absolute top-4 left-4 text-gray-300'></FaRegHeart>
                        )}

                </div>
            </div>
        </>
    )
}

export default Movies