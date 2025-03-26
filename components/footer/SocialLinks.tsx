import { FaFacebook, } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const SocialLinks = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-white font-semibold text-lg">Stay Connected</h3>
      <p className="text-gray-300">Follow us on</p>
      <div className="flex gap-4">
        <a href="https://www.facebook.com/profile.php?id=100064576157507" target="_blank"  className="text-white hover:text-gray-300">
          <FaFacebook size={24} />
        </a>
        
        <a href="https://www.instagram.com/upright_kids_foundation/" target="_blank" className="text-white hover:text-gray-300">
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
