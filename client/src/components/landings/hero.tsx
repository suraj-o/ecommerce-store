import { Link } from "react-router-dom"
import { Button } from "../ui/button"


const Hero = () => {
  return (
    <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our E-Commerce Store</h1>
          <p className="text-lg mb-8">Find the best products at unbeatable prices.</p>
          <Link to={"/shopping"}>
          <Button className="bg-white text-blue-600 py-2 px-6 rounded-full text-lg font-semibold">
            Shop Now
          </Button>
          </Link>
        </div>
      </section>
  )
}

export default Hero