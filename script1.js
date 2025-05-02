let registerBtn = document.getElementById("click1")
let showForm = document.getElementById("registrationForm")
let container = document.getElementById("container")
let homePage=document.querySelector("#homePage")    

registerBtn.addEventListener("click", function(){
    showForm.style.display = "block"
    // registerBtn.style.color = "red"
    container.style.display = "none"
homePage.style.filter="blur(120px)"

})
let backbtn = document.getElementById("back")
backbtn.addEventListener ("click", function () {
    showForm.style.display = "none"
    container.style.display = "block"

})
let backHomebtn = document.getElementById("backHome")
backHomebtn.addEventListener ("click", function () {
    showForm.style.display = "none"
    container.style.display = "block"
    homePage.style.filter="blur(0px)"

})