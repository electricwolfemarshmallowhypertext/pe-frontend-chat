import './globals.css';

export const metadata = {
  title: "Neve™ | AI that treats you like a human | by antiparty, Inc.",
  description: "Neve - Human-Centric AIX™ by antiparty, Inc.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#ffffff] text-gray-800 antialiased h-screen flex overflow-hidden">
        {children}
      </body>
    </html>
  );
}
