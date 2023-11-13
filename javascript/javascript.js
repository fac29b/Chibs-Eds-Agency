// Smooth scrolling when pressed on navigation buttons
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
        let targetElement = e.target;

        // Traverse up the DOM tree to find the parent <a> element
        while (targetElement && targetElement.tagName !== 'A') {
            targetElement = targetElement.parentElement;
        }

        if (targetElement && targetElement.getAttribute('href') && targetElement.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = targetElement.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const targetPosition = targetSection.offsetTop;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Hamburger Menu 

const hamburgerEl = document.querySelector(".hamburger");
const navMenuEl = document.querySelector(".nav-menu");
const barEL = document.querySelectorAll(".bar");

hamburgerEl.addEventListener("click", () => {
    hamburgerEl.classList.toggle("active");
    navMenuEl.classList.toggle("active");
})


function closeMenu() {

    if (hamburgerEl.classList.contains('active')) {
        hamburgerEl.classList.remove('active');
    } 

    if (navMenuEl.classList.contains('active')) {
        navMenuEl.classList.remove('active');
    }
}


// About section

document.addEventListener('DOMContentLoaded', function() {
    const bulletItems = document.querySelectorAll('.bullet-point');
  
    bulletItems.forEach(item => {
      const title = item.querySelector('.bullet-title');
      const content = item.querySelector('.bullet-point-content');
  
      title.addEventListener('click', function() {
        // Close all other bullet points
        bulletItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('expanded')) {
            otherItem.classList.remove('expanded');
          }
        });
  
        // Toggle the clicked bullet point
        item.classList.toggle('expanded');
      });
    });
  });

// Services section
// Services/Buttons arrays
let servicesArr;
let buttonsArr;
// Call the fetchServices function to populate service data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchServices(); // Fetches the data from json file
    startSlideshow(); // Start the slideshow after fetching the data
    DisplayTeamCards();
});
// Gets all the information for services from json file and adds it
function fetchServices() {
    fetch('./json/services.json')
        .then(response => response.json())
        .then(data => {
            // Stores classes in variables they will be used to insert html code in
            const servicesNav = document.querySelector('.services-nav');
            const servicesContent = document.querySelector('.services-contect');
            for (let i = 0; i < data.length; i++) {
                servicesContent.insertAdjacentHTML('beforeend', '<div class="service ' + (i === 0 ? 'active' : '') + '"><img src=" ' + data[i].image + '" alt=""><div class="service-information"><h2></h2><p></p></div></div>');
                servicesNav.insertAdjacentHTML('beforeend', '<button class="services-nav-button  ' + (i === 0 ? 'active-button"' : '') + ' aria-label="' + data[i].name + '" role="button" onclick="showService(' + i + ')">' + data[i].shortName + '</button>');
            }

            servicesArr = document.querySelectorAll('.service');
            buttonsArr = document.querySelectorAll('.services-nav button');
            const services = document.querySelectorAll('.service');
            services.forEach((service, index) => {
                const serviceName = data[index].name;
                const serviceDescription = data[index].description;

                const serviceNameElement = service.querySelector('h2');
                const serviceDescriptionElement = service.querySelector('p');

                serviceNameElement.textContent = serviceName;
                serviceDescriptionElement.textContent = serviceDescription;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
// Services slideshow
let currentIndex = 0;
let interval;

function showService(index) {
    servicesArr[currentIndex].classList.remove('active');
    buttonsArr[currentIndex].classList.remove('active-button');
    currentIndex = index >= 0 ? index % servicesArr.length : servicesArr.length - 1;
    servicesArr[currentIndex].classList.add('active');
    buttonsArr[currentIndex].classList.add('active-button');
}

function startSlideshow() {
    interval = setInterval(() => {
        showService(currentIndex + 1);
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)
}

function pauseSlideshow() {
    clearInterval(interval);
}

function resumeSlideshow() {
    interval = setInterval(() => {
        showService(currentIndex + 1);
    }, 5000);
}

// Pause the slideshow on hover
document.querySelector('.services-contect').addEventListener('mouseover', () => {
    pauseSlideshow();
});

// Resume the slideshow when the cursor leaves the slideshow area
document.querySelector('.services-contect').addEventListener('mouseout', () => {
    resumeSlideshow();
});

// Team section
function DisplayTeamCards(){
    fetch('./json/team.json')
        .then(response => response.json())
        .then(data => {
            // Stores class in variable they will be used to insert html code in
            const grid = document.querySelector('.grid');
            for (let i = 0; i < data.length; i++) {
                grid.insertAdjacentHTML('beforeend', '<li class="card"><img src="' + data[i].image + '" alt="Image"><div class="details"><h2>' + data[i].name + '</h2><h3>' + data[i].position + '</h3><p id="info">' + data[i].description + '</p></div></li>');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
};

//Contact Form 
const form = document.getElementById('contact-form');
const formName = document.getElementById('name');
const email = document.getElementById('email');
const company = document.getElementById('company-name');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
      if (input.value.trim() === '') {
        showError(input, getCustomErrorMessage(input));
      } else {
        showSuccess(input);
      }
    });
  }
  
  // Error messages 
  function getCustomErrorMessage(input) {
    const customMessages = {
      'company-name': 'Company name is required, if not applicable type N/A',
    };
  
    return customMessages[input.id] || `${getFieldName(input)} is required`;
  }
  

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}


// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([company]);
  checkLength(formName, 3, 15);
  checkEmail(email);


//Make sure there are no errors before submitting 
  if (document.querySelectorAll('.form-control.error').length === 0) {
    form.submit();;
  }
});