// make the link of section active
const navList = document.querySelectorAll("header nav a");
const sections = document.getElementsByTagName("section");
let navActive = (_) => {
  let sectionsLength = sections.length;
  while (
    --sectionsLength &&
    window.scrollY + 97 < sections[sectionsLength].offsetTop
  ) {}
  navList.forEach((ancore) => {
    ancore.classList.remove("active");
  });
  navList[sectionsLength].classList.add("active");
};
navActive();

// search btn
const searchBtn = document.getElementById("search-btn");
const searchForm = document.querySelector(".search-form");
const searchClose = document.querySelector(".search-close");
searchBtn.onclick = (_) => {
  searchForm.classList.toggle("active");
};
searchClose.onclick = (_) => {
  searchForm.classList.toggle("active");
};

// open & close the mnue
const menu = document.getElementById("menu");
const nav = document.querySelector("nav");
const xmark = document.querySelector(".fa-xmark");
let closeMenu = (_) => {
  nav.style.left = "-110vw";
  nav.style.boxShadow = "none";
};
document.onclick = (event) => {
  if (!nav.contains(event.target)) {
    closeMenu();
  }
};

menu.onclick = (event) => {
  event.stopPropagation();
  nav.style.left = "0";
  nav.style.boxShadow = "0 0 0 105vw rgba(0,0,0,.8)";
};
xmark.onclick = (_) => closeMenu();
window.onscroll = (_) => {
  closeMenu();
  searchForm.classList.remove("active");
  navActive();
};

// made the swiper rum
var swiper = new Swiper(".home_swiper", {
  effect: "fade",
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 4160,
    disableOnInteraction: false,
  },
  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// full the product div
const shopContainer = document.getElementById("shopContainer");
const shopImages = [
  "backpack",
  "camera",
  "knife",
  "life jaket",
  "compass",
  "wristwatch",
  "Thin knife",
  "boot",
  "S Hook",
  "Binocular",
  "Flashlight",
  "magnifying glass",
];
const shopPrice = [
  "$35.00",
  "$50.00",
  "$20.00",
  "$15.00",
  "$10.00",
  "$20.00",
  "$10.00",
  "$30.00",
  "$10.00",
  "$35.00",
  "$10.00",
  "$10.00",
];
const stars = [
  "fas fa-star-half-alt",
  "fas fa-star",
  "fas fa-star-half-alt",
  "fa-regular fa-star",
  "fas fa-star",
  "fas fa-star-half-alt",
  "fas fa-star-half-alt",
  "fas fa-star-half-alt",
  "fa-regular fa-star",
  "fas fa-star-half-alt",
  "fas fa-star-half-alt",
  "fa-regular fa-star",
];

let fullShop = (_) => {
  let anyproductbox = "";
  for (i = 0; i < shopImages.length; i++) {
    anyproductbox += `
        <div class="productbox slide swiper-slide">
          <div class="imagebox">
            <img src="./photos/shop/${shopImages[i]}.png" alt="">
            <div class="icons">
              <a href="#" class="fas fa-shopping-cart IconProductCart"></a>
              <a href="#" class="fas fa-eye"></a>
              <a href="#" class="fas fa-share"></a>
            </div>
          </div>
          <h4>${shopImages[i]}</h4>
          <span>${shopPrice[i]}</span>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="${stars[i]}"></i>
          </div>
        </div>`;
  }
  shopContainer.innerHTML = anyproductbox;
};
fullShop();

const editCountPlus = document.querySelector(".editCountPlus");
const editCountMinus = document.querySelector(".editCountMinus");

// made the swiper rum
var swiper = new Swiper(".product-slider", {
  spaceBetween: 40,
  loop: true,
  grabCursor: true,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1354: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  },
  autoplay: {
    delay: 3333,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// packages
const packagesContainer = document.getElementById("packagesContainer");
const packagesImages = [
  "Hiking",
  "ice age",
  "skiing",
  "couples",
  "skydiving",
  "summer",
];
const packagesdescribe = [
  "lorem fdhgxf grbsdg htgtrhsrt strhbsrthb strhbstrh trhg trhgh thg reg",
  "lorem fdhgxf grbsdg htgtrhsrt strhbsrthb strhbstrh trhg trhgh thg reg",
  "lorem fdhgxf grbsdg htgtrhsrt strhbsrthb strhbstrh trhg trhgh thg reg",
  "lorem fdhgxf grbsdg htgtrhsrt strhbsrthb strhbstrh trhg trhgh thg reg",
  "lorem fdhgxf grbsdg htgtrhsrt strhbsrthb strhbstrh trhg trhgh thg reg",
  "lorem fdhgxf grbsdg htgtrhsrt strhbsrthb strhbstrh trhg trhgh thg reg",
];
const packagesPrice = [
  "$200 - $300",
  "$250 - $350",
  "$250 - $350",
  "$450 - $600",
  "$300 - $450",
  "$250 - $500",
];
let fullPackages = (_) => {
  let anypackages = "";
  for (i = 0; i < packagesImages.length; i++) {
    anypackages += `
        <div class="box">
          <div class="imgBox">
            <img src="./photos/packages/${packagesImages[i]}.jpg" alt="">
          </div>
          <h3>${packagesImages[i]} Packages</h3>
          <p>${packagesdescribe[i]}</p>
          <span>${packagesPrice[i]}</span>
          <a href="#" class="btn">Explore Now</a>
        </div>`;
  }
  packagesContainer.innerHTML = anypackages;
};
fullPackages();

// coments
const containerBox = document.querySelector(".containerBox");
const coment = [
  "Absolutely thrilled with the impeccable service and breathtaking destinations! New Horizons turns travel dreams into reality, one trip at a time. Highly recommended for anyone seeking an unforgettable journey! 🏞️✈️ #Wanderlust",
  "Exploring new destinations with New Horizons has been a dream come true! The attention to detail and the cultural experiences are unmatched. Can't wait for my next adventure with you! 🌍✨ #TravelGoals",
  "Outstanding travel experiences with unparalleled service! Every detail is thoughtfully arranged, making each trip smooth and memorable. New Horizons truly knows how to create magical journeys. 🌟✈️ #ExploreMore",
  "Discovering the world's wonders with New Horizons has been an incredible journey. The curated experiences and exceptional service make every trip unforgettable. Here's to many more explorations! 🌅🏜️ #TravelMagic",
  "Capturing the beauty of the world through my lens has never been more exhilarating! Your adventure trips offer the perfect backdrop for stunning photography, from skydiving to serene canoeing. A photographer's paradise! 📸🌄 #CaptureTheAdventure",
  "Your adventure trips have been nothing short of spectacular! From the adrenaline rush of skydiving to the tranquility of canoeing, every moment is a hit. Perfect for finding inspiration and relaxation. 🎤🎶✈️ #AdventureTunes",
  "Bravo! Each journey with New Horizons has been filled with elegance, excitement, and exquisite memories. The blend of luxury and adventure is simply perfect. Merci beaucoup! 🌟✈️ #ElegantEscapes",
];
const commentImage = ["1", "2", "3", "4", "5", "6", "7"];
const commentName = [
  "Ailsa MacLeod",
  "Thandiwe Mokoena",
  "Arjun Sharma",
  "Layla Hassan",
  "Sakura Tanaka",
  "Thiago Silva",
  "Chloé Dubois",
];
const job = [
  "Software Engineer",
  "Social Media Influencer",
  "Data Scientist",
  "Archaeologist",
  "photographer",
  "singer",
  "fashion designer",
];
let fullComments = (_) => {
  let allComments = "";
  for (i = 0; i < commentImage.length; i++) {
    allComments += `
          <div class="commentBox slide swiper-slide">
            <div class="content">
              <p>
              ${coment[i]}
              </p>
            </div>
            <div class="pearson">
              <img src="./photos/profile picture/${commentImage[i]}.jpg" alt="" />
              <div class="info">
                <h4 class="name">${commentName[i]}</h4>
                <span class="work">${job[i]}</span>
              </div>
            </div>
          </div>`;
  }
  containerBox.innerHTML = allComments;
};
fullComments();

// made the swiper rum
var swiper = new Swiper(".review-slider", {
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    770: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// services
const boxContainer = document.getElementById("servicesContainer");
const servicesImages = ["1", "2", "3", "4", "5", "6"];
const servicescomment = [];
const servicesName = [
  "Complete Guide",
  "Custom Packages",
  "Family Trips",
  "Camp",
  "Adventure Trail",
  "Various Adventures",
];

let fullService = (_) => {
  let allServices = "";
  for (i = 0; i < servicesImages.length; i++) {
    allServices += `
        <div class="box service">
          <img src="./photos/services/${servicesImages[i]}.png" alt="" />
          <h3><span>${servicesName[i]}</span></h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            accusamus.
          </p>
          <a href="#" class="btn">Read More</a>
        </div>
    `;
  }
  boxContainer.innerHTML = allServices;
};
fullService();

// blogs
const blogsContainer = document.getElementById("blogsContainer");
const blogsImages = [
  "Relaxation is all you need",
  "Hiking to the top of the mountain",
  "Learn how to fly",
  "is that enough to talk alone ",
  "Swing In The Sky",
  "Sunset with your loved one",
];
const blogsPosts = [
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,incidunt!",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,incidunt!",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,incidunt!",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,incidunt!",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,incidunt!",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,incidunt!",
];
const blogsDate = [
  "1st March, 2024",
  "22nd March, 2024",
  "14th April, 2024",
  "26th April, 2024",
  "19th May, 2024",
  "5th July, 2024",
];

let fullBlogs = (_) => {
  let allBlogs = "";
  for (i = 0; i < blogsImages.length; i++) {
    allBlogs += `
          <div class="blogspost  slide swiper-slide">
            <div class="imageAndDate">
              <div class="imageBox">
                <img src="./photos/blogs/${blogsImages[i]}.jpg" alt="" />
              </div>
              <div class="date">
                <a href="#"><i class="fas fa-calendar-days"></i>${blogsDate[i]}</a>
                <a href="#"><i class="fas fa-user"></i>By Admin</a>
              </div>
            </div>
            <h3>${blogsImages[i]}</h3>
            <p>${blogsPosts[i]}</p>
            <a href="#" class="btn">Read More</a>
          </div>`;
  }
  blogsContainer.innerHTML = allBlogs;
};
fullBlogs();

// made the swiper rum
var swiper = new Swiper(".blog-slider", {
  spaceBetween: 30,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    760: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// made the swiper rum
var swiper = new Swiper(".client-slider", {
  spaceBetween: 20,
  loop: true,
  grabCursor: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
  autoplay: {
    delay: 4160,
    disableOnInteraction: false,
  },
});
