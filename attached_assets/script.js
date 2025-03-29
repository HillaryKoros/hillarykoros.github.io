"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// mobile sidebar clicked by default
sidebarBtn.click();

// auto scrolling Tech Skills
const list = document.querySelector(".technologies-list");
if (list) { // Check if element exists to prevent errors
  const listItems = list.querySelectorAll(".technologies-item");
  const scrollSpeed = 0.5; // Reduced speed for better performance
  const intervalDuration = 16; // Aligned with typical 60fps refresh rate
  let scrollPosition = 0;
  let scrolling = false;
  let scrollInterval = null;

  function startScrolling() {
    if (!scrolling) {
      scrolling = true;
      // Clear any existing interval to prevent duplicates
      if (scrollInterval) clearInterval(scrollInterval);
      
      const totalWidth = list.scrollWidth - list.clientWidth;
      
      scrollInterval = setInterval(() => {
        if (!scrolling) {
          clearInterval(scrollInterval);
          return;
        }
        
        scrollPosition += scrollSpeed;
        
        if (scrollPosition >= totalWidth) {
          scrollPosition = 0;
        }
        
        list.scrollLeft = scrollPosition;
      }, intervalDuration);
    }
  }

  function stopScrolling() {
    scrolling = false;
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  }

  // Use a simpler check for visibility
  if (list.getBoundingClientRect().top < window.innerHeight) {
    startScrolling();
  }

  // Use an improved IntersectionObserver with proper cleanup
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startScrolling();
        } else {
          stopScrolling();
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px" }
  );

  observer.observe(list);

  // Add proper event listeners with cleanup
  list.addEventListener("mouseenter", stopScrolling);
  list.addEventListener("mouseleave", startScrolling);
  
  // Cleanup on page changes
  window.addEventListener("beforeunload", () => {
    stopScrolling();
    observer.disconnect();
  });
}

// variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    const categories = item.dataset.category.split(' ');
    if (selectedValue === "all" || categories.includes(selectedValue)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetSection = this.getAttribute("data-target-section")
      ? this.getAttribute("data-target-section")
      : this.innerHTML.toLowerCase();

    for (let i = 0; i < pages.length; i++) {
      if (targetSection === pages[i].dataset.page) {
        pages[i].classList.add("active");

        if (navigationLinks[i]) {
          navigationLinks[i].classList.add("active");
        }
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");

        if (navigationLinks[i]) {
          navigationLinks[i].classList.remove("active");
        }
      }
    }
  });
}

// open certificates on click
function imgWindow() {
  window.open("image");
}

// copy email address
function copyEmail(e) {
  var email = document.querySelector(".email-text");
  var range = document.createRange();
  range.selectNode(email);
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  e.target.innerText = "Copied"
  setTimeout(()=>{
    e.target.innerText="Copy";
  }, 300)
}

// Animated percentage bar
function increaseProgress(element, targetWidth) {
  var currentWidth = 0;
  var increment = 1;
  var interval = 10;

  var timer = setInterval(function () {
    currentWidth += increment;
    element.style.width = currentWidth + "%";
    if (currentWidth >= targetWidth) {
      clearInterval(timer);
    }
  }, interval);
}

function startAnimationOnScroll() {
  var progressFillElements = document.querySelectorAll(
    ".languages-progress-fill"
  );

  // If no elements found, exit early
  if (progressFillElements.length === 0) return;

  var options = {
    root: null,
    rootMargin: "50px", // Increased margin for earlier detection
    threshold: 0.2, // Lower threshold for earlier trigger
  };

  var animatedElements = new Set(); // Track elements that have been animated

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // Only animate if not already animated and is intersecting
      if (entry.isIntersecting && !animatedElements.has(entry.target)) {
        var targetWidth = parseInt(entry.target.style.width || "0");
        // Ensure we have a valid number
        if (!isNaN(targetWidth) && targetWidth > 0) {
          animatedElements.add(entry.target); // Mark as animated
          increaseProgress(entry.target, targetWidth);
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);

  progressFillElements.forEach(function (element) {
    observer.observe(element);
  });

  // Cleanup when leaving the page
  window.addEventListener("beforeunload", function() {
    observer.disconnect();
  });
}

// Only start animation if the document is fully loaded
if (document.readyState === "complete") {
  startAnimationOnScroll();
} else {
  window.addEventListener("load", startAnimationOnScroll);
}

// Loading Animation
window.addEventListener("DOMContentLoaded", (event) => {
  const imageContainers = document.querySelectorAll(".project-img");
  imageContainers.forEach((container) => {
    const image = container.querySelector("img");
    image.addEventListener("load", function () {
      container.classList.remove("loading");
    });
  });
});

// Age Counter Animation
function countTo(target, duration) {
  const start = 0;
  const increment = (target / duration) * 50;

  let current = start;
  const timer = setInterval(function () {
    current += increment;
    document.getElementById("age").textContent =
      Math.floor(current) + " years old";

    if (current >= target) {
      clearInterval(timer);
      document.getElementById("age").textContent = target + " years old";
    }
  }, 50);
}

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

const ageElement = document.getElementById("age");
ageElement.textContent = "0 years old";

setTimeout(function () {
  countTo(calculateAge("1996-08-16"), 1000);
}, 1000);

// Motto Animation
const text = Array.from({ length: 20 }, () =>
  Array.from({ length: 16 }, () => Math.round(Math.random())).join("")
);
text.push("My Resume");


const mottoElement = document.getElementById("motto");
let index = 0;

function flipmotto() {
  mottoElement.textContent = text[index];

  if (text[index] === "My Resume") {
    clearInterval(intervalId);
  }

  index = (index + 1) % text.length;
}

const intervalId = setInterval(flipmotto, 100);

// Expanding About Text
function toggleText() {
  var moreText = document.getElementById("publications");
  var btnText = document.getElementById("toggle-button");

  if (moreText.style.display === "none") {
    moreText.style.display = "block";
    btnText.innerHTML = "&uarr; &nbsp; &nbsp; Hide text &nbsp; &nbsp; &uarr;";
  } else {
    moreText.style.display = "none";
    btnText.innerHTML = "&darr; &nbsp; &nbsp; Show more &nbsp; &nbsp; &darr;";
  }
}


