import { ImageSource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Player1: new ImageSource('images/player1.png'),
    Player2: new ImageSource('images/player2.png'),
    Background: new ImageSource('images/background3.jpg'),
    StartPlatform: new ImageSource('images/platform.png'),
    Platform: new ImageSource('images/platform.png'),
    Point: new ImageSource('images/point.png'),
    Enemy: new ImageSource('images/enemy.png'),
    Portal: new ImageSource('images/portal.png'),

}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }