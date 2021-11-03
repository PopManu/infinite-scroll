import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SearchStickerContainer = styled.div`
    width: 100%;
    height: 70vh;
    overflow: scroll;
    position: absolute;
    top: 20%;
`;

const SearchLabel = styled.label`
    font-size: 25px;
    font-weight: bold;
`;

const SearchInput = styled.input`

`;


function SearchStickers() {
    const [photos, setPhotos] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [bottom, setBottom] = React.useState(false);
    const [query, setQuery] = React.useState(null);
    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        querySearch(null, page);
    }, []) 

    const querySearch = async (queryString, page) => {
        let config = {
            headers: {
                apiKey: '823bb74a52fb44f8590c87b3dfd8c4e8'
            }
        }

        if (queryString !== null) {
            await axios
                .get(`/v1/search?userId=9937&q=${queryString}&lang=en&pageNumber=${page}&limit=20`, config)
                .then(res => {
                if (res.data.body.stickerList !== null) {
                    setPhotos([...photos, ...res.data.body.stickerList]);
                }
            });
        }
    }

    const continueQuery = async (queryString, page) => {
        let config = {
            headers: {
                apiKey: '823bb74a52fb44f8590c87b3dfd8c4e8'
            }
        }

        if (bottom === true) {
            setPage(page + 1);
        }


        if (queryString !== null) {
            await axios
                .get(`/v1/search?userId=9937&q=${queryString}&lang=en&pageNumber=${page}&limit=20`, config)
                .then(res => {
                if (res.data.body.stickerList !== null || photos ==! null) {
                    setPhotos([...photos, ...res.data.body.stickerList]);
                }
            });
        }
    }

    const searchBar = () => {
        return (
            <form>
                <SearchLabel>
                    <span>search</span>
                </SearchLabel>
                <input 
                    type="text"
                    id="search"
                    placeholder="search stickers"
                    onChange={(e) => [setPhotos([]), setQuery(e.target.value), querySearch(e.target.value)]}
                    value={query}
                />
            </form>
        )
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        setBottom(true);
        if (bottom) {
            continueQuery(query, page);
            setBottom(false);
        }
    }

    return (
        <SearchStickerContainer onScroll={handleScroll}>
            {searchBar()}
            <div>
                <div style={{ minHeight: "100px" }}>
                    {photos && photos.map(user => (
                        <img src={user.stickerImg} height="200px" width="200px" />
                    ))}
                </div>        
                {bottom === true ? <div> Loading ... </div> : null}            
            </div>
        </SearchStickerContainer>
    );
}

export default SearchStickers;