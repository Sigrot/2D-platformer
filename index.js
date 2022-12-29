const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.6
const speed = 10
const jumppower = -14
const dashpower = 25

class Player {
    constructor() {
        this.pos = {
            x: 100,
            y: 100
        }
        this.vel = {
            x: 0,
            y: 0
        }
        this.height = 60
        this.width = 30
    }
    
    draw() {
        c.fillStyle = "red"
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        if (this.pos.y + this.height + this.vel.y <= canvas.height) {
            this.vel.y += gravity
        } else {
            this.vel.y = 0
        }
    }
}

const player = new Player()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)
    player.update()
    if (keys.right.pressed) {
        player.vel.x = speed
    } else if (keys.left.pressed) {
        player.vel.x = 0 - speed
    } else {
        player.vel.x = 0
    }
}

animate()

window.addEventListener("keydown", ({key}) => {
    switch (key) {
        case "a":
            keys.left.pressed = true
            break
        case "w":
            player.vel.y = jumppower
            break
        case "d":
            keys.right.pressed = true
            break
        case "s":
            player.vel.y = dashpower
            break
    }
})

window.addEventListener("keyup", ({key}) => {
    switch (key) {
        case "a":
            keys.left.pressed = false
            break
        case "d":
            keys.right.pressed = false
            break
    }
})