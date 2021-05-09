import { Min } from 'class-validator'
import { Directive, Int, ObjectType } from 'type-graphql'
import { ChildEntity } from 'typeorm'
import { Property } from '../utils'
import { Presence, ProvdiderType } from './Presence'

export enum MusicPresenceStatus {
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
}

@ObjectType()
export class MusicPresenceTrack {

  @Directive('@desc(_: "The name of the track")')
  @Property()
  name: string

  @Directive('@desc(_: "The length of the track in whole seconds")')
  @Property(Int)
  @Min(0)
  length: number

  @Directive('@desc(_: "A URL to the track. Must be a well-formed HTTPS URL")')
  @Property()
  url: string

  constructor(name: string, length: number, url: string) {
    this.name = name
    this.length = length
    this.url = url
  }

}

@ObjectType()
export class MusicPresenceArtist {

  @Directive('@desc(_: "The name of the artist")')
  @Property()
  name: string

  @Directive('@desc(_: "A URL to the artist. Must be a well-formed HTTPS URL")')
  @Property()
  url: string

  constructor(name: string, url: string) {
    this.name = name
    this.url = url
  }

}

@ObjectType({ implements: Presence })
@ChildEntity()
export class MusicPresence extends Presence {

  type = ProvdiderType.MUSIC

  @Directive('@desc(_: "The music player\'s currently focused track")')
  @Property(MusicPresenceTrack)
  track!: MusicPresenceTrack

  @Directive('@desc(_: "The primary artist of the track")')
  @Property(MusicPresenceArtist)
  artist!: MusicPresenceArtist

  @Directive('@desc(_: "An array of all involved artists")')
  @Directive('@default(_: "[MusicPresence.artist]")')
  @Property([MusicPresenceArtist], MusicPresenceArtist)
  artists: MusicPresenceArtist[] = [this.artist]

  @Directive('@uppercase')
  @Directive('@desc(_: "The status of the music player. ex. \'PLAYING\'")')
  @Directive('@default(_: "\'PLAYING\'")')
  @Property(MusicPresenceStatus)
  status: MusicPresenceStatus = MusicPresenceStatus.PLAYING

}
