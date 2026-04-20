import {prisma} from "../config/db.js"

const addToWatchlist =async (req, res)=>{
    const {movieId,status,rating,notes}= req.body

    //check whether movie already there or not
    const existMovie =  await prisma.movie.findUnique({
        where:{
            id:movieId
        }
    })


    if(!existMovie){
        return res.status(404).json({message:"Movie not found"})
    }

    //checlk if movie added in watchlist
    const exixtInWatchlist = await prisma.watchlistItem.findUnique({
        where:{
            userId_movieId:{
                userId:req.user.id,
                movieId:movieId
            }
        }
    })

    if(exixtInWatchlist){
        return res.status(400).json({message:"Movie already in watchlist"})
    }

    const watchList = await prisma.watchlistItem.create({
        data:{
            userId:req.user.id,
            movieId:movieId,
            status:status || "PLANNED",
            rating:rating,
            notes:notes
        }
    })

    res.status(201).json({message:"Movie added to watchlist",watchList})
}


const updateWatchlistItem = async (req,res)=>{
    const {status,rating,notes} = req.body

    const watchlistItem = await prisma.watchlistItem.findUnique({
        where:{
            id: req.params.id
        }
    })
    if(!watchlistItem){
        return res.status(404).json({message:"Watchlist item not found"})
    }

    const userAllowed = watchlistItem.userId === req.user.id
    if(!userAllowed){
        return res.status(403).json({message:"Forbidden, you can only delete your own watchlist items"})
    }

    const updatedItem = await prisma.watchlistItem.update({
        where:{
            id: req.params.id
        },
        data:{
            status:status,
            rating:rating,
            notes:notes
        }
    })
    res.status(200).json({message:"Watchlist item updated",updatedItem})

}


const deleteFromWatchlist = async (req, res)=>{

    const watchlistItem = await prisma.watchlistItem.findUnique({
        where:{
            id: req.params.id
        }
    })
    if(!watchlistItem){
        return res.status(404).json({message:"Watchlist item not found"})
    }

    const userAllowed = watchlistItem.userId === req.user.id
    if(!userAllowed){
        return res.status(403).json({message:"Forbidden, you can only delete your own watchlist items"})
    }

    await prisma.watchlistItem.delete({
        where:{
            id: req.params.id
        }
    })

    res.status(200).json({message:"Movie removed from watchlist"})
    
}

export { addToWatchlist, deleteFromWatchlist, updateWatchlistItem}