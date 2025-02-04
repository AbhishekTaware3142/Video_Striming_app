import Banner from "@/components/Banner";
import Header from "@/components/Header";
import requests from "@/utils/requests";
import { Inter } from "next/font/google";
import { Movie } from '../typings';
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import Modal from "@/components/Modal";
import Plans from "@/components/Plans";
import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import payments from "@/lib/stripe";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {

  // const products = await getProducts(payments, {
  //   includePrices: true,
  //   activeOnly: true,
  // })
  // .then((res) => res)
  // .catch((error) => console.log(error.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    }
  }
}

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

const Home = ( {
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props ) => {
  //console.log(payments)
  const { loading } = useAuth()
  const showModal = useRecoilValue(modalState)

  if (loading) return null

  return (
      <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
        <Header />
        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          <Banner netflixOriginals={netflixOriginals}/>
          <section className="md:space-y-24">
            <Row title="Trending Now" movies={trendingNow} />
            <Row title="Top Rated" movies={topRated} />
            <Row title="Action Thrillers" movies={actionMovies} />
            {/* My List Component */}
            <Row title="Comedies" movies={comedyMovies} />
            <Row title="Horror Movies" movies={horrorMovies} />
            {/*<Row title="Romantic Movies" movies={romanceMovies} /> Unfiltered*/}
            <Row title="Documentaries" movies={documentaries} />
          </section>
        </main>
          {showModal && <Modal />}
      </div>
  );
}

export default Home;
