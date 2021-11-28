const spaceGame = {
  response: '2',
  title: 'Space Battle',
  play: function () {
    if (this.response === '0') {
      console.log("You gave up.");
      return;
    } else {
      ussAssembly.attack(shipsToAttack[0]);
    }
  }
}

spaceGame.response = prompt("Let's Play Space Battle! Press 1 to Play, Press 0 to quit.");

function playAgain() {
  let keepPlaying = prompt("Your hull is at: " + ussAssembly.hull + ". Would you like to attack the next ship or retreat? Press 1 to attack. Press 0 to retreat.");

  if (!shipsToAttack.length) {
    console.log('You win!')

  } else {
    if (this.hull <= 0 || keepPlaying === '0') {
      console.log('You lose.');
      return;
    } else {
      ussAssembly.attack(shipsToAttack[0]);
    }
  }
}

class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(enemy) {
    console.log(enemy.name + "'s starting hull: " + enemy.hull);
    while (enemy.hull > 0 && shipsToAttack.length) {
      let friendlyRandom = Math.random();
      let enemyRandom = Math.random();

      console.log("Enemy accuracy: " + enemy.accuracy.toPrecision(2))
      if (friendlyRandom < this.accuracy) {
        enemy.hull -= this.firepower;
        console.log('You made a hit! Enemy hull now at: ' + enemy.hull + ".");
        if (enemy.hull <= 0) {
          shipsToAttack.shift();
        }

      } else if (friendlyRandom > this.accuracy) {
        this.hull -= this.firepower;

        console.log('You missed. Enemy hull at: ' + enemy.hull + ".");

      } else if (enemyRandom < enemy.accuracy) {
        this.hull -= enemy.firepower;
        console.log('You have been hit! Your hull is now: ' + this.hull);

      } else if (enemyRandom > enemy.accuracy) {
        console.log('Enemy missed! Your hull is: ' + this.hull);

      } else if (this.hull <= 0 || this.response === '0') {
        console.log('You lose.');
        return
      }
      playAgain();
    }
  }
}

class friendlyShip extends Ship {
  constructor(hull, firepower, accuracy, name) {
    super(hull, firepower, accuracy)
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.name = name;
  }
}
const ussAssembly = new friendlyShip(this.hull, this.firepower, this.accuracy, "USSAssembly");

class AlienShip extends Ship {
  constructor(hull, firepower, accuracy, name) {
    super(hull, firepower, accuracy)
    this.name = name;
    this.hull = Math.floor(Math.random() * (7 - 3) + 3);
    this.firepower = Math.floor(Math.random() * (5 - 2) + 2);
    this.accuracy = Math.random() * (0.9 - 0.6) + 0.6;
  }
}
function createAlienShips() {
  const alienShips = ['Alien1', 'Alien2', 'Alien3', 'Alien4', 'Alien5', 'Alien6'];
  for (let i = 0; i < alienShips.length; i++) {
    alienShips[i] = new AlienShip(this.hull, this.firepower, this.accuracy, alienShips[i]);
  }
  return alienShips
}
let shipsToAttack = createAlienShips();

spaceGame.play();