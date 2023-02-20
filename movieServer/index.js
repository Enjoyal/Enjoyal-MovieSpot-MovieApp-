//import express
const express=require('express')
//import cors
const cors=require('cors')    

// to link index and dataService
const dataService= require('./services/dataService')

const app=express()

//to parse json from req body
app.use(express.json())


app.listen(3000, ()=>{
    console.log('listening on port 3000');

})

app.use(cors({
    origin:'http://localhost:4200'
}))


//ROUTER specific middleware
const jwt=require('jsonwebtoken')
const jwtMiddleware= (req,res,next)=>{
    console.log('ROUTER specific middleware');
    const token = req.headers['x-access-token'];
    //verify token - verify()
    const data = jwt.verify(token,'superkey2022')
    console.log(data, 'token#');
    next();
}

//API Calls
//registration request
app.post('/register', (req,res)=>{
    console.log(req.body);
   dataService.register(req.body.uname,req.body.fullName, req.body.pswd)
   .then(result=>{
    res.status(result.statusCode).json(result)
   })
   
})

//login request
app.post('/login', (req,res)=>{
    console.log(req.body);
    dataService.login(req.body.uname,req.body.pswd)
   .then(result=>{
    res.status(result.statusCode).json(result)
   })
})





//api to get all Movies
// app.get('/all-movies',(req,res)=>{   
//     dataService.getMovies().then(
//         (result)=>{
//             res.status(result.statusCode).json(result)
//         })
// })

//api to get trending movies
app.get('/getTrending',(req,res)=>{   
    dataService.getTrending().then(
        (result)=>{
            res.status(result.statusCode).json(result)
        })
})

//api to get all-movies&tv
app.get('/getMovies',(req,res)=>{   
    dataService.getMovies().then(
        (result)=>{
            res.status(result.statusCode).json(result)
        })
})

//to get all-tvshows
// app.get('/all-tvshows',(req,res)=>{   
//     dataService.getMovies().then(
//         (result)=>{
//             res.status(result.statusCode).json(result)
//         })
// })



//Addtowatchlist request
app.post('/addtoWatchlist',jwtMiddleware, (req,res)=>{
    console.log(req.body);
    dataService.addtoWatchlist(req.body.uname,req.body.id, req.body.title, req.body.name, req.body.original_title, req.body.original_name, req.body.overview, req.body.poster_path, req.body.media_type, req.body.vote_average, req.body.release_date, req.body.first_air_date)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

//api requset to get watchlist products
// app.get('/getWatchlist',jwtMiddleware, (req,res)=>{
//     dataService.getWatchlist(req.body.uname)
//     .then(result=>{
//         res.status(result.statusCode).json(result)
//     })
// })

app.post('/getWatchlist', (req,res)=>{
    console.log(req.body);
    dataService.getWatchlist(req.body.uname)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})


//api to delete watchlist products
app.delete('/deleteWatch/:uname/:id', (req,res)=>{
    dataService.deleteWatch(req.params.uname, req.params.id).then(
        (result)=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete('/emptyWatchlist/:uname', (req,res)=>{
    dataService.emptyWatchlist(req.params.uname)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

//api to add review
app.post('/addReview', (req,res)=>{
    console.log(req.body);
    dataService.addReview(req.body.uname,req.body.author,req.body.id, req.body.rating, req.body.comment,req.body.reviewTime)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

// api to get review
app.get('/getReviews/:id', (req,res)=>{
    console.log(req.params,'movieIdReview#');
    dataService.getReviews(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        })

})

app.post('/getEditedReview', (req,res)=>{
    console.log(req.body,'editedReview#');
    dataService.getEditedReview(req.body.uname,req.body.id, req.body.rating, req.body.comment,req.body.reviewTime).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        })

})



//delete review
app.delete('/deleteReview/:uname/:id', (req,res)=>{
    console.log(req.params,'deleteReview#');
    dataService.deleteReview(req.params.uname,req.params.id)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//delete request
app.delete('/deleteAcc/:uname', (req,res)=>{
    dataService.deleteAcc(req.params.uname)
    .then(result=>{
    res.status(result.statusCode).json(result)
    })
})