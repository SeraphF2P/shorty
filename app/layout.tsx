import "./globals.css";

export const metadata = {
  title: "shorty",
  description: "url shortener website",
  authors: authors: "jafer ali",
  openGraph: {
    images: {
      url: "/images/shorty-social-media-card.jpg",
      width: "1200px",
      height: "620px",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className=" bg-white text-lg font-medium 
      prose-headings:font-bold prose-h2:text-2xl prose-p:p-2 prose-p:text-base  prose-p:text-gray
      hover:prose-a:text-cyan  focus:prose-a:text-cyan  "
      >
        {children}
      </body>
    </html>
  );
}
