
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
const Foooter = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap justify-between mb-8">
        
        {/* Customer Service */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-gray-400">Help Center</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-400">Returns</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-400">Shipping</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-400">Contact Us</a></li>
          </ul>
        </div>
        
        {/* Legal */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Legal</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
            <li className="mb-2"><a href="#" className="hover:text-gray-400">Cookie Policy</a></li>
          </ul>
        </div>
        
        {/* Social Media */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-700 pt-2 mt-2 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Foooter