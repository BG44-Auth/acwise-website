import Image from "next/image";

const sponsors = [
  { src: "/images/sponsor-actronair.png", alt: "ActronAir" },
  { src: "/images/sponsor-airclean.png", alt: "AirClean Filters" },
];

export function SponsorMarquee() {
  const track = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black to-transparent md:w-24" />
      <div className="flex w-max animate-marquee items-center gap-16">
        {track.map((sponsor, index) => (
          <Image
            key={`${sponsor.alt}-${index}`}
            src={sponsor.src}
            alt={sponsor.alt}
            width={160}
            height={80}
            className="h-12 w-auto max-w-none shrink-0 object-contain md:h-20"
          />
        ))}
      </div>
    </div>
  );
}
