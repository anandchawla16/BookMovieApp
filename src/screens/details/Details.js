import React, {useState,useEffect} from 'react'
import Header from './../../common/header/Header'
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Icon } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';



import "./Details.css"
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        height: '100%'
    },
    title: {
      color: theme.palette.primary.white,
      
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgb(0 0 0 / 84%) 70%, rgb(0 0 0 / 42%) 100%)',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
        maxWidth: 240
    }

  }));



function Details(props) {
    const classes = useStyles();
    const [moviedetails,setMovieDetails] = useState("");
    const [youtubecode,setYoutubeCode] = useState("");
    const [artists,setArtists] = useState([])
    const [starIcons,setstarIcons] =  useState([{
        id: 1,
        stateId: "star1",
        color: "black"
    },
    {
        id: 2,
        stateId: "star2",
        color: "black"
    },
    {
        id: 3,
        stateId: "star3",
        color: "black"
    },
    {
        id: 4,
        stateId: "star4",
        color: "black"
    },
    {
        id: 5,
        stateId: "star5",
        color: "black"
    }])
     
    
    useEffect(()=>    {
        
    //const id = "52975022-a235-11e8-9077-720006ceb890";
    
    async function loadDetails() {
    
        console.log("before try")
        try {
            const rawResponse =  await fetch(props.baseUrl + "movies/" + props.match.params.id,{
                method:'GET',               
            })

            if(rawResponse.ok) {
                const result =  await rawResponse.json()
            
                   setMovieDetails(result);
                   setYoutubeCode(embedCode(result.trailer_url))
                   setArtists(result.artists)
                     console.log("I am here" + moviedetails);
                     
            }else {
                const error = new Error();
                error.message = 'Unable to Load Upcoming Movies';
               
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
    } 
    loadDetails();
    },[])

    const opts = {
        height: '300',
        width: '700',
        playerVars: {
            autoplay: 0
        }
    }
    
     const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
    
      const embedCode = (url) => {
        console.log("hello")
          return url.split("?v=")[1]
                       
      }
      let starIconList = [];
      const starClickHandler = (id) => {
       
        for (let star of starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";

            }
            starIconList.push(starNode);
        }
        
       return  setstarIcons(starIconList)
        
    }
    
    

    return (
           <div> <Header />
           <div className="flex-container">
           <div className="leftdet">
               <div className="backbutton"><Typography><Link to="/">Back to Home</Link></Typography></div>
               <div><img src={moviedetails.poster_url} alt={moviedetails.title}/></div>
               </div>
           <div className="middledet">
               
               <div><Typography variant="h5" component="h2">{moviedetails.title}</Typography></div>
               
           <div><Typography><span className="bold">Genre:</span> {moviedetails.genres}</Typography></div>
           <div><Typography><span className="bold">Duration:</span> {moviedetails.duration}</Typography></div>
           <div><Typography><span className="bold">Release Date: </span>
           {new Date(moviedetails.release_date).toDateString()} </Typography></div>
           
           <div><Typography><span className="bold">Rating:</span> {moviedetails.rating}</Typography></div><br/>
           <div><Typography><span className="bold">Plot: </span>{moviedetails.storyline}</Typography></div><br/>
           <div><Typography><span className="bold">Trailer: </span></Typography><br/>
           </div>
           <YouTube
                                videoId={youtubecode}
                                opts={opts}
                                ready={_onReady}
                            />
           </div>
           <div className="right">
            <div><Typography><span className="bold">Rate this Movie</span></Typography></div>
            <div>
            {starIcons.map(star => (
                            <StarBorderIcon
                                className={star.color}
                                key={"star" + star.id}
                                 onClick={()=>starClickHandler(star.id)}
                            />
                        ))}

            </div>
            <div> 
                <div className="artisthead"><Typography>Artists:</Typography></div>
                <div className={classes.root}>
      <ImageList className={classes.imageList} cols={2} cellheight="160">
      {artists.map((item) => (
          <ImageListItem key={item.id}>
            <img src={item.profile_url} alt={item.first_name + " " + item.last_name} className="movie-poster"/>
            <ImageListItemBar
              title={item.first_name + " " + item.last_name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
    </div>



           </div>
           </div>
           </div>
    )
}

export default Details


