const apiKey = "7d9bd675a089e996569c53b569ebc1d1"; // Replace with your GNews API key
const newsContainer = document.getElementById("news-container");
const categoryButtons = document.querySelectorAll(".category");

window.addEventListener("load", () => {
  getNews("breaking-news"); // Default category
});

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");
    getNews(category);
  });
});

async function getNews(category) {
  const url = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&topic=${category}`;

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

  if (!articles || !articles.length) {
    newsContainer.innerHTML = "<p>No news found.</p>";
    return;
  }

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "news-card";

    card.innerHTML = `
      <img src="${article.image || 'https://via.placeholder.com/400x200'}" alt="News Image" />
      <div class="content">
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;

    newsContainer.appendChild(card);
  });
}
