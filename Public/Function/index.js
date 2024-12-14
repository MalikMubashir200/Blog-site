// Menu Dropdown
const menuButton = document.querySelector("#menuButton");
const menuDropdown = document.querySelector("#menuDropdown");
const closeMenu = document.querySelector("#closeMenu")

//Blog menu
const blogMenu =document.querySelector("#blogsMenu")
const blogsDropdown =document.querySelector("#BlogsDropdown")


// Dropdown
menuButton.addEventListener("click", () => {
    menuDropdown.classList.remove("hidden");
});

closeMenu.addEventListener("click", ()=>{
    menuDropdown.classList.add("hidden");
})

// Blogs

blogMenu.addEventListener("mouseover",()=>{
    blogsDropdown.classList.toggle("hidden")
    
})
