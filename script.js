let search = document.getElementById("search");
let results = document.getElementById("result");
let spinner = document.getElementById("spinner");

// Function to create and append one result card
function addingresult(result) {
    let { title, link, description } = result;

    let resultDiv = document.createElement("div");
    resultDiv.classList.add("result-style");

    let titleElement = document.createElement("a");
    titleElement.href = link;
    titleElement.target = "_blank";
    titleElement.textContent = title;
    titleElement.classList.add("title-style");

    let linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.target = "_blank";
    linkElement.textContent = link;
    linkElement.classList.add("link-style");

    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("des-style");

    resultDiv.appendChild(titleElement);
    resultDiv.appendChild(document.createElement("br"));
    resultDiv.appendChild(linkElement);
    resultDiv.appendChild(descriptionElement);
    results.appendChild(resultDiv);

    // Trigger animation
    setTimeout(() => {
        resultDiv.classList.add("show");
    }, 50);
}

// Function to handle the full result list
function displayResult(resultsArray) {
    spinner.classList.add("d-none"); // Hide spinner

    if (resultsArray.length === 0) {
        results.innerHTML = "<p style='color:white; font-size:28px; margin:100px'>No results found !</p>";
        return;
    }

    for (let result of resultsArray) {
        addingresult(result);
    }
}

// Main function to fetch data from Wikipedia API
function searchWikipedia(event) {
    if (event.key !== "Enter") return;

    results.innerHTML = ""; // Clear previous results
    spinner.classList.remove("d-none"); // Show spinner

    let searchValue = search.value;

    // Fetching from API
    fetch(`https://apis.ccbp.in/wiki-search?search=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            displayResult(data.search_results);
        });
}

// Event listener for "Enter" key inside input
search.addEventListener("keydown", searchWikipedia);

// Clear button functionality
document.getElementById("clearBtn").addEventListener("click", () => {
    results.innerHTML = "";
    spinner.classList.add("d-none");
});

// Search button triggers the same logic as pressing Enter
document.getElementById("searchBtn").addEventListener("click", () => {
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    search.dispatchEvent(event);
});


// Particles Animation Script 
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
const numParticles = 80;
const maxDistance = 120;

window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        radius: Math.random() * 2 + 1,
    });
}

function draw() {
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255,255,255,${1 - dist / maxDistance})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

draw();

