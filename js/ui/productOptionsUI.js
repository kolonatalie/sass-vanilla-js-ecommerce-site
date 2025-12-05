export function setupProductOptionSelectors(updateSelectedVariant) {
  document.querySelectorAll(".filter-dropdown").forEach(dropdown => {
    const mainBtn = dropdown.querySelector(".filter-main-btn");
    const optionsList = dropdown.querySelector(".filter-options");
    const filterKey = dropdown.dataset.filterKey;

    mainBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".filter-dropdown.open").forEach(openDropdown => {
        if (openDropdown !== dropdown) {
          openDropdown.classList.remove('open');
        }
      });
      dropdown.classList.toggle("open");
    });


    optionsList.addEventListener("click", (e) => {
      const option = e.target.closest('li');
      if (!option) return;

      const selectedValue = option.dataset.filterValue;

      optionsList.querySelectorAll("li").forEach(opt => opt.classList.remove("selected"));
      option.classList.add("selected");
      mainBtn.innerHTML = `${option.textContent} <span class="arrow">▼</span>`;

      if (selectedValue !== "all") {
        mainBtn.classList.add("active-filter");
      } else {
        mainBtn.classList.remove("active-filter");
      }
      dropdown.classList.remove("open");

      updateSelectedVariant(filterKey, selectedValue);
    });
  });


  document.addEventListener('click', () => {
    document.querySelectorAll(".filter-dropdown.open").forEach(openDropdown => {
      openDropdown.classList.remove('open');
    });
  });
}