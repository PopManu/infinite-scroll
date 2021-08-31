import React, { Component } from 'react';
import axios from 'axios';

class TrendingStickers extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            loading: false,
            page: 1,
            query: '',
            prevY: 0
        }
    }

    componentDidMount() {
        this.getPhotos(this.state.page);
        console.log("Photos State: ", this.state.photos);

        var options = {
          root: null,
          rootMargin: "0px",
          threshold: 1.0
        };
        
        this.observer = new IntersectionObserver(
          this.handleObserver.bind(this),
          options
        );
        this.observer.observe(this.loadingRef);
    }

    querySearch(e) {
        e.preventDefault();

        this.setState({ loading: true });
        let config = {
            headers: {
                apiKey: '823bb74a52fb44f8590c87b3dfd8c4e8'
            }
        }

        axios
            .get(`/v1/search?userId=9937&q=${this.state.query}&lang=en&pageNumber=1&limit=20`, config)
            .then(res => {
            console.log("Photos State: ", res.data.body.stickerList);
            this.setState({ photos: [...this.state.photos, ...res.data.body.stickerList] });
            this.setState({ loading: false });
        });

    }


    getPhotos(page) {
        this.setState({ loading: true });
        let config = {
            headers: {
                apiKey: '823bb74a52fb44f8590c87b3dfd8c4e8'
            }
        }

        axios
          .get(`/v1/search?userId=9937&q=${this.state.query}&lang=en&pageNumber=${page}&limit=20`, config)
          .then(res => {
            console.log("Photos State: ", res.data.body.stickerList);
            this.setState({ photos: [...this.state.photos, ...res.data.body.stickerList] });
            this.setState({ loading: false });
          });
      }

      handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
          const lastPhoto = this.state.photos[this.state.photos.length - 1];
        //   const curPage = lastPhoto.packageId;
          this.getPhotos(this.state.page + 1);
          this.setState({ page: this.state.page + 1 });
        }
        this.setState({ prevY: y });
      }

    searchBar = () => {
        return (
            <form>
                <label>
                    <span>search</span>
                </label>
                <input 
                    type="text"
                    id="search"
                    placeholder="search stickers"
                    onChange={(e) => this.setState({query: e.target.value})}
                    value={this.state.query}
                />
                <button onSubmit={() => this.querySearch()}></button>
            </form>
        )
    }


    render() {
        // Additional css
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };
    
        // To change the loading icon behavior
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    
        return (
            <div
                style={{
                    width: '300px',
                    height: '400px',
                    overflow: 'scroll'
                }}
            >
                {this.searchBar()}

                <div style={{ minHeight: "100px" }}>
                    {this.state.photos.map(user => (
                        <img src={user.stickerImg} height="100px" width="100px" />
                        ))}
                </div>
                <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                >
                    <span style={loadingTextCSS}>Loading...</span>
                </div>
            </div>
        );
    }
}

export default TrendingStickers;