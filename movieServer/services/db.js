//1. import mongoose

const mongoose = require('mongoose');

//2. define connection string

mongoose.connect('mongodb://localhost:27017/movieSpot',()=>{
    console.log('connected to MongoDB');
})

//3.model creation 

const User=mongoose.model('User',
{
    uname:String,
    fullName:String,
    pswd:String,
    watchlist:Array
})



const Movie=mongoose.model('Movie',{
    id: Number,
    page:Number,
    results:Object,
    total_pages:Number,
    total_results:Number,
})

//trending model creation

const Trending=mongoose.model('Trending',{
id: Number,
page:Number,
results:Object,
total_pages:Number,
total_results:Number,
})


//watchlist model creation
const Watchlist= mongoose.model('Watchlist',{
    uname:String,
    id: Number,
    title:String,
    name:String,
    original_title: String,
    original_name:String,
    overview: String,
    poster_path: String,
    media_type: String,
    vote_average:Number,
    release_date:String,  
    first_air_date:String
})

//review model creation
const Review=mongoose.model('Review',{
    uname:String,
    author:String,
    id:Number,
    rating:Number,
    comment:String,
    reviewTime:String,
})




module.exports={
    User,
    Movie,
    Trending,
    Watchlist,
    Review,
}