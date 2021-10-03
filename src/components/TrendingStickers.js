import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'

const TrendingStickerContainer = styled.div`
    width: 100%;
    height: 70vh;
    overflow: scroll;
    position: absolute;
    top: 20%;
`;

function TrendingStickers() {
    const [photos, setPhotos] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [bottom, setBottom] = React.useState(false);

    React.useEffect(() => {
        getPhotos(page);
    }, []) 

    const getPhotos = (page) =>  {
        console.log('nooo')
        let config = {
            headers: {
                apiKey: '823bb74a52fb44f8590c87b3dfd8c4e8'
            }
        }
        if (bottom === true) {
            setPage(page + 1);
        }
        axios
        .get(`/v1/package?userId=9937&pageNumber=${page}&lang=en&countryCode=US`, config)
          .then(res => {
            setPhotos([...photos, ...res.data.body.packageList]);
          });
      }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        setBottom(true);
        if (bottom) {
            getPhotos(page);
            setBottom(false);
        }
    }

    return (
        <TrendingStickerContainer onScroll={handleScroll}>
            <div style={{ minHeight: "100px"}}>
                {photos.map(user => (
                    <img src={user.packageImg} height="200px" width="200px" />
                ))}
            </div>
            {bottom === true ? <div> Loading ... </div> : null}
        </TrendingStickerContainer>
    );
}

export default TrendingStickers;