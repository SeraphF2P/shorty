import "../css/globals.css";

export const metadata = {
  title: "shortly",
  description: "url shortener website",
  openGraph: {
    images: {
      url: "/images/shorty-social-media-card.jpg",
      width: "1200px",
      height: "620px",
    },
    authors: "jafer ali",
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
          "
      >
        {children}
      </body>
    </html>
  );
}
