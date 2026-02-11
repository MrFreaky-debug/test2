document.addEventListener('DOMContentLoaded', () => {

  const mainTiles = document.querySelectorAll('#mainTiles .tile');
  const subTiles = document.getElementById('subTiles');
  const faqSection = document.getElementById('faqSection');
  const faqContainer = document.getElementById('faqContainer');
  const sectionTitle = document.getElementById('sectionTitle');
  const backBtn = document.getElementById('backBtn');
  const searchBox = document.getElementById('searchBox');
  const searchInput = document.getElementById('searchInput');

  let currentLevel = "main";

  mainTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      showSubTiles(tile.dataset.main);
    });
  });

  function showSubTiles(type) {
    currentLevel = "sub";
    document.getElementById("mainTiles").style.display = "none";
    subTiles.style.display = "grid";
    backBtn.style.display = "block";
    faqSection.style.display = "none"; // ukryj FAQ przy przejściu
    searchBox.style.display = "none";

    subTiles.innerHTML = "";

    Object.keys(data[type]).forEach(key => {
      const div = document.createElement('div');
      div.className = 'tile';
      div.innerText = key;
      div.onclick = () => loadFaq(type, key); // pokaż FAQ pod subTiles
      subTiles.appendChild(div);
    });
  }

  function loadFaq(type, key) {
    faqSection.style.display = "block";
    searchBox.style.display = "flex";
    sectionTitle.innerText = key;
    faqContainer.innerHTML = "";

    const items = data[type][key] || [];
    items.forEach(item => {
      const faq = document.createElement('div');
      faq.className = "faq-item";
      faq.innerHTML = `
        <div class="faq-question">${item.q} <span>+</span></div>
        <div class="faq-answer"><p>${item.a}</p></div>
      `;
      faq.querySelector('.faq-question').onclick = () => {
        faq.classList.toggle("active");
      };
      faqContainer.appendChild(faq);
    });

    // przewiń do FAQ, jeśli dużo kafelków
    faqSection.scrollIntoView({ behavior: 'smooth' });
  }

  backBtn.onclick = () => {
    if (currentLevel === "sub") {
      // wróć do kafelków głównych
      subTiles.style.display = "none";
      faqSection.style.display = "none";
      searchBox.style.display = "none";
      document.getElementById("mainTiles").style.display = "grid";
      backBtn.style.display = "none";
      currentLevel = "main";
    }
  };

  searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
      item.style.display = item.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
  });

});
