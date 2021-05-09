import { registerEnumType } from 'type-graphql'
import { MusicPresenceStatus } from './types/MusicPresence'
import { ProvdiderType } from './types/Presence'

// TODO: Directives? (like @lowercase in Presence.ts)
// https://www.graphql-tools.com/docs/schema-directives/#uppercasing-strings

// TODO: Custom SecureUrl scalar
// https://typegraphql.com/docs/scalars.html

registerEnumType(MusicPresenceStatus, {
  name: 'MusicPresenceStatus',
  description: 'The status of the music player. For example, \'PLAYING\'',
})
