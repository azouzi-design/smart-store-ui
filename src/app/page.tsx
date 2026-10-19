import Link from "next/link";

const pages = [
  { title: "Style guide", href: "/style-guide" },
  { title: "home-previous", href: "/home-previous" },
  { title: "BA-1638", href: "/ba-1638" },
  { title: "BA-1638 ideation", href: "/ba-1638-ideation" },
  { title: "BA-1639 + BA-1642", href: "/ba-1639-ba-1642" },
  { title: "BA-1641", href: "/ba-1641" },
  { title: "BA-1642 ideation", href: "/ba-1642-ideation" },
  { title: "BA-1649", href: "/ba-1649" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-page px-6 py-12">
      <h1 className="font-serif text-[34px] font-bold text-brand">Smart Store UI</h1>
      <p className="mt-2 text-muted">Internal design refinements and UI experiments.</p>

      <ul className="mt-8 flex flex-col gap-3">
        {pages.map(({ title, href }) => (
          <li key={href}>
            <Link href={href} className="font-bold text-brand-link underline underline-offset-4">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
