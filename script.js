const box = document.querySelector("#box")
const body = document.querySelector("body")
const pointsElement = document.querySelector("#points")
let points = 0

class Inimigo {
    constructor() {
        this.y = this.calcY(0, window.innerWidth - 125)
        this.x = 0
        this.element
        this.life = true
        this.health = 2
        this.draw()
    }
    draw() {
        this.element = document.createElement("div")
        this.element.style.left = this.y + "px"
        this.element.classList.add("soldier")
        this.element.addEventListener("click", this.getShotPos)
        body.appendChild(this.element)
    }
    getShotPos(event) {
        console.log(event.pageX)
        console.log(event.pageY - parseInt(this.y))
    }

    death(element) {
        this.health -= 1

        if (this.health <= 0) {
            this.life = false
        }

        if (this.life == false && this.health == 0) {
            element.classList.add("morto")
            points += 1
            spawn()
        }
    }

    calcY(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

function updateDisplay(event) {
    console.log(event.pageX)
    console.log(event.pageY)
}

function shoot() {
    body.classList.add("tiro")
    setTimeout(() => {
        body.classList.remove("tiro")
    }, 250)
}

function spawn() {
    let inimigo = new Inimigo

    inimigo.element.addEventListener("click", () => {
        inimigo.death(inimigo.element)
    })
}

function update() {
    requestAnimationFrame(update)
    pointsElement.innerHTML = points
}

update()

spawn()


// body.addEventListener("click", updateDisplay);
body.addEventListener("click", shoot)