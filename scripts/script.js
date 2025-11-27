// JavaScript Document
console.log("hi");

// link naar hamburgermenu scherm
const hamMenu = document.querySelector(".ham-menu");

// link naar hamburgermenu icoon
const offScreenMenu = document.querySelector(".off-screen-menu");

// carrousel 
const list = document.querySelector('.carrousel ul');
const itemWidth = list.querySelector('li').offsetWidth + 20; // item + gap

// actie van het hamburger menu door te klikken
hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  hamMenu.querySelector('.hamburger-icon').classList.toggle("active"); // Toggle op hamburger zelf
  offScreenMenu.classList.toggle("active");
});


document.getElementById('next-btn').addEventListener('click', () => {
    list.scrollLeft += itemWidth * 2;
});

document.getElementById('prev-btn').addEventListener('click', () => {
    list.scrollLeft -= itemWidth * 2;
});
