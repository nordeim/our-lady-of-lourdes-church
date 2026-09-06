import { ArrowRight } from "lucide-react";
import { Emblem } from "@/components/Emblem";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-bsc-cream pt-28">
      <Container className="text-center">
        <Emblem className="rise-in mx-auto h-20 w-20" />
        <p className="rise-in rise-in-d1 mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-bsc-gold-700">
          404
        </p>
        <h1 className="rise-in rise-in-d2 mt-4 font-display text-4xl font-semibold text-bsc-sapphire-900">
          This path does not lead to the church.
        </h1>
        <p className="rise-in rise-in-d3 mx-auto mt-4 max-w-md text-bsc-charcoal/80">
          The grotto is still at 50 Ophir Road. The address you typed is not.
        </p>
        <div className="rise-in rise-in-d4 mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" icon={ArrowRight}>
            Return home
          </Button>
          <Button to="/worship" variant="secondary">
            Mass times
          </Button>
        </div>
      </Container>
    </section>
  );
}
