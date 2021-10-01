import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class TrendingStickers extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            loading: false,
            page: 1,
            prevY: 0
        }
        this.handleObserver = this.handleObserver.bind(this);
    }

    componentDidMount() {
        this.getPhotos(this.state.page);
        console.log('page: ', this.state.page);

        var options = {
          root: null,
          rootMargin: "0px",
          threshold: 1.0
        };
        
        // this.observer = new IntersectionObserver(
        //   this.handleObserver.bind(this),
        //   options
        // );
        // this.observer.observe(this.loadingRef);
    }

    getPhotos(page) {
        this.setState({ loading: true});
        console.log('page: ', page);
        let config = {
            headers: {
                apiKey: '823bb74a52fb44f8590c87b3dfd8c4e8'
            }
        }

        axios
        //   .get(`/v1/search?userId=9937&q=cute&lang=en&pageNumber=${page}&limit=20`, config)
        .get(`/v1/package?userId=9937&pageNumber=${page}&lang=en&countryCode=US&limit=10`, config)
          .then(res => {
            this.setState({ photos: [...this.state.photos, ...res.data.body.packageList] });
            this.setState({ loading: false });
          });
      }

    handleObserver(page) {
        console.log('AAAAH');
        this.setState({page: page + 1})
        let config = {
            headers: {
                apiKey: '823bb74a52fb44f8590c87b3dfd8c4e8'
            }
        }

        axios
        .get(`/v1/package?userId=9937&pageNumber=${this.state.page}&lang=en&countryCode=US&limit=10`, config)
          .then(res => {
            this.setState({ photos: [...this.state.photos, ...res.data.body.packageList] });
            this.setState({ loading: false });
          });
        
    }

    render() {
        return (
            <div 
                style={{
                    width: '300px',
                    height: '400px',
                    overflow: 'scroll'
                }}
            >
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.handleObserver}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}

                >
                    <div style={{ minHeight: "100px" }}>
                        {this.state.photos.map(user => (
                            <img src={user.packageImg} height="100px" width="100px" />
                        ))}
                    </div>
                </InfiniteScroll>
                {/* <div style={{ minHeight: "100px" }}>
                    {this.state.photos.map(user => (
                        <img src={user.packageImg} height="100px" width="100px" />
                    ))}
                </div> */}
                {/* <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                >
                    <span style={loadingTextCSS}>Loading...</span>
                </div> */}
            </div>
        );
    }
}

export default TrendingStickers;