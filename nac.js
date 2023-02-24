const nav_btn=document.querySelector(".nav");
const nav_item=document.querySelector(".nav-items");
let durum=true;

nav_btn.addEventListener("click",()=>{

    if(durum){
        nav_item.classList.add("nav-item-goster")
        durum=false
    }
    else {
        nav_item.classList.remove("nav-item-goster")
        durum=true;
    }

})