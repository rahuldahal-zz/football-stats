import React from 'react';

const LeagueCard = ({league})=>{
    const imgSrc = league.toLowerCase().replace(" ", "");
    return (
        <button className="leagues__button clickable" title={league}>
            <img 
                src={`https://footballstats.tk/assets/images/${imgSrc}.png`} 
                alt={`${league} logo`} 
                className="leagues__image"
            />
        </button>
    )
}

export default LeagueCard;