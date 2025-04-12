namespace SpriteKind {
    export const Ufo = SpriteKind.create()
}

controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    if (info.score() > 19) {
        music.play(music.stringPlayable("C5 - - - - - - - ", 800), music.PlaybackMode.InBackground)
        info.changeScoreBy(-20)
        monety += -20
        info.changeLifeBy(1)
    } else {
        music.play(music.stringPlayable("E - - - - - - - ", 800), music.PlaybackMode.InBackground)
    }
    
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    if (naboje > 0) {
        music.play(music.stringPlayable("A - - - - - - - ", 1600), music.PlaybackMode.InBackground)
        pocisk1 = sprites.create(img`
            5 5
            5 5
            `, SpriteKind.Projectile)
        pocisk1.setFlag(SpriteFlag.AutoDestroy, true)
        pocisk1.setPosition(player1.x, 100)
        pocisk1.setVelocity(0, -150)
        naboje += -1
    }
    
})
function usmiech1() {
    
    usmiech = sprites.create(assets.image`
        myImage
        `, SpriteKind.Player)
    pause(500)
    sprites.destroy(usmiech)
}

sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    
    let list2 : Sprite[] = []
    info.changeScoreBy(1)
    monety += 1
    punkty += 1
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    predkosc_meteoru += 1
    if (list2.indexOf(sprite) >= 0) {
        list2.removeAt(list2.indexOf(sprite))
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function on_on_overlap2(sprite2: Sprite, otherSprite2: Sprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite2)
    if (info.life() < 1) {
        saveGameState()
        info.setScore(punkty)
        game.gameOver(false)
        resetGameState()
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap3(sprite22: Sprite, otherSprite22: Sprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite22)
    if (info.life() < 1) {
        saveGameState()
        info.setScore(punkty)
        game.gameOver(false)
        resetGameState()
    }
    
})
function saveGameState() {
    
    blockSettings.writeNumber("ulepszenie 1", ulepszenie_1)
    blockSettings.writeNumber("zycie", info.life())
    blockSettings.writeNumber("punkty slot 1", punkty)
    blockSettings.writeNumber("monety", monety)
    blockSettings.writeNumber("time", blockSettings.readNumber("time") + 100)
    time += 100
}

function setUfoSpeed(myUfo: Sprite) {
    
    if (myUfo.y > scene.screenHeight() / 2) {
        myUfo.setVelocity(randint(-60, 60), randint(10, max_predkosc_meteoru) * -2)
        pocisk_ufo = sprites.create(img`
            5 5
            5 5
            `, SpriteKind.Projectile)
        pocisk_ufo.setFlag(SpriteFlag.AutoDestroy, true)
        pocisk_ufo.setPosition(myUfo.x, myUfo.y + myUfo.height)
        pocisk_ufo.setVelocity(0, 130)
    }
    
}

function resetGameState() {
    
    ulepszenie_1 = 1
    punkty = 0
    monety = 0
    info.setLife(1)
    info.setScore(0)
}

let ufo : Sprite = null
let meteor : Sprite = null
let pocisk_ufo : Sprite = null
let usmiech : Sprite = null
let pocisk1 : Sprite = null
let naboje = 0
let max_predkosc_meteoru = 0
let player1 : Sprite = null
let punkty = 0
let monety = 0
let ulepszenie_1 = 0
let time = blockSettings.readNumber("time")
ulepszenie_1 = blockSettings.readNumber("ulepszenie 1")
info.setLife(blockSettings.readNumber("zycie"))
monety = blockSettings.readNumber("monety")
info.setScore(monety)
let predkosc_meteoru = 40
punkty = blockSettings.readNumber("punkty slot 1")
let lista_uf : Sprite[] = []
music.setVolume(255)
if (!(0 < info.life())) {
    resetGameState()
}

player1 = sprites.create(img`
        . . . . . . . 9 9 . . . . . . .
        . . . . . . 1 9 9 9 . . . . . .
        . . . . . . 1 9 9 9 . . . . . .
        . . . . . 1 1 9 9 9 9 . . . . .
        . . . . . 1 1 9 9 9 9 . . . . .
        . . . . . 1 1 1 9 9 9 . . . . .
        . . . . . d 1 d 9 9 9 . . . . .
        . . . . . b 1 c c 9 b . . . . .
        . . . . c b 1 c c 9 6 c . . . .
        . . . c c b 1 c c 9 b c c . . .
        . . c c c b 9 b b 9 6 c c c . .
        . . c c c 6 9 9 6 6 c c c c . .
        . . c c c b 4 d 4 4 e c c c . .
        . . . c . . 4 5 4 4 . . c . . .
        . . . . . . 4 4 4 2 . . . . . .
        . . . . . . . 4 4 . . . . . . .
        `, SpriteKind.Player)
let predkosc_gracza = 180
controller.moveSprite(player1, predkosc_gracza, 0)
player1.setPosition(80, 110)
player1.setStayInScreen(true)
max_predkosc_meteoru = (punkty + 1) * 2
game.onUpdateInterval(1000, function on_update_interval() {
    
    if (naboje < 6) {
        naboje += 1
    }
    
})
game.onUpdateInterval(400, function on_update_interval2() {
    
    if (randint(0, 6) > 3) {
        if (randint(0, 4) == 0) {
            meteor = sprites.create(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . c c c a c . .
                    . . . . c c a a c b a a a b c c
                    . . . . c a b f f f b a b b b a
                    . . . . c a b f f f b a b b b a
                    . . . . c a 8 f 8 c a b b b b b
                    . . . c c c a c c c a b c f a b
                    . . . c c a a c c c a c f f c b
                    . . . c c a a c c c a c f f c b
                    . . . c a b c 6 c c a a a b b c
                    . . . c a c f a c c a f a c c c
                    . . . c a 8 f c b a f f c b c c
                    . . . . c b c c c b f c a b b a
                    . . . . . a b b b b b b b b b b
                    . . . . . . c c c b b b b b c c
                    . . . . . . . . . . c b b c . .
                    `, SpriteKind.Enemy)
        } else if (randint(0, 4) == 1) {
            meteor = sprites.create(img`
                    . . . . . . . . . c c 8 . . . .
                    . . . . . . 8 c c c f 8 c c . .
                    . . . c c 8 8 f c a f f f c c c
                    . . c c c f f f c a a f f c c c
                    8 c c c f f f f c c a a c 8 c c
                    c c c b f f f 8 a c c a a a c c
                    c a a b b 8 a b c c c c c c c c
                    a f c a a b b a c c c c c f f c
                    a 8 f c a a c c a c a c f f f c
                    c a 8 a a c c c c a a f f f 8 a
                    . a c a a c f f a a b 8 f f c a
                    . . c c b a f f f a b b c c 6 c
                    . . . c b b a f f 6 6 a b 6 c a
                    . . . c c b b b 6 6 a c c c c b
                    . . . . c c a b b c c c b b c c
                    . . . . . c c c c c c b b c . .
                    `, SpriteKind.Enemy)
        } else if (randint(0, 4) == 2) {
            meteor = sprites.create(img`
                    . . . . . . c c c c c 8 . . . .
                    . . . . . a a a c c c 8 c c . .
                    . . . c a c f a a a a c f c c c
                    . . c a c f f f a f f a c c c c
                    8 c c a c c f a a c f f a c c c
                    c a b a a c 6 a a c c f a c c c
                    c a b b b 6 a b b a a c a f f c
                    a f a b b a f f b b a a c f f c
                    c 8 a a a c c f c b a a c f a c
                    c c a a a c c a a a b b a c a c
                    a c a b b a a 6 a b b 6 b b c a
                    b a c b b b 6 b c a c c a c 6 c
                    b a c c a b b a c 6 6 a b 6 c a
                    b b a c a b a a 6 6 a c c c c b
                    a b 6 b b a c b b c c c b b c c
                    . a a b c c c c c c c b b c . .
                    `, SpriteKind.Enemy)
        } else if (randint(0, 4) == 3) {
            meteor = sprites.create(img`
                    . . . . . . . c c c a c . . . .
                    . . c c b b b a c a a a c c . .
                    . c c a b a c b a a a b c c c c
                    c c a b c f f f b a b b b a c c
                    c c a c f f f 8 a b b b b b a c
                    c c a 8 f f 8 c a b b b b b a c
                    c c c a c c c c a b c f a b c c
                    c c a a a c c c a c f f c b b a
                    c c a b 6 a c c a f f c c b b a
                    c a b c 8 6 c c a a a b b c b c
                    c a c f f a c c a f a c c c b a
                    c a 8 f c c b a f f c b c c c c
                    . c b c c c c b f c a b b a c a
                    . . a b b b b b b b b b b b c b
                    . . . c c c c b b b b b c c c c
                    . . . . . c c c c b b c b c . .
                    `, SpriteKind.Enemy)
        } else {
            meteor = sprites.create(img`
                    . . . . . . . . . c c 8 . . . .
                    . . . . . . 8 c c c c c c c . .
                    . c c c c c 8 c c c c c f c c c
                    c c a c c c c c 8 f f c f f c c
                    c a f a a c c a f f c a a f f c
                    c a 8 f a a c a c c c a a a a c
                    c b c f a a a a a c c c c c c c
                    c b b a a c f 8 a c c c 8 c c c
                    a c b b a b c f a a a 8 8 c c c
                    c a 8 a a a b b b a a 8 a c 8 a
                    . a c a c b c a a c c b f f c a
                    . . c c b b c c a b b a c c 6 c
                    . . . c b b a b a 6 a a b 6 c a
                    . . . c c b b b 6 6 c c c c c b
                    . . . . c c a 6 6 b c c b b c c
                    . . . . . c c c c c c b b c . .
                    `, SpriteKind.Enemy)
        }
        
        meteor.setPosition(randint(0, scene.screenWidth()), 0)
        meteor.setVelocity(randint(-20, 20), randint(10, max_predkosc_meteoru) * 2 + predkosc_meteoru)
        meteor.setFlag(SpriteFlag.AutoDestroy, true)
    }
    
    if (randint(0, 4000) > 3300) {
        if (punkty > 4) {
            ufo = sprites.create(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . b 5 5 b . . .
                    . . . . . . b b b b b b . . . .
                    . . . . . b b 5 5 5 5 5 b . . .
                    . b b b b b 5 5 5 5 5 5 5 b . .
                    . b d 5 b 5 5 5 5 5 5 5 5 b . .
                    . . b 5 5 b 5 d 1 f 5 d 4 f . .
                    . . b d 5 5 b 1 f f 5 4 4 c . .
                    b b d b 5 5 5 d f b 4 4 4 4 b .
                    b d d c d 5 5 b 5 4 4 4 4 4 4 b
                    c d d d c c b 5 5 5 5 5 5 5 b .
                    c b d d d d d 5 5 5 5 5 5 5 b .
                    . c d d d d d d 5 5 5 5 5 d b .
                    . . c b d d d d d 5 5 5 b b . .
                    . . . c c c c c c c c b b . . .
                    `, SpriteKind.Enemy)
            ufo.setPosition(randint(0, scene.screenWidth()), 0)
            ufo.setFlag(SpriteFlag.BounceOnWall, true)
            ufo.setVelocity(0, randint(10, max_predkosc_meteoru) * 2 + predkosc_meteoru)
            lista_uf.push(ufo)
        }
        
    }
    
})
game.onUpdateInterval(500, function on_update_interval3() {
    saveGameState()
})
game.onUpdateInterval(200, function on_update_interval4() {
    for (let value of lista_uf) {
        setUfoSpeed(value)
    }
})
