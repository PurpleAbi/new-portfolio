function StarIcon(props){
    return(
        <img src="/assets/star.svg" alt="star" key={props.index} id={"star-"+ props.index}/>
    )
}

export default StarIcon