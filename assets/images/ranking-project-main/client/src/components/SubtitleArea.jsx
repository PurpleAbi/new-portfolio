function SubtitleArea(props) {
    return (
        <div className="subtitle">
            <h1 className="titles"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" className={"icon icon-tabler icons-tabler-outline " + props.iconName}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d={props.pathDone} />
                <path d={props.pathDtwo} />
            </svg>{props.title}</h1>
        </div>
    )
}

export default SubtitleArea