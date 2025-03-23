import SmoothScrolling from "@/layout/lenis";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lexend } from "next/font/google";
import { Toaster } from "sonner";

const lexend = Lexend({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SmoothScrolling>
      <main className={lexend.className}>
        <Toaster closeButton />
        <Component {...pageProps} />
      </main>
    </SmoothScrolling>
  );
}
