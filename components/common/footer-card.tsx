import Image from 'next/image'
export const Footer= () => {
  return (
    <footer className="border-t border-border/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="BlazeShort" width={150} height={150} className="rounded-lg" loading="eager" />
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-border/20 pt-6">
            <p className="text-muted-foreground text-sm">© 2024 BlazeShort. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}
