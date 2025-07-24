const apiKey = "cd172e85044340f98afb585f2bd21e3c";
const newsContainer = document.getElementById("news-container");
const categoryButtons = document.querySelectorAll(".category");

window.addEventListener("load", () => {
  getNews("general"); // Load general news by default
});

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");
    getNews(category);
  });
});

async function getNews(category) {
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = `<p style="color:red;">Failed to load news. Please try again later.</p>`;
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = ""; // Clear previous content

  if (!articles.length) {
    newsContainer.innerHTML = "<p>No news found.</p>";
    return;
  }

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="News Image" />
      <div class="content">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;

    newsContainer.appendChild(card);
  });
}
