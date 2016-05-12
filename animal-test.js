'use strict'

const test = require('tape')

const Animal = require('./animal')

test('animal has a name', (t) => {
  const chapa  = new Animal('Chapa')
  t.equal(chapa.name, 'Chapa')

  const noName  = new Animal()
  t.equal(noName.name, 'no name')

  t.end()
})

test('animal do level-ups', (t) => {
  const chapa  = new Animal('Chapa')
  t.equal(chapa.name, 'Chapa')

  t.equal(chapa.level, 1)

  chapa.walks()
  t.equal(chapa.experience, 5)
  t.equal(chapa.level, 1)

  chapa.walks()
  t.equal(chapa.experience, 10)
  t.equal(chapa.level, 1)

  chapa.walks() // xp 15
  chapa.eats()
  chapa.walks() // xp 20
  chapa.eats()
  chapa.walks() // xp 25
  t.equal(chapa.experience, 25)
  t.equal(chapa.hungerLevel, 15)

  chapa.walks() // xp 0
  t.equal(chapa.experience, 0)
  t.equal(chapa.level, 2)

  chapa.hungerLevel = 0
  chapa.walks() // 5
  chapa.walks() // xp 10
  chapa.walks() // xp 15
  chapa.hungerLevel = 0
  chapa.walks() // xp 20
  chapa.walks() // xp 25
  chapa.hungerLevel = 0

  chapa.walks() // xp 0
  t.equal(chapa.experience, 0)
  t.equal(chapa.level, 3)

  t.end()
})

test('animal has hungerLevel', (t) => {
  const chapa  = new Animal('Hungry Chapa')
  t.equal(chapa.name, 'Hungry Chapa')

  t.equal(chapa.hungerLevel, 0)

  chapa.walks()
  t.equal(chapa.hungerLevel, 5, '+5')

  chapa.walks()
  t.equal(chapa.hungerLevel, 10, '+5')

  t.end()
})

test('animal can starve to death', (t) => {
  const chapa  = new Animal('Hungry Chapa')
  t.equal(chapa.name, 'Hungry Chapa')

  t.equal(chapa.hungerLevel, 0)
  t.equal(chapa.healthPoints, 20, 'starts with 20 hp')
  t.equal(chapa.experience, 0)

  chapa.walks()
  t.equal(chapa.hungerLevel, 5, '+5')
  t.equal(chapa.healthPoints, 20)
  t.equal(chapa.experience, 5, '+5')

  chapa.walks()
  t.equal(chapa.hungerLevel, 10, '+5')
  t.equal(chapa.healthPoints, 20)
  t.equal(chapa.experience, 10, '+5')

  chapa.walks() // 15
  chapa.walks() // 20
  t.equal(chapa.hungerLevel, 20, '+5')
  t.equal(chapa.healthPoints, 20, 'not yet starve')
  t.equal(chapa.experience, 20, '+5')

  chapa.walks()
  t.equal(chapa.hungerLevel, 20, '20 max')
  t.equal(chapa.experience, 20, 'remains the same because it is starving')
  t.equal(chapa.healthPoints, 18, 'starves by -2')

  chapa.healthPoints = 2
  chapa.walks()
  t.equal(chapa.healthPoints, 0, 'starves by -2')

  t.throws(
    () => chapa.walks(),
    /Hungry Chapa's HP is 0/,
    'cannot do anything'
  )

  t.end()
})

test('animal can increase HP by eating', (t) => {
  const chapa  = new Animal('Satisfied Chapa')
  t.equal(chapa.name, 'Satisfied Chapa')

  t.equal(chapa.hungerLevel, 0)

  chapa.walks()
  t.equal(chapa.hungerLevel, 5, '+5')

  chapa.eats()
  t.equal(chapa.hungerLevel, 0, '-5')

  chapa.eats()
  t.equal(chapa.hungerLevel, 0, '0 is min')

  t.end()
})

test('animal`s HP increases when it eats', (t) => {
  const musya  = new Animal('Musya')
  t.equal(musya.name, 'Musya')

  t.equal(musya.hungerLevel, 0)
  t.equal(musya.healthPoints, 20)

  musya.walks()
  t.equal(musya.hungerLevel, 5)

  musya.hungerLevel = 20
  musya.walks()

  t.equal(musya.healthPoints, 18)

  musya.hungerLevel = 5
  musya.healthPoints = 4
  musya.eats()

  t.equal(musya.hungerLevel, 0)
  t.equal(musya.healthPoints, 10, 'eats() +6HP')

  musya.healthPoints = 18
  musya.eats()
  t.equal(musya.healthPoints, 20, 'max = 10HP + lvl * 10HP')

  musya.experience = 25
  musya.walks()
  t.equal(musya.level, 2, 'it level-ups')
  t.equal(musya.healthPoints, 30, 'max = 10HP + lvl * 10HP')

  musya.eats()
  t.equal(musya.healthPoints, 30, 'max remains')

  t.end()
})

test('animal`s HP increases when it -ups', (t) => {
  const musya  = new Animal('Musya')
  t.equal(musya.name, 'Musya')

  t.equal(musya.level, 1)
  t.equal(musya.healthPoints, 20)

  musya.experience = 25
  musya.walks()
  t.equal(musya.level, 2)
  t.equal(musya.healthPoints, 30, 'lvl-up +10HP')

  musya.experience = 25
  musya.walks()
  t.equal(musya.level, 3)
  t.equal(musya.healthPoints, 40, 'lvl-up +10HP')

  t.end()
})
