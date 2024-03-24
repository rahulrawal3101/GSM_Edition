import { app_name } from "@/globals/constant";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: app_name,
  description: "An app to get players timings data!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="px-8 py-8">
        <Header title={app_name}/>
        {children}
        </body>
    </html>
  );
}
