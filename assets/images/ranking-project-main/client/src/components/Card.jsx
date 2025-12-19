import { useState } from "react"
import Rating from "./Rating"
import FlipCard from "./FlipCard"

function Card(props) {

    const front = (
        <div className="card-content img-div">
            <img className="poster-img" src={props.posterUrl} alt="movie or series poster" />
            <div className="arrow-div">
                <p className="arrow-text">see my review </p>
                <img className="arrow-img" src="/assets/arrow-big-right-line.svg" alt="arrow to the right" />
            </div>
        </div>
    );

    const back = (
        <div className="card-content">
            <h3 className="titles">{props.title}</h3>
            {props.isOnGoing}
            <p>{props.reviewText}</p>
            <Rating setRating={props.rateNum} />
        </div>
    );
    return <FlipCard front={front} back={back} />;
}

export default Card