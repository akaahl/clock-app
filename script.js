const seeMoreBtn = document.getElementById('more-btn');
const mainContainer = document.querySelector('.main-container');

seeMoreBtn.addEventListener('click', () => {
  mainContainer.classList.toggle('show');
  console.log('yes');
});
