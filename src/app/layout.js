import Provider from "../../context/Provider";

export const metadata = {
  title: "GarageBook",
  description: "Track your car's maintenance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
