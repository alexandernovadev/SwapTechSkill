import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const SocialMediaLinks: React.FC = () => {
  return (
    <div className="flex  space-x-4">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white"
      >
        <FontAwesomeIcon icon={faFacebookF} size="2xl" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white"
      >
        <FontAwesomeIcon icon={faInstagram} size="2xl" />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white"
      >
        <FontAwesomeIcon icon={faTwitter} size="2xl" />
      </a>
      <a
        href="https://tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white"
      >
        <FontAwesomeIcon icon={faTiktok} size="2xl" />
      </a>
    </div>
  );
};

export default SocialMediaLinks;
