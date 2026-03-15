import Link from "next/link"
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import Image from "next/image";

export const NavigationSection = () => {
    return (
              <nav className="sticky top-0 z-50 border-b border-border/20 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="BlazeShort"
              width={120}
              height={100}
              className="rounded-lg"
              loading="eager"
            />
            {/* <span className="text-xl font-bold gradient-primary bg-clip-text text-white">BlazeShort</span> */}
          </motion.div>
          <div className="flex gap-4 items-center">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    )
}