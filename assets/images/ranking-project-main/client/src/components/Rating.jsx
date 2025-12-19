import StarIcon from "./StarIcon";

function Rating({setRating}) {
    const stars = Array.from({length: setRating}, (v, i) => i );

    return (
        <div className="rating">
            {stars.map( i => <StarIcon key={i} id={i}/>)}
        </div>
    );
}

export default Rating