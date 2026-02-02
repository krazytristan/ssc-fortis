import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("ssc_cookie_consent");
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("ssc_cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-[999]
                    bg-darkblue text-yellow p-4 rounded-xl shadow-xl max-w-2xl">
      <p className="text-sm mb-3">
        This website uses cookies to improve user experience and comply with the
        Data Privacy Act of 2012.
      </p>

      <button
        onClick={acceptCookies}
        className="bg-yellow text-maroon px-4 py-2 rounded-full font-semibold hover:bg-maroon hover:text-yellow transition"
      >
        Accept Cookies
      </button>
    </div>
  );
}
