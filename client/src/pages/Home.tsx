
import Feature from '@/components/landings/Feature';
import Hero from '@/components/landings/hero';


const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <Hero/>

      {/* Features Section */}
      <Feature/>
    </div>
  )
}

export default Home