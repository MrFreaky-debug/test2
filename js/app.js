const tiles = document.querySelectorAll('.tile');
const contents = document.querySelectorAll('.content');
const searchInput = document.getElementById('searchInput');

tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    const target = tile.dataset.target;

    tiles.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tile.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('faq-question')) {
    e.target.parentElement.classList.toggle('active');
  }
});

searchInput?.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('.faq-item').forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(query)
      ? ''
      : 'none';
  });
});
