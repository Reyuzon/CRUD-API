import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Protest_Guerrilla, Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const protestGuerrilla = Protest_Guerrilla({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-guerrilla",
});

export default function App({ Component, pageProps }) {
  return (
    <div
      className={`font-poppins ${poppins.variable} ${protestGuerrilla.variable}`}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
