export function carouselLogic() {

  const inner = document.querySelector(".inner");
  const wrapper = document.querySelector(".wrapper");
  const prevBtnCarousel = document.querySelector(".prev-btn-icon");
  const nextBtnCarousel = document.querySelector(".next-btn-icon");
  let cards = Array.from(document.querySelectorAll(".card"));


  function getVisibleCards() {
    const wrapperWidth = wrapper.offsetWidth;
    const cardStyle = getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth
      + parseInt(cardStyle.marginLeft)
      + parseInt(cardStyle.marginRight);
    return Math.floor(wrapperWidth / cardWidth);
  }


  function createClones() {
    const visibleCards = getVisibleCards();
    document.querySelectorAll(".clone").forEach(clone => clone.remove());
    cards = Array.from(document.querySelectorAll(".card"));
    const clonesBefore = cards.slice(-visibleCards).map(c => {
      const clone = c.cloneNode(true);
      clone.classList.add("clone");
      return clone;
    });

    const clonesAfter = cards.slice(0, visibleCards).map(c => {
      const clone = c.cloneNode(true);
      clone.classList.add("clone");
      return clone;
    });

    clonesBefore.forEach(clone => inner.prepend(clone));
    clonesAfter.forEach(clone => inner.append(clone));

    cards = Array.from(document.querySelectorAll(".card"));
    return visibleCards;
  }


  let visibleCards = createClones();
  let index = visibleCards;


  function updateSlider(transition = true) {
    if (transition) inner.style.transition = "transform 0.5s ease";
    else inner.style.transition = "none";
    inner.style.transform = `translateX(-${(index * 100) / visibleCards}%)`;
  }
  updateSlider(false);


  nextBtnCarousel.addEventListener("click", () => {
    visibleCards = getVisibleCards();
    if (index >= cards.length - visibleCards) return;
    index++;
    updateSlider();
  });


  prevBtnCarousel.addEventListener("click", () => {
    visibleCards = getVisibleCards();
    if (index <= 0) return;
    index--;
    updateSlider();
  });


  inner.addEventListener("transitionend", () => {
    visibleCards = getVisibleCards();
    const clonesCount = visibleCards;

    if (index >= cards.length - clonesCount) {
      index = clonesCount;
      updateSlider(false);
    }
    if (index < clonesCount) {
      index = cards.length - clonesCount * 2;
      updateSlider(false);
    }
  });


  window.addEventListener("resize", () => {
    visibleCards = createClones();
    index = visibleCards;
    updateSlider(false);
  });
}