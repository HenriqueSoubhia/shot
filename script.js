const box = document.querySelector("#box")
const body = document.querySelector("body")
const pointsElement = document.querySelector("#points")
let points = 0

class Inimigo {
    constructor() {
        this.y = this.calc(0, window.innerWidth - 125)
        this.x = 0
        this.element
        this.elementHead
        this.elementBody
        this.life = true
        this.health = 2
        this.draw()
        this.checkDeath()
    }
    draw() {
        this.element = document.createElement("div")
        this.element.style.left = this.y + "px"
        this.element.classList.add("soldier")
        body.appendChild(this.element)
        
        this.elementHead = document.createElement("div")
        this.elementHead.classList.add("soldier-head")
        this.element.appendChild(this.elementHead)
        
        this.elementBody = document.createElement("div")
        this.elementBody.classList.add("soldier-body")
        this.element.appendChild(this.elementBody)
    }
    
    bodyHit(enemy){
        enemy.health -= 1 
        enemy.checkDeath(enemy)
        
    }
    
    headHit(enemy){
        enemy.health -= 2
        enemy.checkDeath(enemy)
    }
    
    checkDeath(enemy) {
        if (this.life == true && this.health <= 0) {
            this.life = false
            this.element.classList.add("morto")
            points += 1
            spawn()
            setTimeout(()=>{
                enemy.element.remove()
            },3000)
        }
    }

    calc(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

// function updateDisplay(event) {
//     console.log(event.pageX)
//     console.log(event.pageY)
// }

function shoot() {
    body.classList.add("tiro")
    setTimeout(() => {
        body.classList.remove("tiro")
    }, 250)
}

function spawn() {
    let inimigo = new Inimigo


    inimigo.elementHead.addEventListener("click",()=>{
        inimigo.headHit(inimigo)
    })
    inimigo.elementBody.addEventListener("click",()=>{
        inimigo.bodyHit(inimigo)
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