

function YearSelection({ currentValue , onYearChange }) {
    return (
        <select name="years" id="select-year" className="years" value={currentValue}
                onChange={e => onYearChange && onYearChange(e.target.value)} >
            <option value="topRated"> ? </option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
        </select>
    )
}

export default YearSelection