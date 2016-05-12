'use strict'

class Animal {
  constructor (newName) {
    this.level = 1
    this.experience = 0
    this.hungerLevel = 0

    this.name = newName || 'no name'

    this.healthPoints = this._maxHP()
  }

  _maxHP () {
    return 10 + this.level * 10
  }

  _hpUp () {
    this.healthPoints += 6
    if (this.healthPoints >20) this.healthPoints = this._maxHP()
  }

  eats () {
    this._hpUp()

    this.hungerLevel -= 5
    if (this.hungerLevel < 0) this.hungerLevel = 0

    return 'chaf chaf'
  }

  _levelUp () {
    this.level += 1
    this.experience = 0
    this.healthPoints +=10
  }

  walks () {
    if (this.healthPoints === 0) throw new Error(`${this.name}'s HP is 0`)

    this.hungerLevel += 5

    if (this.hungerLevel > 20) {
      this.hungerLevel = 20
      // experience remains the same
      this.healthPoints -= 2
      if (this.healthPoints < 0) this.healthPoints = 0
    } else {
      this.experience += 5
    }

    if (this.experience > 29) this._levelUp()

    return 'chap chap'
  }
}

module.exports = Animal
