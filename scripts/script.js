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
    const hammenuHeaders = document.querySelectorAll('.hammenu-header');
    
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
    const items = Array.from(list.querySelectorAll('li'));
    const originalCount = items.length;
    let clonedItems = [];
    
    // Check of we onder 768px zijn
    const isMobile = () => window.innerWidth < 768;
    
    const addClones = () => {
        // Verwijder eerst eventuele oude clones
        clonedItems.forEach(clone => clone.remove());
        clonedItems = [];
        
        // Voeg nieuwe clones toe
        for (let i = 0; i < 4; i++) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                list.appendChild(clone);
                clonedItems.push(clone);
            });
        }
    };
    
    const removeClones = () => {
        clonedItems.forEach(clone => clone.remove());
        clonedItems = [];
    };
    
    // Initialiseer op basis van schermgrootte
    if (isMobile()) {
        addClones();
    }
    
    const totalItems = originalCount;
    let currentPosition = 0;
    let isAnimating = false;
    let itemWidth = 0;
    let scrollAmount = 0;
    
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    const calculateScrollAmount = () => {
        if (!isMobile()) return;
        
        const firstItem = list.querySelector('li');
        if (firstItem) {
            const itemRect = firstItem.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(list);
            const gap = parseFloat(computedStyle.gap) || 0;
            itemWidth = itemRect.width + gap;
            scrollAmount = itemWidth * 2;
        }
    };
    
    const updatePosition = (instant = false) => {
        if (!isMobile()) {
            list.style.transform = 'none';
            return;
        }
        
        if (instant) {
            list.style.transition = 'none';
        } else {
            list.style.transition = 'transform 0.5s ease';
        }
        list.style.transform = `translateX(-${currentPosition}px)`;
    };
    
    const checkLoop = () => {
        if (!isMobile()) return;
        
        const singleSetWidth = itemWidth * totalItems;
        const minPosition = 0;
        const maxPosition = singleSetWidth * 3;
        
        if (currentPosition >= maxPosition) {
            currentPosition = singleSetWidth;
            updatePosition(true);
        } 
        else if (currentPosition <= minPosition) {
            currentPosition = singleSetWidth * 2;
            updatePosition(true);
        }
    };
    
    const init = () => {
        if (isMobile()) {
            calculateScrollAmount();
            currentPosition = itemWidth * totalItems; // Reset naar startpositie
            updatePosition(true);
        } else {
            list.style.transform = 'none';
            currentPosition = 0; // Reset positie op desktop
        }
    };
    
    init();
    
    // Update bij resize
    let wasMobile = isMobile();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const nowMobile = isMobile();
            
            if (wasMobile !== nowMobile) {
                if (nowMobile) {
                    // Schakel naar mobile
                    addClones();
                    calculateScrollAmount();
                    currentPosition = itemWidth * totalItems; // RESET naar startpositie
                    updatePosition(true);
                } else {
                    // Schakel naar desktop
                    removeClones();
                    currentPosition = 0; // RESET positie
                    list.style.transform = 'none';
                }
                wasMobile = nowMobile;
            } else if (nowMobile) {
                // Nog steeds mobile, herbereken alleen
                calculateScrollAmount();
                const currentIndex = Math.round(currentPosition / itemWidth);
                currentPosition = currentIndex * itemWidth;
                updatePosition(true);
            }
        }, 250);
    });
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!isMobile() || isAnimating) return;
            isAnimating = true;
            
            currentPosition += scrollAmount;
            updatePosition();
            
            setTimeout(() => {
                checkLoop();
                isAnimating = false;
            }, 550);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!isMobile() || isAnimating) return;
            isAnimating = true;
            
            currentPosition -= scrollAmount;
            updatePosition();
            
            setTimeout(() => {
                checkLoop();
                isAnimating = false;
            }, 550);
        });
    }
}

//////// SLIDER ////////////

    if (slide) {
    const items = Array.from(slide.querySelectorAll('li'));
    
    // Dupliceer items meerdere keren
    for (let i = 0; i < 4; i++) {
        items.forEach(item => {
            const clone = item.cloneNode(true);
            slide.appendChild(clone);
        });
    }
    
    const totalItems = items.length;
    let currentPosition = 0;
    let isAnimating = false;
    let itemWidth = 0;
    
    const nextBtn = document.querySelector('.slider #next-btn');
    const prevBtn = document.querySelector('.slider #prev-btn');
    
    const calculateItemWidth = () => {
        const firstItem = slide.querySelector('li');
        if (firstItem) {
            const itemRect = firstItem.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(slide);
            const gap = parseFloat(computedStyle.gap) || 0;
            itemWidth = itemRect.width + gap;
        }
    };
    
    const getCenterOffset = () => {
        const sliderContainer = slide.parentElement;
        const containerWidth = sliderContainer.offsetWidth;
        const firstItem = slide.querySelector('li');
        if (firstItem) {
            const itemWidth = firstItem.offsetWidth;
            return (containerWidth - itemWidth) / 2;
        }
        return 0;
    };
    
    const updatePosition = (instant = false) => {
        if (instant) {
            slide.style.transition = 'none';
        } else {
            slide.style.transition = 'transform 0.5s ease';
        }
        const centerOffset = getCenterOffset();
        slide.style.transform = `translateX(${centerOffset - currentPosition}px)`;
    };
    
    const checkLoop = () => {
        const singleSetWidth = itemWidth * totalItems;
        const minPosition = 0;
        const maxPosition = singleSetWidth * 3;
        
        if (currentPosition >= maxPosition) {
            currentPosition = singleSetWidth;
            updatePosition(true);
        } 
        else if (currentPosition <= minPosition) {
            currentPosition = singleSetWidth * 2;
            updatePosition(true);
        }
    };
    
    const init = () => {
        calculateItemWidth();
        currentPosition = itemWidth * totalItems;
        updatePosition(true);
    };
    
    init();
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            
            currentPosition += itemWidth;
            updatePosition();
            
            setTimeout(() => {
                checkLoop();
                isAnimating = false;
            }, 550);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            
            currentPosition -= itemWidth;
            updatePosition();
            
            setTimeout(() => {
                checkLoop();
                isAnimating = false;
            }, 550);
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
    

    // ===== DROPDOWN MENU HAM=====
    if (hammenuHeaders.length > 0) {
        hammenuHeaders.forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('svg');
                
                if (content && icon) {
                    content.classList.toggle('open');
                    icon.classList.toggle('rotated');
                }

                button.classList.toggle('open');
            
            });
        });
    }
});
