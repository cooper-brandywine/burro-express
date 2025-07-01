let pastelColors = [
    [50, 100],  // Pale Yellow (HSL: hsl(50, 100%, 80%))
    [200, 80],  // Light Blue (HSL: hsl(200, 80%, 80%))
    [120, 70],  // Light Green (HSL: hsl(120, 70%, 80%))
    [0, 70]     // Light Red (HSL: hsl(0, 70%, 80%))
];

let colorIndex = localStorage.getItem("colorIndex") ? parseInt(localStorage.getItem("colorIndex")) : 0;
let darkModeOn = localStorage.getItem("darkMode") === "true";

function colorMode() {
    colorIndex = (colorIndex + 1) % pastelColors.length;
    localStorage.setItem("colorIndex", colorIndex);
    applyColor();
}

function applyColor() {
    let [hue, saturation] = pastelColors[colorIndex];
    let lightness = darkModeOn ? "10%" : "80%";
    let newColor = `hsl(${hue}, ${saturation}%, ${lightness})`;

    document.documentElement.style.setProperty("--bg-color", newColor);
}

function darkMode() {
    darkModeOn = !darkModeOn;
    localStorage.setItem("darkMode", darkModeOn);
    
    document.documentElement.style.setProperty("--text-color", darkModeOn ? "white" : "black");
    document.documentElement.style.setProperty("--lightness", darkModeOn ? "10%" : "80%");
    // Toggle image styles for dark mode
    let minerImg = document.querySelector(".miner img");
    if (minerImg) {
        if (darkModeOn) {
            minerImg.style.mixBlendMode = "screen";
            minerImg.style.filter = "invert(1)";
        } else {
            minerImg.style.mixBlendMode = "multiply";
            minerImg.style.filter = "none";
        }
    }

    let invertIcons = document.querySelectorAll(".invert");
    let darkmodeIcon = document.getElementById("darkmode");
    invertIcons.forEach(icon => {
        if (darkModeOn) {
            icon.style.filter = "invert(1)";
            darkmodeIcon.src = "/images/lightmode.svg";
        } else {
            icon.style.filter = "none";
            darkmodeIcon.src = "/images/darkmode.svg";
        }
    });

     // Update scroll image
     let scroll = document.querySelector(".scroll");
     let scrollPs = document.querySelectorAll(".scroll p");
     if (scrollPs) {
         scrollPs.forEach(p => {
             p.style.filter = darkModeOn ? "invert(1)" : "none";
         });
        } else {
            console.warn("scroll paragraphs NOT found!");
        }

     if (scroll) {
         console.log("scroll not found:", minerImg);
         scroll.style.filter = darkModeOn ? "invert(1)" : "none";
     } else {
         console.warn("scroll image NOT found!");
     }

    applyColor();
}

// Load settings from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    console.log("dark-mode.js loaded and DOMContentLoaded fired!");

    darkModeOn = localStorage.getItem("darkMode") === "true";

    // Apply text and background settings
    document.documentElement.style.setProperty("--text-color", darkModeOn ? "white" : "black");
    document.documentElement.style.setProperty("--lightness", darkModeOn ? "10%" : "80%");

    // Update miner image
    let minerImg = document.querySelector(".miner img");
    if (minerImg) {
        console.log("Miner image found:", minerImg);
        minerImg.style.mixBlendMode = darkModeOn ? "screen" : "multiply";
        minerImg.style.filter = darkModeOn ? "invert(1)" : "none";
    } else {
        console.warn("Miner image NOT found!");
    }

    // Update scroll image
    let scroll = document.querySelector(".scroll");
    let scrollPs = document.querySelectorAll(".scroll p");
     if (scrollPs) {
         scrollPs.forEach(p => {
             p.style.filter = darkModeOn ? "invert(1)" : "none";
         });
        } else {
            console.warn("scroll paragraphs NOT found!");
        }
    if (scroll) {
        console.log("scroll not found:", minerImg);
        scroll.style.filter = darkModeOn ? "invert(1)" : "none";
    } else {
        console.warn("scroll image NOT found!");
    }

    applyColor();
});

function applyDarkModeAfterFetch() {
    console.log("Applying dark mode after fetch content is loaded...");
    darkModeOn = localStorage.getItem("darkMode") === "true";

    document.documentElement.style.setProperty("--text-color", darkModeOn ? "white" : "black");
    document.documentElement.style.setProperty("--lightness", darkModeOn ? "10%" : "80%");

    let minerImg = document.querySelector(".miner img");
    if (minerImg) {
        minerImg.style.mixBlendMode = darkModeOn ? "screen" : "multiply";
        minerImg.style.filter = darkModeOn ? "invert(1)" : "none";
    }

    // Update scroll image
    let scroll = document.querySelector(".scroll");
    let scrollPs = document.querySelectorAll(".scroll p");
     if (scrollPs) {
         scrollPs.forEach(p => {
             p.style.filter = darkModeOn ? "invert(1)" : "none";
         });
        } else {
            console.warn("scroll paragraphs NOT found!");
        }
    if (scroll) {
        console.log("scroll not found:", minerImg);
        scroll.style.filter = darkModeOn ? "invert(1)" : "none";
    } else {
        console.warn("scroll image NOT found!");
    }

    let invertIcons = document.querySelectorAll(".invert");
    let darkmodeIcon = document.getElementById("darkmode");
    console.log("Found", invertIcons.length, "invert icons.");
    invertIcons.forEach(icon => {
        icon.style.filter = darkModeOn ? "invert(1)" : "none";
        darkmodeIcon.src = darkModeOn ? "/images/lightmode.svg" : "/images/darkmode.svg";
    });

    applyColor();
}

function loadContent(url, elementId, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) callback(); // Apply dark mode after loading
        })
        .catch(error => console.error('Error loading content:', error));
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded fired!");

    loadContent('/header.html', 'header-placeholder', applyDarkModeAfterFetch);
    loadContent('/contents.html', 'contents-placeholder', applyDarkModeAfterFetch);
    loadContent('/footer.html', 'footer-placeholder', applyDarkModeAfterFetch);
});