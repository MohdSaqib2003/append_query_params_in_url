import React from 'react';

const Card = ({ data }) => {
    return (
        <>
        <div className="card" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', width: '30%' }}>
            <img src={`https://stage.leevcb.oslabs.app/${data._source.card_image}`} alt="Avatar" style={{width:"100%", objectFit:'cover'}} />
            <div className="container" style={{ padding: '2px 16px' }}>
                <h4><b>{data._source.title}</b></h4>
                <p> {data._source.summary} </p>
            </div>
        </div> <br />
        </>
    );
}
export default Card;