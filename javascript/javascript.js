// Smooth scrolling when pressed on navigation buttons
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetPosition = document.querySelector(targetId).offsetTop;
            window.scroll({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
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
                servicesNav.insertAdjacentHTML('beforeend', '<button class="services-nav-button  ' + (i === 0 ? 'active-button"' : '') + ' aria-label="Service 01" role="button" onclick="showService(' + i + ')">' + data[i].shortName + '</button>');
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
