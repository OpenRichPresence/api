import { ObjectType } from 'type-graphql'
import { Entity, ObjectID } from 'typeorm'
import { IdProperty } from '../utils'

// TODO
@ObjectType()
@Entity()
class Consumer {

  @IdProperty()
  id!: ObjectID

  /**
   * @description This key is used to link a request to a Consumer, essentially
   * an apiKey. Naturally, this will never be included in a response
   */
  key!: string

}
