import { Field, Float, ID, Int } from 'type-graphql'
import { Column, ObjectIdColumn } from 'typeorm'

const gqlTypes = [Float, Int, ID]
function getPropertyFunc(fieldFn: Function, columnFn: Function) {
  return function (target: any, key: string) {
    fieldFn(target, key)
    columnFn(target, key)
  }
}

export function Property(gqlType?: any, dbType = gqlType) {
  const fieldFn = Field(gqlType ? _ => gqlType : undefined)

  const addColumnType = dbType && !gqlTypes.includes(dbType)
  const columnFn = addColumnType ? Column(_ => dbType) : Column()

  return getPropertyFunc(fieldFn, columnFn)
}

export function NullableProperty(type?: any) {
  const conf = { nullable: true }
  const fieldFn = type ? Field(_ => type, conf) : Field(conf)

  const addColumnType = type && !gqlTypes.includes(type)
  const columnFn = addColumnType ? Column((() => type) as any, conf) : Column(conf)

  return getPropertyFunc(fieldFn, columnFn)
}

export function IdProperty() {
  return getPropertyFunc(Field(_ => ID), ObjectIdColumn())
}
