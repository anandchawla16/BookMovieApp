import React,{ useState,useEffect} from 'react';
import './Home.css';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// const styles = theme => ({
//     root: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.paper
//     },
//     upcomingMoviesHeading: {
//         textAlign: 'center',
//         background: '#ff9999',
//         padding: '8px',
//         fontSize: '1rem'
//     },
//     gridListUpcomingMovies: {
//         flexWrap: 'nowrap',
//         transform: 'translateZ(0)',
//         width: '100%'
//     },
//     gridListMain: {
//         transform: 'translateZ(0)',
//         cursor: 'pointer'
//     },
//     formControl: {
//         margin: theme.spacing(4),
//         minWidth: 240,
//         maxWidth: 240
//     },
//     title: {
//         color: theme.palette.primary.light,
//     }
// });


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
        width: '100%'
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

   
// const data = {"page":1,"limit":10,"total_count":9,"movies":[{"id":"8d71c3b8-a293-11e8-9a3a-720006ceb890","title":"Mile 22","storyline":"Mile 22 is a 2018 American action thriller film directed by Peter Berg and written by Lea Carpenter, from a story by Carpenter and Graham Roland. The film stars Mark Wahlberg, John Malkovich, Lauren Cohan, Iko Uwais, Ronda Rousey, and follows an elite CIA task force, composed of paramilitary officers from Ground Branch of Special Activities Division, that has to escort a high-priority asset 22 miles to an extraction point while being hunted by terrorists.","genres":["Action","Thriller"],"duration":95,"poster_url":"https://upload.wikimedia.org/wikipedia/en/4/41/Mile_22.png","trailer_url":"https://www.youtube.com/watch?v=eJU6S5KOsNI","wiki_url":"https://en.wikipedia.org/wiki/Mile_22","release_date":"2018-09-19","censor_board_rating":"UA","rating":6.1,"status":"PUBLISHED","artists":[{"id":"3097b8f4-a294-11e8-9a3a-720006ceb890","first_name":"Peter","last_name":"Berg","role_type":"DIRECTOR","profile_description":"Peter Berg (born March 11, 1964) is an American director, producer, writer, and actor. In television, Berg developed Friday Night Lights (2006–2011), adapted from his film, earning two Primetime Emmy Award nominations. As an actor, he is best known for his role as Dr. Billy Kronk on the CBS medical drama Chicago Hope (1995–1999).","profile_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Peter_Berg_by_Gage_Skidmore.jpg/440px-Peter_Berg_by_Gage_Skidmore.jpg","wiki_url":"https://en.wikipedia.org/wiki/Peter_Berg"},{"id":"9df46816-a294-11e8-9a3a-720006ceb890","first_name":"Mark","last_name":"Wahlberg","role_type":"PRODUCER","profile_description":"PMark Robert Michael Wahlberg (born June 5, 1971) is an American actor, producer, businessman, former model, rapper and songwriter. He was known by his stage name Marky Mark in his early career as frontman for the group Marky Mark and the Funky Bunch, releasing the albums Music for the People and You Gotta Believe.","profile_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Mark_Wahlberg_2017.jpg/440px-Mark_Wahlberg_2017.jpg","wiki_url":"https://en.wikipedia.org/wiki/Mark_Wahlberg"},{"id":"1dd86f90-a296-11e8-9a3a-720006ceb890","first_name":"John","last_name":"Malkovich","role_type":"ACTOR","profile_description":"John Gavin Malkovich (born December 9, 1953) is an American actor, director, producer and fashion designer. He has appeared in more than 70 films. For his roles in Places in the Heart and In the Line of Fire, he received Academy Award nominations. He appeared in such films as Empire of the Sun, The Killing Fields, Con Air, The Sheltering Sky, Of Mice and Men, Rounders, Knockaround Guys, Being John Malkovich, Shadow of the Vampire, Burn After Reading, Red, Red 2, Mulholland Falls, Dangerous Liaisons, and Warm Bodies, as well as producing films such as Ghost World, Juno, and The Perks of Being a Wallflower.","profile_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/John_Malkovich_at_a_screening_of_%22Casanova_Variations%22_in_January_2015.jpg/440px-John_Malkovich_at_a_screening_of_%22Casanova_Variations%22_in_January_2015.jpg","wiki_url":"https://en.wikipedia.org/wiki/John_Malkovich"}]},{"id":"65444278-a29b-11e8-9a3a-720006ceb890","title":"The Irishman","storyline":"The Irishman is an upcoming American biographical crime film directed by Martin Scorsese and written by Steven Zaillian, based on the book I Heard You Paint Houses by Charles Brandt. The film stars Robert De Niro as Frank Sheeran, a labor union leader and alleged hitman for the Bufalino crime family, and Al Pacino as Jimmy Hoffa. Joe Pesci, Anna Paquin, Bobby Cannavale, Harvey Keitel, and Ray Romano also star.","genres":[],"duration":100,"poster_url":"https://m.media-amazon.com/images/M/MV5BZjcyMmYwZTUtMzVjZi00YjI5LWEwNDktNDQ1ZGY2M2FlYTBiXkEyXkFqcGdeQXVyMzE3OTk0NjQ@._V1_UY268_CR6,0,182,268_AL__QL50.jpg","trailer_url":"https://www.youtube.com/watch?v=uu1KNOUvzPQ","wiki_url":"https://en.wikipedia.org/wiki/The_Irishman_(2019_film)","release_date":"2019-01-01","censor_board_rating":"UA","rating":8.0,"status":"PUBLISHED","artists":null},{"id":"19f35c78-a2a0-11e8-9a3a-720006ceb890","title":"Bad Boys For Life","storyline":"In June 2008, Bay stated that he may direct Bad Boys III, but that the greatest obstacle to the potential sequel would be the cost, as he and Will Smith demand some of the highest salaries in the film industry. By August 2009, Columbia Pictures had hired Peter Craig to write the script for Bad Boys III. In February 2011, Martin Lawrence reiterated that the film was in development.","genres":[],"duration":100,"poster_url":"https://upload.wikimedia.org/wikipedia/fa/thumb/e/e3/Bad_Boys_Limited_Edition_Cover.jpg/250px-Bad_Boys_Limited_Edition_Cover.jpg","trailer_url":"https://www.youtube.com/watch?v=e-alJMlZUH4","wiki_url":"https://en.wikipedia.org/wiki/Bad_Boys_(franchise)","release_date":"2019-01-01","censor_board_rating":"UA","rating":8.0,"status":"PUBLISHED","artists":null},{"id":"643d8d80-a2a0-11e8-9a3a-720006ceb890","title":"Mowgli","storyline":"Mowgli is an upcoming adventure fantasy film directed by Andy Serkis and written by Callie Kloves, based on The Jungle Book by Rudyard Kipling. The film stars Rohan Chand, Matthew Rhys and Freida Pinto, along with voice and motion capture performances from Christian Bale, Cate Blanchett, Benedict Cumberbatch, Naomie Harris and Serkis.","genres":[],"duration":100,"poster_url":"https://upload.wikimedia.org/wikipedia/he/thumb/e/ec/Mowgli_teaser_poster.jpg/404px-Mowgli_teaser_poster.jpg","trailer_url":"https://www.youtube.com/watch?v=9wY_vb4pkLs","wiki_url":"https://en.wikipedia.org/wiki/Mowgli_(film)","release_date":"2019-01-01","censor_board_rating":"UA","rating":8.0,"status":"PUBLISHED","artists":null},{"id":"d088f038-a2a0-11e8-9a3a-720006ceb890","title":"Hellboy","storyline":"Hellboy is an upcoming American supernatural superhero film directed by Neil Marshall, based on the Dark Horse Comics character Hellboy. The film serves as a reboot to the Hellboy film series and stars David Harbour, Milla Jovovich, Ian McShane, Sasha Lane, Brian Gleeson, Daniel Dae Kim, and Sophie Okonedo. The film is scheduled to be released on January 11, 2019.","genres":[],"duration":100,"poster_url":"https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Hellboy_%282019%29_theatrical_poster.png/220px-Hellboy_%282019%29_theatrical_poster.png","trailer_url":"https://www.youtube.com/watch?v=Ob9J3kCELXE","wiki_url":"https://en.wikipedia.org/wiki/Hellboy_(2019_film)","release_date":"2019-01-01","censor_board_rating":"UA","rating":8.0,"status":"PUBLISHED","artists":null},{"id":"16ddc57c-a2a1-11e8-9a3a-720006ceb890","title":"Ad Astra","storyline":"Ad Astra is an upcoming American epic science fiction thriller film directed by James Gray, and written by Gray and Ethan Gross. The film will star Brad Pitt, Tommy Lee Jones, Ruth Negga, Donald Sutherland and Jamie Kennedy.","genres":[],"duration":100,"poster_url":"https://static1.squarespace.com/static/57004e4a20c647bc9420760b/t/58345640bebafbb1e66b78ce/1479824966458/AD+Astra+poster.jpg?format=500w","trailer_url":"https://www.youtube.com/watch?v=NTDgOOA2f-A","wiki_url":"https://en.wikipedia.org/wiki/Ad_Astra_(film)","release_date":"2019-01-01","censor_board_rating":"UA","rating":8.0,"status":"PUBLISHED","artists":null},{"id":"5d49d32e-a2a2-11e8-9a3a-720006ceb890","title":"The Nun","storyline":"The Nun is an upcoming American gothic supernatural horror film directed by Corin Hardy. The screenplay by Gary Dauberman is from a story by James Wan and Dauberman. It is a spin-off of 2016s The Conjuring 2 and the fifth installment in The Conjuring series, and stars Demián Bichir, Taissa Farmiga and Jonas Bloquet.","genres":[],"duration":96,"poster_url":"https://upload.wikimedia.org/wikipedia/en/3/34/TheNunPoster.jpg","trailer_url":"https://www.youtube.com/watch?v=pzD9zGcUNrw","wiki_url":"https://en.wikipedia.org/wiki/The_Nun_(2018_film)","release_date":"2018-09-07","censor_board_rating":"UA","rating":8.0,"status":"PUBLISHED","artists":null},{"id":"7281988a-a2a2-11e8-9a3a-720006ceb890","title":"A Star IS Born","storyline":"A Star Is Born is an upcoming American musical romantic drama film produced and directed by Bradley Cooper, in his directorial debut. Cooper also wrote the screenplay with Will Fetters and Eric Roth. A remake of the 1937 film of the same name, it stars Cooper, Lady Gaga, Andrew Dice Clay, Dave Chappelle, and Sam Elliott, and follows a hard-drinking country musician (Cooper) who discovers and falls in love with a young singer (Gaga).","genres":[],"duration":135,"poster_url":"https://upload.wikimedia.org/wikipedia/en/3/39/A_Star_is_Born.png","trailer_url":"https://www.youtube.com/watch?v=nSbzyEJ8X9E","wiki_url":"https://en.wikipedia.org/wiki/A_Star_Is_Born_(2018_film)","release_date":"2018-10-05","censor_board_rating":"UA","rating":8.0,"status":"PUBLISHED","artists":null},{"id":"7e967dac-a2a2-11e8-9a3a-720006ceb890","title":"Paltan","storyline":"Paltan is an upcoming Indian war film directed and produced by J.P. Dutta, based on 1967 Nathu La and Cho La clashes along the Sikkim border after 1962 Sino-Indian War. It stars an ensemble cast with Jackie Shroff, Arjun Rampal, Sonu Sood, Harshvardhan Rane, Esha Gupta, Sonal Chauhan and many more. It is set to be released on 7 September 2018.","genres":[],"duration":150,"poster_url":"https://upload.wikimedia.org/wikipedia/en/6/64/Paltan_2018.jpg","trailer_url":"https://www.youtube.com/watch?v=kk6btnMEKTQ","wiki_url":"https://en.wikipedia.org/wiki/Paltan_(film)","release_date":"2018-09-07","censor_board_rating":"UA","rating":8.0,"status":"PUBLISHED","artists":null}]}
// const obj = data.movies;
// console.log(obj)

function Home(props) {
    const classes = useStyles();
    const [upcomingmovies,setUpcomingMovies] = useState([]);
    const [releasedmovies,setReleasedMovies] = useState([]);

     const[moviename,setMovieName] = useState("")
     
     const[genres,setGenres] = useState([]);
     const[artists,setArtists] = useState([])
     const[releaseDateStart,setReleaseDateStart] = useState("")
     const[releaseDateEnd,setReleaseEndDate] = useState("")
     const [genresList,setGenresList] = useState([]);
    const [artistsList,setArtistList] = useState([]);
    useEffect(()=>{
        
        async function fetchPublished() {
        
        try {
            const rawResponse =  await fetch(props.baseUrl + "movies?status=PUBLISHED",{
                method:'GET',               
            })

            if(rawResponse.ok) {
                const result =  await rawResponse.json()
            
                   setUpcomingMovies(result["movies"]);
                     console.log(result["movies"]);
            
            }else {
                const error = new Error();
                error.message = 'Unable to Load Upcoming Movies';
               
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
        }
        async function fetchReleased() {
        
            try {
                const rawResponse =  await fetch(props.baseUrl + "movies?status=RELEASED",{
                    method:'GET',               
                })
    
                if(rawResponse.ok) {
                    const result =  await rawResponse.json()
                
                       setReleasedMovies(result["movies"]);
                         console.log(result["movies"]);
                
                }else {
                    const error = new Error();
                    error.message = 'Unable to Load Released Movies';
                   
                }
            } catch(e) {
                alert(`Error: ${e.message}`);
            }
            }

            async function getGenres() {
        
                try {
                    const rawResponse =  await fetch(props.baseUrl + "genres",{
                        method:'GET',               
                    })
        
                    if(rawResponse.ok) {
                        const result =  await rawResponse.json()
                    
                           setGenresList(result["genres"]);
                             console.log(result["genres"]);
                    
                    }else {
                        const error = new Error();
                        error.message = 'Unable to Load Genres';
                       
                    }
                } catch(e) {
                    alert(`Error: ${e.message}`);
                }
                }
    
                async function getArtists() {
        
                    try {
                        const rawResponse =  await fetch(props.baseUrl + "artists",{
                            method:'GET',               
                        })
            
                        if(rawResponse.ok) {
                            const result =  await rawResponse.json()
                        
                               setArtistList(result["artists"]);
                                 console.log(result["artists"]);
                        
                        }else {
                            const error = new Error();
                            error.message = 'Unable to Load Artists';
                           
                        }
                    } catch(e) {
                        alert(`Error: ${e.message}`);
                    }
                    }
    
                    
        fetchReleased();
        fetchPublished();
        getGenres();
        getArtists();
    },[])
    
    const movieNameChangeHandler = (e) => {
        setMovieName(e.target.value)
        console.log(moviename)
    }

    const genreSelectHandler = (e) => {
            setGenres(e.target.value)
            //console.log(genres)
    }

    const releaseDateStartHandler = (e) => {
            setReleaseDateStart(e.target.value)
            //console.log(releaseDateStart)
    }

    const releaseDateEndHandler = (e) => {
            setReleaseEndDate(e.target.value)
           // console.log(releaseDateEnd)
    }
    const artistSelectHandler = (e) => {
        setArtists(e.target.value)
        //console.log(artists)
    }

    const movieClickHandler = (movieId) => {
         props.history.push('/movie/' + movieId);
     }
    const filterApplyHandler = async() => {
            console.log(moviename + " " + artists + " " + genres + " " + releaseDateStart + " " + releaseDateEnd)

            let moviequery = props.baseUrl + "movies?status=RELEASED";
            if(moviename !=="") {
                moviequery = moviequery + "&title=" + moviename;
            }
            if(genres.length>0) {
                moviequery = moviequery + "&genre=" + genres.toString();
            }
            if(artists.length>0) {
                moviequery = moviequery + "&artists=" + artists.toString();;
            }
            if(releaseDateStart !=="") {
                 moviequery = moviequery + "&start_date=" + releaseDateStart;
             }
             if(releaseDateEnd !=="") {
                 moviequery = moviequery + "&end_date=" + releaseDateEnd;
             }
            console.log(moviequery)

            try {
                const rawResponse =  await fetch(moviequery,{
                    method:'GET',               
                })
    
                if(rawResponse.ok) {
                    const result =  await rawResponse.json()
                
                       setReleasedMovies(result["movies"]);
                         console.log(result["movies"]);
                
                }else {
                    const error = new Error();
                    error.message = 'Unable to Load Upcoming Movies';
                   
                }
            } catch(e) {
                alert(`Error: ${e.message}`);
            }

    }

    return (
        <div>
            <Header />
            <div className="upcoming">Upcoming Titles </div>
            <div className={classes.root}>
      <ImageList className={classes.imageList} cols={6}>
        {upcomingmovies.map((item) => (
          <ImageListItem key={item.id}>
            <img src={item.poster_url} alt={item.title} className="movie-poster"/>
            <ImageListItemBar
              title={item.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
    
            <div className="flex-container">
                <div className="newleft">
                    <ImageList rowHeight={350} cols={4} >
                        {releasedmovies.map((item) => (
                            <ImageListItem key={item.id} className="imgListMain" gap={4}>
                                <img className="movie-poster" onClick={()=>movieClickHandler(item.id)} src={item.poster_url} height="350" alt={item.title} />
                                <ImageListItemBar
                                    title={item.title}
                                    subtitle={item.release_date}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}

                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <div className="newright">
                    <Card>
                        <CardContent>
                            <FormControl className={classes.formControl}>
                                <Typography className={classes.title} color="textSecondary">
                                    FIND MOVIES BY:
                                </Typography>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                <Input id="movieName" value={moviename} onChange={movieNameChangeHandler} />
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox-genre" />}
                                    renderValue={selected => selected.join(',')}
                                    value={genres}
                                    onChange={genreSelectHandler}
                                >
                                    {genresList.map(genre => (
                                        <MenuItem key={genre.id} value={genre.genre}>
                                            <Checkbox checked={genres.indexOf(genre.genre) > -1} />
                                            <ListItemText primary={genre.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                <Select
                                    multiple
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(',')}
                                    value={artists}
                                    onChange={artistSelectHandler}
                                >
                                    {artistsList.map(artist => (
                                        <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                            <Checkbox checked={artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="releaseDateStart"
                                    label="Release Date Start"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateStartHandler}
                                />
                            </FormControl>
                            <br />
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="releaseDateEnd"
                                    label="Release Date End"
                                    type="date"
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    onChange={releaseDateEndHandler}
                                />
                            </FormControl>
                            <br /><br />
                            <FormControl className={classes.formControl}>
                                <Button onClick={() => filterApplyHandler()} variant="contained" color="primary">
                                    APPLY
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home
