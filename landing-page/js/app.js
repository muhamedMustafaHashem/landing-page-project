/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const buildNav = () => {
  const sectionsList = document.querySelectorAll("section"); //make  anode list if the sections
  var domFragment = document.createDocumentFragment(); // Use  Dom fragmenmt to add li element single time insteded of adding it one by one .

  // for loop to add the li and anchor  elements to the ul elemnt of the nav.
  for (let i = 0; i < sectionsList.length; i++) {
    const newLi = document.createElement("li");
    newLi.classList.add("menu__link");
    newLi.setAttribute("data-nav", `Section ${i + 1}`);
    const sectionLink = document.createElement("a");
    sectionLink.href = `#section${i + 1}`;
    sectionLink.innerHTML = `section${i + 1}`;
    newLi.appendChild(sectionLink);
    domFragment.appendChild(newLi);
  }
  document.getElementById("navbar__list").appendChild(domFragment);
};

// Add class 'active' to section when near top of viewport

if ("IntersectionObserver" in window) {
  // to make sure that intersection observer is supported by the browser.
  let options = {
    root: null, //   its the default value  and its the browser viewport .
    threshold: 0.6,
  };
  /* creating the intersection observer  that  observe the target(entries)element 
    I decide to observe  with my option that i make before.
   */
  const sectionObserver = new IntersectionObserver(classToggle, options);

  function classToggle(entries) {
    entries.forEach((entry) => {
      // if condition to check if the element satisfy the options.
      if (entry.isIntersecting) {
        entry.target.classList.add("your-active-class");
        const dataNavAtt = entry.target.getAttribute("data-nav");

        // add  the active state to the relative li to the active section .
        document.querySelectorAll("header nav ul li").forEach((li) => {
          li.classList.remove("your-active-class");
          if (li.getAttribute("data-nav") == dataNavAtt) {
            li.classList.add("your-active-class");
          }
        });
      } else {
        entry.target.classList.remove("your-active-class");
      }
    });
  }
  // for loop to observe the section elements ion the page.
  document.querySelectorAll("section").forEach((section) => {
    sectionObserver.observe(section);
  });
}

// Scroll to anchor ID using scrollTO event
function SmoothScrollToSection() {
  const ulElement = document.getElementById("navbar__list");
  ulElement.addEventListener(
    "click",
    (eventResponse = (clicked) => {
      clicked.preventDefault();
      const att = clicked.target.getAttribute("data-nav");
      const att1 = clicked.target.getAttribute("href");
      // loop to add smoothscroll behavior to the section with same data attribute or of the same href attribute.
      document.querySelectorAll("section").forEach((section) => {
        if (
          section.getAttribute("data-nav") == att ||
          "#" + section.id == att1
        ) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    })
  );
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();
// Scroll to section on link click
SmoothScrollToSection();
