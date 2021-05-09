import { resolvers } from 'graphql-scalars'
import { Directive, Field, Int, InterfaceType } from 'type-graphql'
import { BaseEntity, BeforeInsert, BeforeUpdate, CreateDateColumn, Entity, ObjectID, TableInheritance, UpdateDateColumn } from 'typeorm'
import { IdProperty, Property } from '../utils'

export enum ProvdiderType {
  MUSIC = 'orp:music',
}

@InterfaceType()
@Entity()
@TableInheritance({
  column: { name: 'type' },
})
export abstract class Presence extends BaseEntity {

  @IdProperty()
  id!: ObjectID

  @Directive('@lowercase')
  @Property(String)
  type!: ProvdiderType

  @Property()
  provider!: string

  @Field(_ => resolvers.DateTime)
  @CreateDateColumn()
  createdAt!: Date

  @Field(_ => resolvers.DateTime)
  @UpdateDateColumn()
  updatedAt!: Date

  @BeforeInsert()
  beforeInsertActions() {
    this.createdAt = new Date()
    this.updatedAt = this.createdAt
  }

  @BeforeUpdate()
  beforeUpdateActions() {
    this.updatedAt = new Date()
  }

}

