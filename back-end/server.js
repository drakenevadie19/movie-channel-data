require('dotenv').config();
const express = require('express')
const app = express();
const fs = require('fs');

const mongoose = require("mongoose");

const mongoModel = require('./data/models/model');
console.log(mongoModel);

// Connect BE to MongoDB Atlas DB
// No need useNewURLParser and useUnifiedTopology parameters, because they are deprecated.
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@movie-maker-app.9l1xvlj.mongodb.net/?retryWrites=true&w=majority&appName=movie-maker-app`)
    .then(() => {
        console.log("Successfully connect to MongoDB");
    })
    .catch((err) => {
        console.log('Error:', err);  
    });

// console.log(process.env.MONGO_USERNAME);
// console.log(process.env.MONGO_PASSWORD);

const resultList = [];
const existedName = [];
fs.readFile("./data/Film1.JSON", 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("reading file 1 successfully");
    let movieList1 = JSON.parse(data);
    movieList1.forEach((movie) => {

      if (!existedName.includes(movie.Title.toLowerCase())) {
        // console.log("Element movie here:");
        // console.log(movie.Title);
        resultList.push(
          {
            title: movie.Title,
            year: movie.Year.toString(),
            rated: movie.Rated,
            released: movie.Released,
            runtime: movie.Runtime,
            genre: movie.Genre,
            director: movie.Director,
            writer: movie.Writer,
            actors: movie.Actors,
            plot: movie.Plot,
            language: movie.Language,
            country: movie.Country,
            awards: movie.Awards,
            poster: movie.Poster,
            type: movie.Type,
            images: movie.Images,
            rates: {
              metaScore: movie.Metascore.toString(),
              imdbRating: movie.imdbRating.toString(),
              imdbVotes: movie.imdbVotes,
              // rottenTomatoes: null,
            }
          }
        );

        existedName.push(movie.Title.toLowerCase());
      }
      
    });
  }
});


fs.readFile("./data/filmList.json", 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("reading file 1 successfully");
    let movieList1 = JSON.parse(data);
    movieList1.forEach((movie) => {
      if (!existedName.includes(movie.Title.toLowerCase())) {
        // console.log("Element movie here:");
        // console.log(movie.Title);
        resultList.push(
          {
            title: movie.Title,
            year: movie.Year.toString(),
            rated: movie.Rated,
            released: movie.Released,
            runtime: movie.Runtime,
            genre: movie.Genre,
            director: movie.Director,
            writer: movie.Writer,
            actors: movie.Actors,
            plot: movie.Plot,
            language: movie.Language,
            country: movie.Country,
            awards: movie.Awards,
            poster: movie.Poster,
            type: movie.Type,
            images: movie.Images,
            rates: {
              metaScore: movie.Metascore.toString(),
              imdbRating: movie.imdbRating.toString(),
              imdbVotes: movie.imdbVotes,
              // rottenTomatoes: null,
            }
          }
        );

        existedName.push(movie.Title.toLowerCase());
      }
    });
  }
});


app.get('/update', function (req, res) {
  // console.log();
  res.send(resultList);
  resultList.map((movie) => {
    let newMovie = new mongoModel(movie);
    newMovie.save();
  })
});

app.post('/output', (req, res) => {
  // Write the JSON data to another file
  fs.writeFile('output.json', JSON.stringify(resultList, null, 2), (err) => {
    if (err) {
        console.error('Error writing the file:', err);
        return;
    }
    console.log('File has been written successfully');
    res.json({
      message: "Successfully"
    })
  });
})

app.listen(8001, () => {
    console.log("Server is running on port 8001")
})
