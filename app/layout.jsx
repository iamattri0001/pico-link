import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

export const metadata = {
  title: "Pico Link | URL shortening services for free",
  description: "Shorten up any URL with a few clicks and keystrokes",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={shadesOfPurple}>
      <html lang="en">
        <body className="font-body">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="flex items-center justify-center flex-col p-5 pt-0 md:p-10 md:pt-0">
              {children}
            </div>
            <Toaster
              position="bottom-center"
              reverseOrder={false}
              containerStyle={{
                top: "48px",
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
