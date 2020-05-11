

// Created the necessary const




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

    // Added a click event 

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', e => {
          const currCard = e.currentTarget;
          const currName = currCard.querySelector('.card-name').innerText.toLowerCase();
          modalMatch(currName);
        });
      });

      // added close button modal

      document.querySelectorAll('#modal-close-btn').forEach(closeModalBtn => {
        closeModalBtn.addEventListener('click', e => {
          let modal = e.currentTarget.parentNode.parentNode;
          modal.style.display = 'none';
        })
      })