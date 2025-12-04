// JavaScript Document
console.log("hi");

// Wacht tot DOM geladen is
document.addEventListener("DOMContentLoaded", () => {
    
    // ===== ALLE CONST DECLARATIES =====
    const hamMenu = document.querySelector(".ham-menu");
    const offScreenMenu = document.querySelector(".off-screen-menu");
    const closeIcon = document.querySelector(".closeIcon");
    const list = document.querySelector('.carrousel ul');
    const slide = document.querySelector('.slider ul');
    const buttons = document.querySelectorAll('.wesay-yousay button');
    const quotes = document.querySelectorAll('.quote > div');
    const dropdownHeaders = document.querySelectorAll('.dropdown-header');
    
    // ===== HAMBURGER MENU =====
    if (hamMenu && offScreenMenu) {
    // Open menu
    hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        hamMenu.querySelector('.hamburgerIcon').classList.toggle("active");
        offScreenMenu.classList.toggle("active");
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu
    if (closeIcon) {
        closeIcon.addEventListener("click", () => {
            hamMenu.classList.remove("active");
            hamMenu.querySelector('.hamburgerIcon').classList.remove("active");
            offScreenMenu.classList.remove("active");
            document.body.classList.remove('menu-open');
        });
    }
}
    
    // ===== CARROUSEL =====
    if (list) {
        const itemWidth = list.querySelector('li').offsetWidth + 20;
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                list.scrollLeft += itemWidth * 2;
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                list.scrollLeft -= itemWidth * 2;
            });
        }
    }
    
    // ===== SLIDER =====
    if (slide) {
        const itemWidth = slide.querySelector('li').offsetWidth + 20;
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                slide.scrollLeft += itemWidth * 1;
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                slide.scrollLeft -= itemWidth * 1;
            });
        }
    }
    
    // ===== WE SAY / YOU SAY QUOTES =====
    if (buttons.length > 0 && quotes.length > 0) {
        // Start: eerste zichtbaar
        quotes.forEach((q, i) => q.style.display = i === 0 ? "block" : "none");
        
        // Start: eerste button actief (LI)
        buttons.forEach((b, i) => {
            if (i === 0) b.parentElement.classList.add("active");
            else b.parentElement.classList.remove("active");
        });
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset.target;
                
                // Toon juiste quote
                quotes.forEach(q => {
                    q.style.display = q.id === target ? "block" : "none";
                });
                
                // Active class op LI, niet op button
                buttons.forEach(b => b.parentElement.classList.remove("active"));
                button.parentElement.classList.add("active");
            });
        });
    }
    
   // ===== DROPDOWN MENU =====
    if (dropdownHeaders.length > 0) {
        dropdownHeaders.forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('svg');
                
                if (content && icon) {
                    content.classList.toggle('open');
                    icon.classList.toggle('rotated');
                }
            });
        });
    }
    
});
