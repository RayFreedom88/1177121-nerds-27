'use strict';

(function () {
  const sliderElement = document.querySelector(`.slider`);
  const sliderItemElements = sliderElement.querySelectorAll(`.slider__item`);

  const sliderControlsElement = sliderElement.querySelector(`.slider__controls`);
  const sliderToggleElements = sliderControlsElement.querySelectorAll(`.slider__toggle`);

  let index = 0;
  let isPlayer = true

  const activeSlide = n => {
    for (let slide of sliderItemElements) {
      slide.classList.remove(`slider__item--active`);
    }
    sliderItemElements[n].classList.add(`slider__item--active`)
  };

  const activeToggles = n => {
    for (let toggle of sliderToggleElements) {
      toggle.removeAttribute(`checked`);
    }

    sliderToggleElements[n].setAttribute(`checked`, `checked`);
  };

  const prepareCurrentSlide = ind => {
    activeSlide(ind);
    if (isPlayer) {
      activeToggles(ind);
    }
  };

  const nextSlide = () => {
    if (index === sliderItemElements.length - 1) {
      index = 0;
      prepareCurrentSlide(index);
    } else {
      index++;
      prepareCurrentSlide(index);
    }
  };

  const sliderPlayer = setInterval(nextSlide, 3500);

  sliderToggleElements.forEach((item, indexToggle) => {
    item.addEventListener(`change`, () => {
      index = indexToggle;
      prepareCurrentSlide(indexToggle);
    })
  })

  const onSliderClick = () => {
    isPlayer = false;
    clearInterval(sliderPlayer);
    sliderElement.removeEventListener(`click`, onSliderClick);
  };

  sliderElement.addEventListener(`click`, onSliderClick);
})();
