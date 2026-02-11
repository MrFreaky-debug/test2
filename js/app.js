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
    subTiles.innerHTML = "";

    Object.keys(data[type]).forEach(key => {
      const div = document.createElement('div');
      div.className = 'tile';
      div.innerText = key.toUpperCase();
      div.onclick = () => loadFaq(type, key);
      subTiles.appendChild(div);
    });
  }

  function loadFaq(type, key) {
    currentLevel = "faq";
    subTiles.style.display = "none";
    faqSection.style.display = "block";
    searchBox.style.display = "flex";
    sectionTitle.innerText = key.toUpperCase();
    faqContainer.innerHTML = "";

    data[type][key].forEach(item => {
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
  }

  backBtn.onclick = () => {
    if (currentLevel === "faq") {
      faqSection.style.display = "none";
      searchBox.style.display = "none";
      subTiles.style.display = "grid";
      currentLevel = "sub";
    } else {
      subTiles.style.display = "none";
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
