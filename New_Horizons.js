// prealod div
const preload = document.querySelector(".preload");
window.addEventListener("load", (_) => {
  preload.classList.add("loading");
});

// make the links of the header section active
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
  searchForm.classList.add("active");
};
searchClose.onclick = (_) => {
  searchForm.classList.remove("active");
};

// open & close the mnue , cart and photos
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
  if (!cart.contains(event.target)) {
    closeCart();
  }
  if (!zoomImageContainer.contains(event.target)) {
    zoomImageBoxs.forEach((zoomImageBox) => {
      zoomImageBox.classList.remove("active");
    });
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
  closeCart();
  searchForm.classList.remove("active");
  navActive();
  zoomImageBoxs.forEach((zoomImageBox) => {
    zoomImageBox.classList.remove("active");
  });
};

// Open and Close the cart
const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const CloseCartBtn = document.querySelector(".cart-close");
cartBtn.onclick = (event) => {
  event.stopPropagation();
  closeMenu();
  cart.style.translate = "0";
  cart.style.boxShadow = "0 0 0 105vw rgba(0,0,0,.8)";
};
let closeCart = (_) => {
  cart.style.translate = "110%";
  cart.style.boxShadow = "none";
};
CloseCartBtn.onclick = (_) => {
  closeCart();
};

// select all the products we have in "products" array
const products = [
  {
    id: "1",
    title: "backpack",
    price: 35,
    stars: "fas fa-star-half-alt",
  },
  {
    id: "2",
    title: "camera",
    price: 50,
    stars: "fas fa-star",
  },
  {
    id: "3",
    title: "Knife",
    price: 20,
    stars: "fas fa-star-half-alt",
  },
  {
    id: "4",
    title: "life jaket",
    price: 15,
    stars: "fa-regular fa-star",
  },
  {
    id: "5",
    title: "compass",
    price: 10,
    stars: "fas fa-star",
  },
  {
    id: "6",
    title: "wristwatch",
    price: 20,
    stars: "fas fa-star-half-alt",
  },
  {
    id: "7",
    title: "Thin knife",
    price: 10,
    stars: "fas fa-star-half-alt",
  },
  {
    id: "8",
    title: "boot",
    price: 30,
    stars: "fas fa-star-half-alt",
  },
  {
    id: "9",
    title: "S Hook",
    price: 10,
    stars: "fa-regular fa-star",
  },
  {
    id: "10",
    title: "Binocular",
    price: 35,
    stars: "fas fa-star-half-alt",
  },
  {
    id: "11",
    title: "Flashlight",
    price: 10,
    stars: "fas fa-star-half-alt",
  },
  {
    id: "12",
    title: "magnifying glass",
    price: 10,
    stars: "fa-regular fa-star",
  },
];
products.forEach((el) => {
  el.count = 1;
});

// show the quantity of products in the cart
let quantity = document.getElementById("quantity");
let quantityAppear = (_) => {
  if (
    quantity.innerText == "0" ||
    localStorage.quantityCount == 0 ||
    localStorage.quantityCount == null
  ) {
    quantity.style.visibility = "hidden";
  } else {
    quantity.style.visibility = "visible";
  }
};

// localStorage.clear();

// set the total price and the quantity of products
let total = document.querySelector(".total");
let totalPrice;
let quantityCount;
let cartListProducts;
let countAndPriceNumber = (_) => {
  localStorage.totalPrice = totalPrice;
  quantityCount = quantityCount + 1;
  localStorage.quantityCount = quantityCount;
  if (localStorage.totalPrice < 0 || localStorage.quantityCount < 0) {
    totalPrice = 0;
    quantityCount = 0;
  }
  total.innerText = `Total : $${localStorage.totalPrice}.00`;
  quantity.innerText = localStorage.quantityCount;
  quantityAppear();
};
if (
  localStorage.quantityCount == null ||
  localStorage.totalPrice == null ||
  localStorage.cartListProducts == null
) {
  quantityCount = 0;
  totalPrice = 0;
  cartListProducts = [];
} else {
  cartListProducts = JSON.parse(localStorage.cartListProducts);
  totalPrice = Number(localStorage.totalPrice);
  quantityCount = Number(localStorage.quantityCount);
  quantityCount = quantityCount - 1;
  countAndPriceNumber();
}

// add a product to the cart
let addToCart = (index) => {
  // check if this product is a new in the cart of not
  for (i = 0; i < cartListProducts.length; i++) {
    // if it is new add it
    if (cartListProducts[i].id == products[index].id) {
      cartListProducts[i].count++;
      localStorage.cartListProducts = JSON.stringify(cartListProducts);
      totalPrice = totalPrice + products[index].price;
      countAndPriceNumber();
      // the main adding function
      fullCartList();
      minusAndPlus();
      // delete the product function
      trashProduct();

      return;
    }
  }
  // if it is old just increase the count product
  cartListProducts.splice(0, 0, products[index]);
  localStorage.cartListProducts = JSON.stringify(cartListProducts);
  totalPrice = totalPrice + products[index].price;
  countAndPriceNumber();
  fullCartList();
  minusAndPlus();
  trashProduct();
};

// control in the DOM to adding the products to the cart
let cartList = document.querySelector(".cartList");
let fullCartList = (_) => {
  let allProducts = [];
  for (i = 0; i < cartListProducts.length; i++) {
    allProducts += `
    <div class="product">
      <div class="imagebox">
        <img src="./photos/shop/${cartListProducts[i].title}.png" alt="">
      </div>
      <div class="titleAndPrice">
        <h4>${cartListProducts[i].title}</h4>
        <span>$${
          cartListProducts[i].price * cartListProducts[i].count
        }.00</span>
      </div>
      <div class="dec-increase">
        <div class="fas fa-square-minus minusBtn"></div>
        <span>${cartListProducts[i].count}</span>
        <div class="fas fa-square-plus plusBtn"></div>
        <div class="fas fa-trash trashs"></div>
      </div>
    </div>
    `;
  }

  cartList.innerHTML = allProducts;
};
fullCartList();

// decrease or increase the products count and total price function
let minusBtns = [];
let plusBtns = [];
let minusAndPlus = (_) => {
  minusBtns = document.querySelectorAll(".minusBtn");
  plusBtns = document.querySelectorAll(".plusBtn");
  // decrease the count of the product or delet the product
  minusBtns.forEach((minusBtn, ind) => {
    minusBtn.onclick = (event) => {
      totalPrice = totalPrice - cartListProducts[ind].price;
      quantityCount = quantityCount - 2;
      countAndPriceNumber();
      // delete the product if his count == 0
      if (cartListProducts[ind].count == 1) {
        cartListProducts.splice([ind], 1);
      } else {
        cartListProducts[ind].count--;
      }
      localStorage.cartListProducts = JSON.stringify(cartListProducts);
      event.stopPropagation();
      fullCartList();
      // call the function again to keep it in link with the DOM
      trashProduct();
      minusAndPlus();
    };
  });

  // increase the count of the product and the total price
  plusBtns.forEach((plusBtn, ind) => {
    plusBtn.onclick = (event) => {
      cartListProducts[ind].count++;
      localStorage.cartListProducts = JSON.stringify(cartListProducts);
      totalPrice = totalPrice + cartListProducts[ind].price;
      countAndPriceNumber();
      event.stopPropagation();
      fullCartList();
      // call the function again to keep it in link with the DOM
      trashProduct();
      minusAndPlus();
    };
  });
};

// delete a product from the cart and chang the total price and the quantity
let trashs = [];
let trashProduct = (_) => {
  trashs = document.querySelectorAll(".trashs");
  trashs.forEach((trash, index) => {
    trash.onclick = (event) => {
      totalPrice =
        totalPrice -
        cartListProducts[index].price * cartListProducts[index].count;
      quantityCount = quantityCount - cartListProducts[index].count - 1;
      countAndPriceNumber();
      event.stopPropagation();
      cartListProducts.splice(index, 1);
      localStorage.cartListProducts = JSON.stringify(cartListProducts);
      fullCartList();
      minusAndPlus();
      trashProduct();
    };
  });
};
// call the 2 functions to be ready when the page relod
minusAndPlus();
trashProduct();

// delete all product carts
let dumpster = document.querySelector(".fa-dumpster");
dumpster.onclick = (_) => {
  cartListProducts = [];
  localStorage.cartListProducts = JSON.stringify(cartListProducts);
  quantityCount = -1;
  totalPrice = 0;
  countAndPriceNumber();
  products.forEach((el) => {
    el.count = 1;
  });
  fullCartList();
  minusAndPlus();
  trashProduct();
};

// made the Home swiper rum
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

// full the Shopping section
const zoomImageContainer = document.getElementById("zoomImageContainer");
const shopContainer = document.getElementById("shopContainer");
let fullShop = (_) => {
  let productBigImages = [];
  let anyproductbox = "";
  for (i = 0; i < products.length; i++) {
    productBigImages += `
      <div class="zoomImageBoxs">
        <div class="fas fa-xmark classZoom"></div>
        <img src="./photos/shop/${products[i].title}.png" loading="lazy" alt="" class="imageProducts">
      </div>
      `;
    anyproductbox += `
        <div class="productbox slide swiper-slide">
          <div class="imagebox">
            <img src="./photos/shop/${products[i].title}.png" loading="lazy" alt="">
            <div class="icons">
              <a class="fas fa-shopping-cart IconProductCart" onclick="addToCart(${i})"></a>
              <a class="fas fa-eye"></a>
              <a href="#" class="fas fa-share"></a>
            </div>
          </div>
          <h4>${products[i].title}</h4>
          <span>$${products[i].price}.00</span>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="${products[i].stars}"></i>
          </div>
        </div>`;
  }
  shopContainer.innerHTML = anyproductbox;
  zoomImageContainer.innerHTML += productBigImages;
};
fullShop();

// zoom in a photo product
let eyes = document.querySelectorAll(".fa-eye");
let zoomImageBoxs = document.querySelectorAll(".zoomImageBoxs");
let classZoom = document.querySelectorAll(".classZoom");
eyes.forEach((eye, index) => {
  eye.onclick = (event) => {
    event.stopPropagation();
    zoomImageBoxs[index].classList.add("active");
  };
});
classZoom.forEach((classZoomOne, index) => {
  classZoomOne.onclick = (_) => zoomImageBoxs[index].classList.remove("active");
});

// made the Shopping swiper rum
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

// full the packages section
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
  "Walking tour through a mountain orchard. Explore nature's beauty.",
  "Cable car adventure amidst stunning icebergs. Experience the chill.",
  "Hit the slopes and enjoy thrilling winter skiing adventures.",
  "Romantic getaways with scenic views and intimate experiences",
  "Feel the adrenaline rush with an exhilarating skydiving experience.",
  "Enjoy swimming, canoeing, and kayaking in sunny summer locations.",
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
            <img src="./photos/packages/${packagesImages[i]}.jpg" loading="lazy" alt="">
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

// full the Reviews section
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
              <img src="./photos/profile picture/${commentImage[i]}.jpg" loading="lazy" alt="" />
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

// made the Reviews swiper rum
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

// full the services section
const boxContainer = document.getElementById("servicesContainer");
const servicesImages = ["1", "2", "3", "4", "5", "6"];
const servicesSummary = [
  "Expert guides to ensure a seamless and enjoyable trip.",
  "Tailor-made travel experiences to suit your preferences and needs.",
  "Fun and memorable adventures designed for the whole family.",
  "Exciting camping experiences in beautiful and serene locations.",
  "Explore thrilling trails with guided adventure tours and activities.",
  "Diverse activities to satisfy your adventurous spirit and curiosity.",
];
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
          <img src="./photos/services/${servicesImages[i]}.png" loading="lazy" alt="" />
          <h3><span>${servicesName[i]}</span></h3>
          <p>
            ${servicesSummary[i]}
          </p>
          <a href="#" class="btn">Read More</a>
        </div>
    `;
  }
  boxContainer.innerHTML = allServices;
};
fullService();

// full the blogs section
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
  "Unwind and rejuvenate with our peaceful and serene destinations.",
  "Conquer peaks and enjoy breathtaking views with guided mountain hikes.",
  "Experience the thrill of paragliding and feel the freedom.",
  "Discover the joy of solo travel and personal reflection.",
  "Enjoy exhilarating swings high above the ground with stunning views.",
  "Cherish romantic sunsets with your special someone in beautiful settings.",
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
                <img src="./photos/blogs/${blogsImages[i]}.jpg" loading="lazy" alt="" />
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

// made the blogs swiper rum
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

// made the clients swiper rum
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

// parallax
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("showItem");
    }
  });
});

const Disappeareds = document.querySelectorAll(".Disappeared");
Disappeareds.forEach((Disappeared) => observer.observe(Disappeared));
