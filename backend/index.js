import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
import RatingsDAO from "./dao/ratingsDAO.js"

/**Configure env to load in environment variables*/
dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.MOVIEREVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
    ).catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await MoviesDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        await RatingsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`);            
        })
    });