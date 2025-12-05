function handleMainButtonClick(dropdown) {
  document.querySelectorAll(".filter-dropdown.open").forEach(openDropdown => {
    if (openDropdown !== dropdown) {
      openDropdown.classList.remove('open');
    }
  });
  dropdown.classList.toggle("open");
}


function handleOptionClick(dropdown, option, options, mainBtn, filterKey, updateFilter, applyFilters) {

  options.forEach(opt => opt.classList.remove("selected"));
  option.classList.add("selected");
  mainBtn.innerHTML = `${option.textContent} <span class="arrow">▼</span>`;

  if (option.dataset.filterValue !== "all") {
    mainBtn.classList.add("active-filter");
  } else {
    mainBtn.classList.remove("active-filter");
  }

  dropdown.classList.remove("open");

  updateFilter(filterKey, option.dataset.filterValue);
  applyFilters();
}


function handleGlobalClick() {
  document.querySelectorAll(".filter-dropdown.open").forEach(openDropdown => {
    openDropdown.classList.remove('open');
  });
}


export function setupDropdownFilters(applyFilters, updateFilter) {

  document.querySelectorAll(".filter-dropdown").forEach(dropdown => {
    const mainBtn = dropdown.querySelector(".filter-main-btn");
    const options = dropdown.querySelectorAll(".filter-options li");
    const filterKey = dropdown.dataset.filterKey;

    mainBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleMainButtonClick(dropdown);
    });

    options.forEach(option => {
      option.addEventListener("click", () => {
        handleOptionClick(dropdown, option, options, mainBtn, filterKey, updateFilter, applyFilters);
      });
    });
  });
  document.addEventListener('click', handleGlobalClick);
}


function resetUI() {

  document.querySelectorAll(".filter-dropdown").forEach(dropdown => {
    const mainBtn = dropdown.querySelector(".filter-main-btn");
    const resetText = "Choose option";

    mainBtn.innerHTML = `${resetText} <span class="arrow">▼</span>`;
    mainBtn.classList.remove("active-filter");

    dropdown.querySelectorAll(".filter-options li").forEach(opt => opt.classList.remove("selected"));
    const allOption = dropdown.querySelector('[data-filter-value="all"]');
    if (allOption) allOption.classList.add("selected");
  });

  const saleCheckbox = document.querySelector("#sales-status-filter");
  saleCheckbox.checked = false;

  document.querySelector("#search-models").value = "";
  document.querySelector("#sort-by-select").value = "default";
}


export function setupStaticFilters(applyFilters, updateFilter, resetFilters) {

  document.querySelector("#sales-status-filter").addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    updateFilter("salesStatus", isChecked);
    applyFilters();
  });

  document.querySelector("#sort-by-select").addEventListener("change", (e) => {
    updateFilter("sortBy", e.target.value);
    applyFilters();
  });

  document.querySelector("#reset-filters-btn").addEventListener("click", () => {
    resetFilters();
    resetUI();
    applyFilters();
  });

  function toggleFiltersVisibility() {
    const filtersContainer = document.querySelector('.filtering');
    filtersContainer.classList.toggle('show-filters');
  }

  document.querySelector("#hide-filters-btn").addEventListener("click", toggleFiltersVisibility);

  document.querySelector("#show-filters-btn").addEventListener("click", toggleFiltersVisibility);
}