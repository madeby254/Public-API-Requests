

// Created and Empty Array for Users

const users = [];


// Fecth Functions

async function fetchData(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data.results;
    } catch (error) {
      console.log('Looks like there was a problem getting data!',error);
    }
  }
