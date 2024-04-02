document.addEventListener('DOMContentLoaded', function () {
  initializeSlider();
  initializeMobileMenu();
});

function initializeSlider() {
  const slider = document.querySelector('.slider');
  if (slider) {
    const sliderElements = slider.querySelectorAll('.slider div');
    let currentSlide = 0;
    const showSlide = () => {
      sliderElements[currentSlide].style.opacity = '0';
      currentSlide = (currentSlide + 1) % sliderElements.length;
      sliderElements[currentSlide].style.opacity = '1';
    }
    sliderElements[currentSlide].style.opacity = '1';
    setInterval(showSlide, 2500);
  }
}

function initializeMobileMenu() {
  const button = document.querySelector('.mobile-menu-button');
  const navigationList = document.querySelector('.navigation-list');

  function toggleMenuState() {
    if (event.target.closest('.mobile-menu-button') === button) {
      navigationList.classList.toggle('open-menu');
      button.classList.toggle('open-menu');
    }
    if (event.target.closest('.navigation-list') !== navigationList &&
      navigationList.classList.contains('open-menu') &&
      event.target.closest('.mobile-menu-button') !== button) {
      navigationList.classList.remove('open-menu');
      button.classList.remove('open-menu');
    }
  }

  document.addEventListener('click', toggleMenuState);
}
