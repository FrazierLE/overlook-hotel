import { expect } from 'chai'
import Rooms from '../src/classes/rooms'
import { sampleRooms } from '../data/sample-data'

describe('Rooms', () => {
  sampleRooms
  let room1, room2

  beforeEach(() => {
    sampleRooms
    room1 = new Rooms(sampleRooms[0])
    room2 = new Rooms(sampleRooms[1])
  })
  
  it('should be a function', () => {
    expect(Rooms).to.be.a('function')
  })
  it('should have a room number', () => {
    expect(room1.number).to.equal(1)
    expect(room2.number).to.equal(2)
  })
  it('should have a room type', () => {
    expect(room1.roomType).to.equal('residential suite')
    expect(room2.roomType).to.equal('suite')
  })
  it('should have a bidet', () => {
    expect(room1.bidet).to.equal(true)
  })
  it('should not have a bidet', () => {
    expect(room2.bidet).to.equal(false)
  })
  it('should have a bedsize', () => {
    expect(room1.bedSize).to.equal('queen')
    expect(room2.bedSize).to.equal('full')
  })
  it('should have a bed count', () => {
    expect(room1.numBeds).to.equal(1)
    expect(room2.numBeds).to.equal(2)
  })
  it('should have a cost per night', () => {
    expect(room1.costPerNight).to.equal(358.4)
    expect(room2.costPerNight).to.equal(477.38)
  })
})