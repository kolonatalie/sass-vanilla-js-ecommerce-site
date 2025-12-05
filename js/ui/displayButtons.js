const displayButtons = (container, pages, activeIndex) => {
  const pageBtns = pages.map((_, pageIndex) => {
    return `
    <button class="page-btn ${activeIndex === pageIndex ? 'active-btn' : 'null '}" data-index="${pageIndex}"> ${pageIndex + 1}</button>`;
  })
    .join('');
  const prevDisabled = activeIndex === 0 ? 'disabled' : '';
  const nextDisabled = activeIndex === pages.length - 1 ? 'disabled' : '';

  const wrapper = `<div class="page-btns-wrapper">${pageBtns}</div>`;
  const btns = `
    <button class="prev-btn" ${prevDisabled}>prev</button>
    ${wrapper}
    <button class="next-btn" ${nextDisabled}>next</button>
  `;
  container.innerHTML = btns;
};

export default displayButtons;