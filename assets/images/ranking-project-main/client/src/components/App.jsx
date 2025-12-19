import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import SubtitleArea from './SubtitleArea';
import YearSelection from './YearSelection';
import { getData } from '../../service/api';

function App() {
    const [endpointValue, setEndpointValue] = useState("topRated");
    const [reviews, setReviews] = useState({ movies: [], series: [] });
    const cardsRef = useRef(null);

    // Handle year change from the dropdown
    function handleYearChange(newValue) {
        setEndpointValue(newValue);

        // Update path segment and push to history
        const newUrl = `/${newValue}`;
        window.history.pushState({ year: newValue }, '', newUrl);

        cardsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    // Listen to browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event) => {
            const yearFromState = event.state?.year;
            if (yearFromState) {
                setEndpointValue(yearFromState);
            } else {
                // Fallback: extract year from path
                const pathYear = window.location.pathname.slice(1);
                setEndpointValue(pathYear || 'topRated');
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Read initial year from path on mount
    useEffect(() => {
        const pathYear = window.location.pathname.slice(1); // remove leading /
        setEndpointValue(pathYear || 'topRated');
    }, []);

    // Fetch data whenever endpointValue changes
    useEffect(() => {
        console.log('[App] fetching for endpointValue:', endpointValue);
        getData(endpointValue)
            .then(data => {
                console.log('[App] fetched data:', data);
                if (data && data.movies && data.series) {
                    setReviews(data);
                } else {
                    console.warn('[App] Unexpected data format:', data);
                    setReviews({ movies: [], series: [] });
                }
            })
            .catch(err => {
                console.error('[App] getData failed:', err);
                setReviews({ movies: [], series: [] });
            });
    }, [endpointValue]);

    return (
        <>
            <div className="home">
                <a href="https://abismportfolio.netlify.app/">
                    <img className="house-img" src="/assets/home.svg" alt="Homepage icon link" />
                </a>
            </div>

            <div className="container">
                <div className="title-page">
                    <div className="text">
                        <h1 className="titles">Movies and Series Reviews according to Abi</h1>
                        <h2>
                            ...what I watched in
                            <YearSelection currentValue={endpointValue} onYearChange={handleYearChange} />
                        </h2>
                    </div>
                </div>

                <div className="cards" ref={cardsRef} >
                    <SubtitleArea
                        title="Series"
                        iconName="icon-tabler-device-tv"
                        pathDone="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                        pathDtwo="M16 3l-4 4l-4 -4"
                    />

                    {reviews.series.map(r => (
                        <Card
                            key={r.id}
                            title={r.title}
                            isOnGoing={r.ongoing ? <small>ongoing</small> : null}
                            reviewText={r.abisReview}
                            rateNum={r.abisRating}
                            posterUrl={r.posterUrl}
                        />
                    ))}


                    <SubtitleArea 
                        title="Movies"
                        iconName="icon-tabler-video"
                        pathDone="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"
                        pathDtwo="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
                    />

                    {reviews.movies.map(r => (
                        <Card
                            key={r.id}
                            title={r.title}
                            isOnGoing={r.sequel}
                            reviewText={r.abisReview}
                            rateNum={r.abisRating}
                            posterUrl={r.posterUrl}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
