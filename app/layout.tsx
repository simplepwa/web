/* eslint-disable @next/next/no-page-custom-font */
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-comic bg-[#1a1a1a]">{children}</body>
    </html>
  )
}

