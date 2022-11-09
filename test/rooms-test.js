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
    expect(Customers).to.be.a('function')
  })
})