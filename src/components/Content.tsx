import { useEffect, useState } from 'react'
import { MovieCard } from '../components/MovieCard'
import '../styles/content.scss'
import { api } from '../services/api'

interface GenreProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}

export function Content(props: { id: number }) {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreProps>(
    {} as GenreProps
  )

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.id}`).then(response => {
      setMovies(response.data)
    })
    api.get<GenreProps>(`genres/${props.id}`).then(response => {
      setSelectedGenre(response.data)
    })
  }, [props.id])

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
