import Image from "next/image"
import { Movie } from "@/typings"
import { useEffect, useState } from "react"
import { baseUrl } from "@/constants/movie"
import { FaPlay } from "react-icons/fa"
import { InformationCircleIcon } from "@heroicons/react/solid"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "@/atoms/modalAtom"

interface Props {
    netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {

  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[80vh] lg:justify-end
    lg:pb-0">
      <div className="absolute top-0 right-0 -z-10 h-[100vh] w-screen">
        <Image 
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="Background"
          fill
          objectFit="cover" //include sizes
        />
      </div>

      <h1 className="text-2xl font-bold lg:text-6xl md:text-4xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-3xl lg:text-1xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7"/>Play
        </button>
        <button className="bannerButton bg-[gray]/70" 
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8"/></button>
      </div>
    </div>
  )
}

export default Banner
