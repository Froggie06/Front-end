// JavaScript Document
console.log("hi");

// link naar hamburgermenu scherm
const hamMenu = document.querySelector(".ham-menu");

// link naar hamburgermenu icoon
const offScreenMenu = document.querySelector(".off-screen-menu");

// actie van het hamburger menu door te klikken
hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});