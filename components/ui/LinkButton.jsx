import Link from "next/link";

export default function LinkButton({ href, children }) {
  return (
    <Link href={href}>
      <button type="button" className="bg-primary text-foreground cursor-pointer px-4 py-2 rounded-md">
        {children}
      </button>
  </Link>
  );
}
