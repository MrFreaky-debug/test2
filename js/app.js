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
  let activeSubTile = null;

  mainTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const type = tile.dataset.main;
      currentLevel = "sub";
      document.getElementById("mainTiles").style.display = "none";
      subTiles.style.display = "grid";
      backBtn.style.display = "block";
      faqSection.style.display = "none";
      searchBox.style.display = "flex";

      subTiles.innerHTML = "";

  Object.keys(data[type]).forEach((key, index) => {
  const div = document.createElement('div');
  div.classList.add('tile', 'sub-tile'); // ✅ dodajemy sub-tile bez nadpisywania tile
  div.style.animationDelay = `${index * 0.08}s`;
  div.innerText = key;

  div.addEventListener('click', () => {
    if (activeSubTile) activeSubTile.classList.remove('active');
    div.classList.add('active');
    activeSubTile = div;

    loadFaq(type, key);
  });

   subTiles.appendChild(div);
      });
    });
  });

  function loadFaq(type, key) {
    faqSection.style.display = "block";
    sectionTitle.innerText = key;
    faqContainer.innerHTML = "";

    const items = data[type][key] || [];
    items.forEach(item => {
      const faq = document.createElement('div');
      faq.className = "faq-item active";
      faq.innerHTML = `
        <div class="faq-question">${item.q} <span>+</span></div>
        <div class="faq-answer"><p>${item.a}</p></div>
      `;
      faq.querySelector('.faq-question').addEventListener('click', () => {
        faq.classList.toggle('open');
      });
      faqContainer.appendChild(faq);
    });

    // Płynny scroll z lekkim opóźnieniem
    setTimeout(() => {
      faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  backBtn.onclick = () => {
    subTiles.style.display = "none";
    faqSection.style.display = "none";
    searchBox.style.display = "none";
    document.getElementById("mainTiles").style.display = "grid";
    backBtn.style.display = "none";
    currentLevel = "main";
    activeSubTile = null;
    searchInput.value = "";
  };

  searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
      item.style.display = item.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
  });

});
