

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

  // Creats a profile 

  async function getRandUsers(url) {
    try {
    let userData = await fetchData(url);
    let profiles = await Promise.all(userData.map( 
      async(person) => {
        let image = person.picture.large;
        let name = `${person.name.first} ${person.name.last}`;
        let email = person.email;
        let location = `${person.location.city}, ${person.location.state}`;
        let phone = person.cell;
        let address = `${person.location.street}, ${person.location.state}, ${person.location.postcode}`;
        let dob = person.dob.date;
        dob = dob.toString().slice(0,10);
        dob = dob.slice(4) + "-" +dob.slice(0, 4);
        dob = dob.substring(1);
        return {
          image,
          name,
          email,
          location,
          phone,
          address,
          dob
        };
      }));
      return profiles;
    } catch(error) {
      console.log('Looks like there was a problem getting user profiles!',error);
    }
  }

  // Function for Profile Name to input 
  function filterCardNames(input) {
    let names = document.querySelectorAll( '.card-name');
    names.forEach(name => {
      genName = name.innerText.toLowerCase();
      genName.match(input) ? name.parentNode.parentNode.style.display= "block" : name.parentNode.parentNode.style.display="none";
    });
  }

// Searches Filter

function searchFilter() {
    let searchInput = document.getElementById('search-input');
    let searchBtn = document.getElementById('search-submit');
    searchInput.addEventListener('keyup', (e) => {
      let nameInput =searchInput.value.toLowerCase();
      filterCardNames(nameInput);
    });
    searchBtn.addEventListener('click', (e)=> {
      let nameInput =searchInput.value.toLowerCase();
      filterNames(nameInput);
    });
  }
