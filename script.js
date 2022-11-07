const box = document.querySelector("#box")
const body = document.querySelector("body")
const board = document.querySelector("#board")
const boardWidth = parseInt(window.getComputedStyle(board).width)
const boardHeight = parseInt(window.getComputedStyle(board).height)
const pointsElement = document.querySelector("#points")
const crosshair = document.querySelector("#crosshair")
const timeBarTime = document.querySelector("#timeBar-time")
let points = 0
let time = 100
let difficult = 2.5

class Inimigo {
    constructor() {
        this.y = this.calc(0, boardWidth - 75)
        this.x = this.calc(0, boardHeight - 225)
        this.element
        this.elementHead
        this.elementBody
        this.life = true
        this.health = 2
        this.inicialPos = Math.floor((Math.random()*4)+1)
        this.draw()
        this.checkDeath()
    }
    draw() {
        this.element = document.createElement("div")
        this.element.style.left = this.y + "px"
        this.element.style.bottom = this.x + "px"
        this.element.style.animationName = "aparece-"+this.inicialPos
        this.element.classList.add("soldier")
        board.appendChild(this.element)

        this.elementHead = document.createElement("img")
        this.elementHead.classList.add("soldier-head")
        this.elementHead.src = "imgs/soldier-head.png"
        this.element.appendChild(this.elementHead)

        this.elementBody = document.createElement("img")
        this.elementBody.classList.add("soldier-body")
        this.elementBody.src = "imgs/soldier-body.png"
        this.element.appendChild(this.elementBody)

    }

    bodyHit(enemy) {
        enemy.health -= 1
        enemy.checkDeath(enemy)

    }

    headHit(enemy) {
        enemy.health -= 2
        enemy.checkDeath()
    }

    checkDeath() {
        if (this.life == true && this.health <= 0) {
            time += 50
            if(time >= 100){
                time = 100
            }
            this.life = false
            this.element.style.animationName = ""
            this.element.classList.add("morto")
            points += 1
            spawn()
            setTimeout(() => {
                this.element.remove()
            }, 3000)
        }
    }

    calc(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}



function mexerCrosshair(event) {
    crosshair.style.top = event.pageY - 16 + "px"
    crosshair.style.left = event.pageX - 16 + "px"
}

function shoot() {
    crosshair.classList.add("tiro")
    setTimeout(() => {
        crosshair.classList.remove("tiro")
    }, 250)
}

function spawn() {
    let inimigo = new Inimigo


    inimigo.elementHead.addEventListener("click", () => {
        inimigo.headHit(inimigo)
    })
    inimigo.elementBody.addEventListener("click", () => {
        inimigo.bodyHit(inimigo)
    })

    // setTimeout(()=>{
    //     inimigo.health = 0
    //     inimigo.checkDeath()
    // },1000)
}

function timeBar(){
    setInterval(() => {
        time -= difficult
    }, 125);
}

function alertWindow(message){
    // let elements = document.querySelectorAll(".board > *")
    // console.log(elements)
    // elements.forEach(element => {
    //     element.remove()
    // });
    board.remove()
    crosshair.remove()
    let div = document.createElement("div")
    div.classList.add("lost-window")
    let h1 = document.createElement("h1")
    h1.innerHTML = message
    let button = document.createElement("button")
    button.innerHTML = "tentar de novo"
    button.addEventListener("click",reset)

    body.appendChild(div)
    div.appendChild(h1)
    div.appendChild(button)
}

function update() { 
        let reqAni = requestAnimationFrame(update)
        
            if(points == 25){
                difficult = 3.2
            }
            if(points == 50){
                difficult = 4.2
            }
            if(points == 75){
                difficult = 6
            }
            if(points == 100){
                window.cancelAnimationFrame(reqAni)
                alertWindow("ganhou, lindo")
            }
            
            if(time <= 0){
                window.cancelAnimationFrame(reqAni)
                alertWindow("perdeu seu ruim")
            }
        
            timeBarTime.style.height = time + "%"
            
            pointsElement.innerHTML = points

}

function reset(){
    window.location.reload()
}


timeBar()

update()

spawn()
    





//contador de precisão


board.addEventListener("mousemove", mexerCrosshair);
body.addEventListener("click", shoot)
