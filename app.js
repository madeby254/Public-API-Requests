

// Created the necessary const
const randUserUrl = 'https://randomuser.me/api/';
const groupNum = "12"
const randGroupUrl = randUserUrl+`/?nat=au,us,dk,fr,gb&results=${groupNum}`;
const searchContainer = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');

// Function to Format Phone Numbers using Regex 

function formatPhoneNumber(phoneNumberString) {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    let intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}
formatPhoneNumber('+12345678900') // => "+1 (234) 567-8900"
formatPhoneNumber('2345678900')   // => "(234) 567-8900"

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
        let phone = formatPhoneNumber(person.cell);
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

  function Listner() {
    // DOM
    const cards = document.querySelectorAll('div.card');
    const modal = document.querySelectorAll('div.modal-container');
    const btnPrev = document.querySelectorAll('.modal-prev');
    const btnNext = document.querySelectorAll('.modal-next');

    // Open modal when card is clicked
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', (e) => {
        let index = Array.prototype.indexOf.call(cards, e.currentTarget);
        modal[index].style.display = '';
      })
    }


    // Prev button to show previous modal
    for (let i = 0; i < modal.length; i++) {
      btnPrev[i].addEventListener('click', (e) => {
        const modalIndexPrev = Array.prototype.indexOf.call(btnPrev, e.currentTarget);

        if (modalIndexPrev >= 1) {
          modal[modalIndexPrev].style.display = 'none';
          modal[modalIndexPrev - 1].style.display = ''; 
        } else {
          modal[modalIndexPrev].style.display = 'none';
        }
      })

      // Next button, to show next modal 
      btnNext[i].addEventListener('click', (e) => {
        const modalIndexNext = Array.prototype.indexOf.call(btnNext, e.currentTarget);

        if (modalIndexNext <= 10) {
          modal[modalIndexNext].style.display = 'none';
          modal[modalIndexNext + 1].style.display = ''; 
        } else {
          modal[modalIndexNext].style.display = 'none';
        }
      })
    }

    // Close modal when close button is clicked
    for (let j = 0; j < modal.length; j++) {
      modal[j].addEventListener('click', (e) => {
        if (e.target.className === 'modal-close-btn' || e.target.tagName === 'STRONG') {
          let indexofClose = Array.prototype.indexOf.call(modal, e.currentTarget);
          modal[indexofClose].style.display = 'none';
        }  
      })
    }

  }



  // Generate HTML for profile 

  function generateHTML(data) {
    searchContainer.innerHTML = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    data.map(person => {
      const section = document.createElement('section');
      gallery.appendChild(section);
      section.innerHTML = `
        <div class="card">
          <div class="card-img-container">
            <img class="card-img" src=${person.image} alt=${person.name}>
          </div>
          <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name} </h3>
              <p class="card-text">${person.email}</p>
              <p class="card-text cap">${person.location}</p>
          </div>
        </div>
        `;
        const modalDiv = document.createElement('div');
        modalDiv.className +="modal-container"
        gallery.appendChild(modalDiv);
        modalDiv.innerHTML = `
            <div class="modal" id=${person.dob}>
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
               <div class="modal-info-container">
                                <img class="modal-img" src=${person.image} alt=${person.name}>
                                <h3 id="name" class="modal-name cap">${person.name}</h3>
                                <p class="modal-text">${person.email}</p>
                                <p class="modal-text cap">${person.location}</p>
                                <hr>
                                <p class="modal-text">${person.phone}</p>
                                <p class="modal-text cap">${person.address}</p>
                                <p class="modal-text">Birthday: ${person.dob}</p>
                </div>
               </div>
                        <div class="modal-btn-container">
                            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                            <button type="button" id="modal-next" class="modal-next btn">Next</button>
                        </div>
          `;
          modalDiv.style.display="none";
        });
  }

      
  // Interaction handler

  function modalHandler() {
    const modals = document.querySelectorAll('.modal-container');
    // Create an array of names
    function createModalNameArr() {
      let nameArr = [];
      modals.forEach(modal => {
        const modalName= modal.querySelector('#name').innerText.toLowerCase();
        nameArr.push(modalName);
      });
      return nameArr;
    };
    const modalNameArr = createModalNameArr();

  // Function to match 
     function modalMatch(findName) {
      modals.forEach(modal => {
        const modalName = modal.querySelector('#name').innerText
        findName===modalName ? modal.style.display='block'  : modal.style.display = 'none';
      });
     }
    }

      // added close button modal

      document.querySelectorAll('#modal-close-btn').forEach(closeModalBtn => {
        closeModalBtn.addEventListener('click', e => {
          let modal = e.currentTarget.parentNode.parentNode;
          modal.style.display = 'none';
        })
      })


document.querySelectorAll('#modal-next').forEach(nxtModalBtn => {
    nxtModalBtn.addEventListener('click', e => {
       const currCard = e.currentTarget.parentNode.parentNode;
       let currName = currCard.querySelector('#name').innerText.toLowerCase();
       //create an array of names from modal profiles and find the current name
       //find the next name
       let nextName = "";
       for(i =0; i < modalNameArr.length; i++) {
         if(currName===modalNameArr[i]&&i!=modalNameArr.length-1) {
           nextName = modalNameArr[i+1];
         } else if(currName===modalNameArr[i]&&i===modalNameArr.length-1){ 
           nextName = modalNameArr[0];
         }
       }
       //find modal that matches next name and display
       modalMatch(nextName);
     })
   })
 
// Called  all the necessary functions 

getRandUsers(randGroupUrl)
  .then(generateHTML)
  .then(modalHandler)
  .then(searchFilter)
  .then(Listner)
  .catch(err => {
    gallery.innerHTML = '<h3>Something went wrong...</h3>';
    console.error(err);
  });

  