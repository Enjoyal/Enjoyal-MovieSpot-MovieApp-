//import JWT Token
const jwt = require('jsonwebtoken');

const db = require('./db')


const register=(uname, fullName, pswd)=>{
    return db.User.findOne({uname})
    .then(user=>{

    if(user){
        return{
        status: false,
        statusCode:400,
        message:'User already registered'
        }
    }
    else{
      const newUser=new db.User({
        uname:uname,
        fullName:fullName,
        pswd:pswd,
        watchlist: []    
      })
      newUser.save();   //data saved in mongodb
    //   this.saveDetails();
    return{    
        status: true,
        statusCode:200,
        message:'Registered Successfully'
        } 
    }

  })
  }

  const login=(uname, pswd)=>{
    return db.User.findOne({uname, pswd})
      .then(user=>{
        if(user){
          currentUser=user.uname
          fullName=user.fullName
        
  
          //To generate Token
          const token= jwt.sign({currentUser:uname},'superkey2022')  //superkey is a secret key(private key)
          return{
            status: true,
            statusCode:200,
            message:'Login Successful',
            currentUser:currentUser,
            fullName:fullName,
            token:token
            }
        }
      else{
        return{
          status: false,
          statusCode:400,
          message:'Invalid userdetails'
          }   
      }
    })
    }
  






//get all  the movies from db
const getMovies =()=>{
    return db.Movie.find().then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    movies:result
                }
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:' Movie not found'
                }
            }
        }
    )
}

const getTrending =()=>{
    return db.Trending.find().then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    result
                }
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:'No Movie found'
                }
            }
        }
    )
}


// const addtoWatchlist=(id, original_title, overview, poster_path, media_type, vote_average, release_date)=>{
//     //data added to mongodb -- create a model in db.js
    
//     return db.Watchlist.findOne({id}).then(
//         (result)=>{
//             if(result){
//                 return{
//                     status:true,
//                     statusCode:200,
//                     message:'Movie already exist'
//                 }
//             }
//             else{
//                 const newMovie= new db.Watchlist({id, original_title, overview, poster_path, media_type, vote_average, release_date})
//                 newMovie.save()  //to save data into mongodb
//                 return{
//                     status:true,
//                     statusCode:200,
//                     message:'Movie added to Watchlist'
//                 }
//             }
//         }
    
//     )
//     }


const addtoWatchlist=(uname, id, title, name, original_title, original_name, overview, poster_path, media_type, vote_average, release_date, first_air_date)=>{
        //data added to mongodb -- create a model in db.js
        
        return db.Watchlist.findOne({uname,id}).then(
            (result)=>{
                if(result){
                    return{
                        status:true,
                        statusCode:200,
                        message:'already exist in the Watchlist'
                    }
                }
                else{
                    const newMovie= new db.Watchlist({uname,id, title, name, original_title, original_name, overview, poster_path, media_type, vote_average, release_date, first_air_date})
                    newMovie.save()  //to save data into mongodb
                    return{
                        status:true,
                        statusCode:200,
                        message:'Saved to Watchlist'
                    }
                }
            }
        
        )
        }

//to get wishlist
const getWatchlist =(uname)=>{
    return db.Watchlist.find({uname}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    watchlists:result
                }
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:'Your Watchlist is empty!'
                }
            }
        }
    )
}

//to delete wishlist
const deleteWatch =(uname,id)=>{
    return db.Watchlist.deleteOne({uname,id}).then(
        (result)=>{
            if(result){
                console.log(result,'after removing#');
                return db.User.find().then(
                    (result)=>{
                        if(result){
                            return{
                                status:true,
                                statusCode:200,
                                watchlists:result,
                                message:"Movie Successfully Removed From The Watchlist"

                            }
                        }
                        else{
                            return{
                                status:false,
                                statusCode:404,
                                message:'Movie not found'
                            }
                        }
                    }
                )
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:'Movie not found'
                }
            }
        }
    )
}


const emptyWatchlist=(uname)=>{
    
    return db.Watchlist.remove({uname})
    .then(result=>{

      if(result){
        return{
          status: true,
          statusCode:200,
          message:'watchlist emptied!'
        }
      }
      else{
        return{
          status: false,
          statusCode:400,
          message:'Wathchlist not found'
          }  
      }
    })
  }


//to add review

const addReview=(uname,author, id, rating, comment, reviewTime)=>{
    //data added to mongodb -- create a model in db.js
    
    return db.Review.findOne({uname,id}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:'Already reviewed, Please try to edit!'
                }
            }
            else{
                const newReview= new db.Review({uname,author, id, rating, comment, reviewTime})
                newReview.save()  //to save data into mongodb
                return{
                    status:true,
                    statusCode:200,
                    message:'Review added successfully'
                }
            }
        }
    
    )
    }

//to get reviews
const getReviews=(id)=>{
    return db.Review.find({id}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    reviews:result
                }
            }
            else{
                return{
                    status:false,
                    statusCode:404,
                    message:'No review found!'
                }
            }
        }
    )
}


//to edit review
const getEditedReview=(uname, id, rating, comment, reviewTime)=>{

    return db.Review.findOne({uname,id}).then(
        (result)=>{

            
            if(result){
                result.rating=rating;
                result.comment=comment;
                result.reviewTime=reviewTime;
                result.save();

                return{
                    status:true,
                    statusCode:200,
                    message:'Review edited successfully',
                    reviews:result
                }
            }
            else{
                return{
                  status: false,
                  statusCode:400,
                  message:'Review editing failed!'
                  }  
              }
        }

    )
}


const deleteReview=(uname,id)=>{
    return db.Review.deleteOne({uname,id})
    .then(result=>{
      if(result){
        return{
          status: true,
          statusCode:200,
          message:'Review deleted successfully',
          reviews:result
        }
      }
      else{
        return{
          status: false,
          statusCode:400,
          message:'Review not found'
          }  
      }
    })
  }
  

// To delete an account

const deleteAcc=(uname)=>{
  return db.User.deleteOne({uname})
  .then(user=>{
    if(user){
        emptyWatchlist(uname);
      return{
        status: true,
        statusCode:200,
        message:'Account deleted successfully'
        
      }
    }
    else{
      return{
        status: false,
        statusCode:400,
        message:'user not found'
        }  
    }
  })
}

module.exports={
    register,
    login,
    getMovies,
    getTrending,
    addtoWatchlist,
    getWatchlist,
    deleteWatch,
    emptyWatchlist,
    addReview,
    getReviews,
    getEditedReview,
    deleteReview,
    deleteAcc,

}