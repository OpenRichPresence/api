import { Mutation, Query, Resolver } from 'type-graphql'
import { MusicPresence, MusicPresenceArtist, MusicPresenceTrack, Presence } from '../types'

@Resolver(of => Presence)
export class PresenceResolver {

  @Query(returns => [MusicPresence])
  async presences() {
    return MusicPresence.find()
  }

  @Mutation()
  createPresence(): Presence {
    // Obviously this is dummy code for testing
    const presence = new MusicPresence()
    const track = new MusicPresenceTrack('Something About You', 205, 'https://open.spotify.com/track/10dqLp3PRXrljVeyR0IvEW?si=05b88c48b1424c33')


    const Elderbrook = new MusicPresenceArtist('Elderbrook', 'https://open.spotify.com/artist/2vf4pRsEY6LpL5tKmqWb64?si=e3643ae05b784121')


    const Rudimental = new MusicPresenceArtist('Rudimental', 'https://open.spotify.com/artist/4WN5naL3ofxrVBgFpguzKo?si=ba2d2cb24b8f4836')


    const MasonMaynard = new MusicPresenceArtist('Mason Maynard', 'https://open.spotify.com/artist/4EdTAy3S5GrswFHCdpiKP3?si=510ad8d2f11e47d8')

    presence.track = track
    presence.artist = Elderbrook
    presence.artists = [Elderbrook, Rudimental, MasonMaynard]

    presence.provider = 'orp:music:spotify'

    presence.save()

    return null as any
  }

}
