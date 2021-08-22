import React, {useState,useEffect} from 'react'
import Header from './../../common/header/Header'
import "./Details.css"

function Details(props) {
    //const id = "52975022-a235-11e8-9077-720006ceb890";
    const [moviedetails,setMovieDetails] = useState("");
    useEffect(async()=>{
    
        console.log("before try")
        try {
            const rawResponse =  await fetch(props.baseUrl + "movies/" + props.match.params.id,{
                method:'GET',               
            })

            if(rawResponse.ok) {
                const result =  await rawResponse.json()
            
                   setMovieDetails(result);
                     console.log("I am here" + moviedetails);
            
            }else {
                const error = new Error();
                error.message = 'Unable to Load Upcoming Movies';
               
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
        
    },[])
        
    return (
           <div> <Header />
           <div className="flex-container"></div>
           <div className="leftdet"><img src={moviedetails.poster_url} alt={moviedetails.title}/></div>
           <div className="middledet"><h3>{moviedetails.title}</h3>
           <div className="genre">Genre: {moviedetails.genres}</div>
           <div className="duration">Duration: {moviedetails.duration}</div>
           <div className="releasedate">Release Date: {moviedetails.release_date}</div>
           <div className="rating">Rating: {moviedetails.rating}</div><br/>
           <div className="plot">Plot: {moviedetails.storyline}</div><br/>
           <div className="trailer">Trailer: <br/><iframe width="560" height="315" title={moviedetails.title} src= {moviedetails.trailer_url} frameborder="0" ></iframe>  </div>
           
           </div>
           <div className="rightdet">Right</div>
           </div>
    )
}

export default Details


