import { Inter } from "next/font/google";

import "../styles/globals.css";
import "bulma/css/bulma.css";
import "../styles/loader.css";

//theme
import "primereact/resources/themes/md-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
