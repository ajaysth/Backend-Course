import {PrismaClient} from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter
});

const userId = "56eb1437-f775-46f1-af9d-024466cca5ba"
const movies = [
    {
  title: "The Dark Knight",
  overview: "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.",
  releaseYear: 2008,
  genres: ["Action", "Crime", "Drama"],
  runtime: 152,
  posterUrl: "https://example.com/darkknight.jpg",
  createdBy: userId,
},
{
  title: "Inception",
  overview: "A thief who steals secrets through dreams is given a chance to erase his past.",
  releaseYear: 2010,
  genres: ["Action", "Sci-Fi", "Thriller"],
  runtime: 148,
  posterUrl: "https://example.com/inception.jpg",
  createdBy: userId,
},
{
  title: "Fight Club",
  overview: "An insomniac office worker and a soap maker form an underground fight club.",
  releaseYear: 1999,
  genres: ["Drama"],
  runtime: 139,
  posterUrl: "https://example.com/fightclub.jpg",
  createdBy: userId,
},
{
  title: "The Matrix",
  overview: "A hacker discovers reality is a simulation and joins a rebellion.",
  releaseYear: 1999,
  genres: ["Action", "Sci-Fi"],
  runtime: 136,
  posterUrl: "https://example.com/matrix.jpg",
  createdBy: userId,
},
{
  title: "Forrest Gump",
  overview: "A simple man lives through major historical events with kindness and courage.",
  releaseYear: 1994,
  genres: ["Drama", "Romance"],
  runtime: 142,
  posterUrl: "https://example.com/forrestgump.jpg",
  createdBy: userId,
},
{
  title: "Gladiator",
  overview: "A betrayed Roman general seeks revenge against the corrupt emperor.",
  releaseYear: 2000,
  genres: ["Action", "Drama"],
  runtime: 155,
  posterUrl: "https://example.com/gladiator.jpg",
  createdBy: userId,
},
{
  title: "Avengers: Endgame",
  overview: "The Avengers assemble once more to reverse Thanos' actions.",
  releaseYear: 2019,
  genres: ["Action", "Adventure", "Sci-Fi"],
  runtime: 181,
  posterUrl: "https://example.com/endgame.jpg",
  createdBy: userId,
},
{
  title: "Titanic",
  overview: "A love story unfolds aboard the ill-fated Titanic.",
  releaseYear: 1997,
  genres: ["Drama", "Romance"],
  runtime: 195,
  posterUrl: "https://example.com/titanic.jpg",
  createdBy: userId,
},
{
  title: "Joker",
  overview: "A failed comedian descends into madness and becomes a criminal icon.",
  releaseYear: 2019,
  genres: ["Crime", "Drama", "Thriller"],
  runtime: 122,
  posterUrl: "https://example.com/joker.jpg",
  createdBy: userId,
},
{
  title: "The Shawshank Redemption",
  overview: "Two imprisoned men bond over years, finding solace and redemption.",
  releaseYear: 1994,
  genres: ["Drama"],
  runtime: 142,
  posterUrl: "https://example.com/shawshank.jpg",
  createdBy: userId,
}
]

const main = async ()=>{
    console.log("Seeding movies")

    
        await prisma.movie.createMany({
            data: movies
        })

    console.log("Seeding completed")
}

main().catch((err)=>{
    console.log(err)
    process.exit(1)
}).finally(async ()=>{
    await prisma.$disconnect()
})