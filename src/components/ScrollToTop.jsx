// Optional: Smooth scroll for all anchor links
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }, []);

  return null;
}
