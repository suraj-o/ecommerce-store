import React from 'react'

const Feature = () => {
  return (
    <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p>We offer a wide range of high-quality products that meet your needs.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
                <p>Get the best deals and discounts on your favorite products.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                <p>Enjoy quick and reliable shipping to your doorstep.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}

export default Feature