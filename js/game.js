const lightBlue = document.getElementById('lightBlue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const blue = document.getElementById('blue')
const yellow = document.getElementById('yellow')
const buttonStart = document.getElementById('buttonStart')
const LAST_LEVEL = 2


class Juego {
  constructor() {
    this.initialize = this.initialize.bind(this)
    this.initialize()
    this.generateSequence()
    setTimeout(this.nextLevel, 500)
  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this)
    this.chooseColor = this.chooseColor.bind(this)
    // this.mensajeSiguienteNivel = this.mensajeSiguienteNivel.bind(this)
    // this.subLevel = this.subLevel.bind(this)
    // this.level = this.level.bind(this)
    this.toggleBtnEmpezar()
    this.level = 1
    this.colors = {
      lightBlue,
      violet,
      orange,
      green,
      blue,
      yellow
    }
  }

  toggleBtnEmpezar() {
    if(buttonStart.classList.contains('hide')) {
      buttonStart.classList.remove('hide')
    } else {
      buttonStart.classList.add('hide')
    }
  }

  generateSequence() {
    this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 6))
  }

  nextLevel() {
    this.subLevel = 0
    this.illuminateSequence()
    this.addClickEvents()

  }

  transformNumberToColor(numero) {
    switch (numero) {
      case 0:
        return 'lightBlue'
      case 1:
        return 'violet'
      case 2:
        return 'orange'
      case 3:
        return 'green'
      case 4:
        return 'blue'
      case 5:
        return 'yellow'
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'lightBlue':
        return 0
      case 'violet':
        return 1
      case 'orange':
        return 2
      case 'green':
        return 3
      case 'blue':
        return 4
      case 'yellow':
        return 5
    }
  }

  illuminateSequence() {
    for(let i = 0; i < this.level; i++) {
      const color = this.transformNumberToColor(this.sequence[i])
      setTimeout(() => this.illuminateColor(color), 1000 * i)
    }
  }

  illuminateColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOffColor(color), 350)
  }

  turnOffColor(color) {
    this.colors[color].classList.remove('light')
  }

  addClickEvents() {
    this.colors.lightBlue.addEventListener('click', this.chooseColor)
    this.colors.violet.addEventListener('click', this.chooseColor)
    this.colors.orange.addEventListener('click', this.chooseColor)
    this.colors.green.addEventListener('click', this.chooseColor)
    this.colors.blue.addEventListener('click', this.chooseColor)
    this.colors.yellow.addEventListener('click', this.chooseColor)
  }

  deleteClickEvents() {
    this.colors.lightBlue.removeEventListener('click', this.chooseColor)
    this.colors.violet.removeEventListener('click', this.chooseColor)
    this.colors.orange.removeEventListener('click', this.chooseColor)
    this.colors.green.removeEventListener('click', this.chooseColor)
    this.colors.blue.removeEventListener('click', this.chooseColor)
    this.colors.yellow.removeEventListener('click', this.chooseColor)
  }

  chooseColor(ev) {
    const nameColor = ev.target.dataset.color
    const numberColor = this.transformarColorANumero(nameColor)
    this.illuminateColor(nameColor)
    if (numberColor === this.sequence[this.subLevel]) {
      this.subLevel++
      this.alertNextLevel()
      if (this.subLevel === this.level) {
        this.level++
        this.deleteClickEvents()
        if (this.level === (LAST_LEVEL + 1)) {
          this.wonTheGame()
        } else {
          setTimeout(this.nextLevel, 1500)
        }
      }
    } else {
      this.lostTheGame()
    }
  }

  wonTheGame() {
    swal('Platzi','Felicitaciones, ganaste el juego!', 'success')
      .then(this.initialize)
  }

  lostTheGame() {
    swal('Platzi','Lo lamentamos, perdiste :(', 'error')
      .then(() => {
        this.deleteClickEvents()
        this.initialize()
      })
  }

}

function empezarJuego() {
  window.juego = new Juego()
}
