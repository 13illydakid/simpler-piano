import { parseMidi } from '@/features/parsers'
import { Song, SongMetadata, SongSource } from '@/types'
import { getUploadedSong } from '@/features/persist'
import * as library from './library'
import { useCallback, useMemo, useState } from 'react'
import { useFetch } from '@/hooks'
import { FetchState } from '@/hooks/useFetch'

function handleSong(response: Response): Promise<Song> {
  return response.arrayBuffer().then(parseMidi)
}

export function getKey(id: string, source: SongSource) {
  return `${source}/${id}`
}

function getSongUrl(id: string, source: SongSource) {
  return `/api/midi?id=${id}&source=${source}`
  // return `public/music/songs/?id=${id}&source=${source}`
}

export function useSong(id: string, source: SongSource): FetchState<Song> {
  const url =
    id && source && (source === 'midishare' || source === 'builtin')
    // id && source && (source === midishare)
      ? getSongUrl(id, source)
      : undefined
  const fetchState = useFetch(url, handleSong)
  const uploadState: FetchState<Song> = useMemo(() => {
    if (source !== 'upload') {
      return { status: 'idle' }
    }

    const data = getUploadedSong(id)
    if (data) {
      return { status: 'success', data }
    } else {
      return { status: 'error', error: new Error(`Could not find uploaded song: ${id}`) }
    }
  }, [id, source])

  return source === 'upload' ? uploadState : fetchState
}

// TODO: replace with a signals-like library, so that setting from one component is reflected elsewhere.
type SongManifestHookReturn = [SongMetadata[], (metadata: SongMetadata[]) => void]
export function useSongManifest(): SongManifestHookReturn {
  const [songs, setSongs] = useState<SongMetadata[]>(library.getSongsMetadata())

  const add = useCallback((metadataList: SongMetadata[]): void => {
    library.addMetadata(metadataList)
    setSongs(library.getSongsMetadata())
  }, [])

  return useMemo(() => [songs, add], [songs, add])
}

export function useSongMetadata(id: string, source: SongSource) {
  return useMemo(() => library.getSongMetadata(id, source), [id, source])
}
