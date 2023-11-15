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
    logoEl.classList.toggle("active");
})


function closeMenu() {
  hamburgerEl.classList.toggle("active");
  navMenuEl.classList.toggle("active");
  logoEl.classList.toggle("active");
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
let serviceNameArr;
let servicesData;
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
            servicesData = data;
            // Stores classes in variables they will be used to insert html code in
            const servicesNav = document.querySelector('.services-nav');
            const servicesContent = document.querySelector('.services-contect');
            for (let i = 0; i < data.length; i++) {
                servicesContent.insertAdjacentHTML('beforeend', '<div class="service ' + (i === 0 ? 'active' : '') + '"><img src=" ' + data[i].image + '" alt=""><div class="service-information"><h2>' + data[i].name + '</h2><p>' + data[i].description + '</p></div></div>');
                servicesNav.insertAdjacentHTML('beforeend', '<button class="services-nav-button ' + (i === 0 ? 'active-button"' : '') + ' aria-label="' + data[i].name + '" role="button" onclick="showService(' + i + ')"><a>' + (i === 0 ? data[i].name : data[i].shortName) + '</a></button>');
            }

            servicesArr = document.querySelectorAll('.service');
            buttonsArr = document.querySelectorAll('.services-nav button');
            serviceNameArr = document.querySelectorAll('.services-nav button a');
        })
        .catch(error => console.error('Error fetching data:', error));
}
// Services slideshow
let currentIndex = 0;
let interval;

function showService(index) {
    servicesArr[currentIndex].classList.remove('active');
    buttonsArr[currentIndex].classList.remove('active-button');
    serviceNameArr[currentIndex].textContent = servicesData[currentIndex].shortName;
    currentIndex = index >= 0 ? index % servicesArr.length : servicesArr.length - 1;
    serviceNameArr[currentIndex].textContent = servicesData[currentIndex].name;
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
