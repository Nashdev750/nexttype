import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/monkeytype.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <title>Monkeytype | Customizable Typing Tests</title> */}
        
    
        <meta name="description" content="Experience the ultimate typing test platform featuring a clean, minimalist design and extensive customization options. Challenge yourself with various typing modes, monitor your typing speed, and join a vibrant community of typists to enhance your skills." />
        <meta name="keywords" content="typing speed test, typing speedtest, typing test, speedtest, speed test, typing, test, typing-test, typing test, monkey-type, monkeytype, monkey type, monkey-types, monkeytypes, monkey types, types, monkey, type, miodec, wpm, words per minute, typing website, minimalistic, custom typing test, customizable, customisable, themes, random words, smooth caret, smooth, new, new typing site, new typing website, minimalist typing website, minimalistic typing website, minimalist typing test" />
        <meta name="author" content="Monkeytype" />
        
    
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monkeytype.live/" />
        <meta property="og:title" content="Monkeytype | An Interactive community typing test" />
        <meta property="og:description" content="Experience the ultimate typing test platform featuring a clean, minimalist design and extensive customization options. Challenge yourself with various typing modes, monitor your typing speed, and join a vibrant community of typists to enhance your skills." />
        

        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://monkeytype.live/" />
        <meta property="twitter:title" content="Monkeytype | An Interactive community typing test" />
        <meta property="twitter:description" content="Experience the ultimate typing test platform featuring a clean, minimalist design and extensive customization options. Challenge yourself with various typing modes, monitor your typing speed, and join a vibrant community of typists to enhance your skills." />
        <meta property="twitter:image" content="https://monkeytype.live/twitter-card.png" />


        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
      </head>
      <body
      >
        <GoogleOAuthProvider
        clientId='85800523938-q1hqqos45o9qciubvhdo9cta3qsh8ep7.apps.googleusercontent.com'
        >
        <AuthProvider>
          {children}
        </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
