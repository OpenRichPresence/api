import { ObjectType } from 'type-graphql'
import { Entity, ObjectID } from 'typeorm'
import { IdProperty, Property } from '../utils'

// TODO
@ObjectType()
@Entity()
class User {

  @IdProperty()
  id!: ObjectID

  @IdProperty()
  consumerId!: ObjectID

  @Property()
  loginId!: string // TODO: 'apple:<id>' | 'google:<id>', etc.?

}
