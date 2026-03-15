import {
  FadeInUp,
} from "@/components/common/animated-container";
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export const  CtaSection= () => {
  return (
     <section className="py-20 border-t border-border/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp whileInView className="space-y-6">
            <h2 className="text-4xl font-bold">Ready to shorten?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users tracking their links with BlazeShort.
              Start free today, no credit card required.
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 h-12 px-8"
                >
                  Create Free Account <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
  )
}
