@namespace
class SpriteKind:
    Ufo = SpriteKind.create()

def on_b_pressed():
    global monety
    if info.score() > 19:
        music.play(music.string_playable("C5 - - - - - - - ", 800),
            music.PlaybackMode.IN_BACKGROUND)
        info.change_score_by(-20)
        monety += -20
        info.change_life_by(1)
    else:
        music.play(music.string_playable("E - - - - - - - ", 800),
            music.PlaybackMode.IN_BACKGROUND)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    global pocisk1, naboje
    if naboje > 0:
        music.play(music.string_playable("A - - - - - - - ", 1600),
            music.PlaybackMode.IN_BACKGROUND)
        pocisk1 = sprites.create(img("""
            5 5
            5 5
            """), SpriteKind.projectile)
        pocisk1.set_flag(SpriteFlag.AUTO_DESTROY, True)
        pocisk1.set_position(player1.x, 100)
        pocisk1.set_velocity(0, -150)
        naboje += -1
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def usmiech1():
    global usmiech
    usmiech = sprites.create(assets.image("""
        myImage
        """), SpriteKind.player)
    pause(500)
    sprites.destroy(usmiech)

def on_on_overlap(sprite, otherSprite):
    global monety, punkty, predkosc_meteoru
    list2: List[Sprite] = []
    info.change_score_by(1)
    monety += 1
    punkty += 1
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    predkosc_meteoru += 1
    if list2.index_of(sprite) >= 0:
        list2.remove_at(list2.index_of(sprite))
sprites.on_overlap(SpriteKind.enemy, SpriteKind.projectile, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    info.change_life_by(-1)
    sprites.destroy(otherSprite2)
    if info.life() < 1:
        saveGameState()
        info.set_score(punkty)
        game.game_over(False)
        resetGameState()
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_on_overlap2)

def on_on_overlap3(sprite22, otherSprite22):
    info.change_life_by(-1)
    sprites.destroy(otherSprite22)
    if info.life() < 1:
        saveGameState()
        info.set_score(punkty)
        game.game_over(False)
        resetGameState()
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap3)

def saveGameState():
    global time
    blockSettings.write_number("ulepszenie 1", ulepszenie_1)
    blockSettings.write_number("zycie", info.life())
    blockSettings.write_number("punkty slot 1", punkty)
    blockSettings.write_number("monety", monety)
    blockSettings.write_number("time", blockSettings.read_number("time") + 100)
    time += 100
def setUfoSpeed(myUfo: Sprite):
    global pocisk_ufo
    if myUfo.y > scene.screen_height() / 2:
        myUfo.set_velocity(randint(-60, 60), randint(10, max_predkosc_meteoru) * -2)
        pocisk_ufo = sprites.create(img("""
            5 5
            5 5
            """), SpriteKind.projectile)
        pocisk_ufo.set_flag(SpriteFlag.AUTO_DESTROY, True)
        pocisk_ufo.set_position(myUfo.x, myUfo.y + myUfo.height)
        pocisk_ufo.set_velocity(0, 130)
def resetGameState():
    global ulepszenie_1, punkty, monety
    ulepszenie_1 = 1
    punkty = 0
    monety = 0
    info.set_life(1)
    info.set_score(0)
ufo: Sprite = None
meteor: Sprite = None
pocisk_ufo: Sprite = None
usmiech: Sprite = None
pocisk1: Sprite = None
naboje = 0
max_predkosc_meteoru = 0
player1: Sprite = None
punkty = 0
monety = 0
ulepszenie_1 = 0
time = blockSettings.read_number("time")
ulepszenie_1 = blockSettings.read_number("ulepszenie 1")
info.set_life(blockSettings.read_number("zycie"))
monety = blockSettings.read_number("monety")
info.set_score(monety)
predkosc_meteoru = 40
punkty = blockSettings.read_number("punkty slot 1")
lista_uf: List[Sprite] = []
music.set_volume(255)
if not (0 < info.life()):
    resetGameState()
player1 = sprites.create(img("""
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
        """),
    SpriteKind.player)
predkosc_gracza = 180
controller.move_sprite(player1, predkosc_gracza, 0)
player1.set_position(80, 110)
player1.set_stay_in_screen(True)
max_predkosc_meteoru = (punkty + 1) * 2

def on_update_interval():
    global naboje
    if naboje < 6:
        naboje += 1
game.on_update_interval(1000, on_update_interval)

def on_update_interval2():
    global meteor, ufo
    if randint(0, 6) > 3:
        if randint(0, 4) == 0:
            meteor = sprites.create(img("""
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
                    """),
                SpriteKind.enemy)
        elif randint(0, 4) == 1:
            meteor = sprites.create(img("""
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
                    """),
                SpriteKind.enemy)
        elif randint(0, 4) == 2:
            meteor = sprites.create(img("""
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
                    """),
                SpriteKind.enemy)
        elif randint(0, 4) == 3:
            meteor = sprites.create(img("""
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
                    """),
                SpriteKind.enemy)
        else:
            meteor = sprites.create(img("""
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
                    """),
                SpriteKind.enemy)
        meteor.set_position(randint(0, scene.screen_width()), 0)
        meteor.set_velocity(randint(-20, 20),
            randint(10, max_predkosc_meteoru) * 2 + predkosc_meteoru)
        meteor.set_flag(SpriteFlag.AUTO_DESTROY, True)
    if randint(0, 4000) > 3300:
        if punkty > 4:
            ufo = sprites.create(img("""
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
                    """),
                SpriteKind.enemy)
            ufo.set_position(randint(0, scene.screen_width()), 0)
            ufo.set_flag(SpriteFlag.BOUNCE_ON_WALL, True)
            ufo.set_velocity(0, randint(10, max_predkosc_meteoru) * 2 + predkosc_meteoru)
            lista_uf.append(ufo)
game.on_update_interval(400, on_update_interval2)

def on_update_interval3():
    saveGameState()
game.on_update_interval(500, on_update_interval3)

def on_update_interval4():
    for value in lista_uf:
        setUfoSpeed(value)
game.on_update_interval(200, on_update_interval4)
