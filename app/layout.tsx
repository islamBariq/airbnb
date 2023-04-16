import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
export const metadata = {
  title: "airbnb",
  description: "airbnb cloned version",
};

const font = Nunito({
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <RegisterModal />
        <LoginModal />
        <RentModal/>
        <ToasterProvider />
        <Navbar  currentUser ={currentUser} />
        {children}
      </body>
    </html>
  );
}
