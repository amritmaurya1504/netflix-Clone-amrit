import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./Row.css";

const base_link = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        }
        fetchData();
    }, [fetchUrl])

    // console.log(movies);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_images">

                {
                    movies.map((currElem) => {
                        return <img
                            key={currElem.id}
                            className={`img_div ${isLargeRow && "img_largediv"}`}
                            src={`${base_link}${isLargeRow ? currElem.poster_path : currElem.backdrop_path}`} alt={currElem.name} />
                    })
                }
            </div>

        </div>
    )
}

export default Row
