let img = document.querySelector("img")
let button = document.querySelector("button")
let heading = document.querySelector("h1")

img.onclick = function () {
	let src = img.getAttribute("src")
	if (src === "images/firefox.jpg") {
		img.setAttribute("src", "images/firefox.png")
	} else {
		img.setAttribute("src", "images/firefox.jpg")
	}
}

function setname() {
	let name = prompt("输个名字嘛")
	if (!name) {
		alert("老子喊你输个名字！")
	} else {
		localStorage.setItem("name", name)
		heading.textContent = "Mozilla is cool," + localStorage.getItem("name")
	}
}

if (!localStorage.getItem("name")) {
	setname()
} else {
	heading.textContent = "Mozilla is cool," + localStorage.getItem("name")
}

button.onclick = setname