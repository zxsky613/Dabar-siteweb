import Link from "next/link";

type NavArrowProps = {
  direction: "left" | "right";
  className?: string;
};

/** Flèche de navigation — même DA partout (retour, carrousel). */
export function NavArrow({ direction, className = "h-7 w-7 sm:h-8 sm:w-8" }: NavArrowProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <>
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </>
      )}
    </svg>
  );
}

type BackLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function BackLink({ href, label, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`btn-interactive group inline-flex items-center gap-2.5 rounded-full bg-navy py-2.5 pl-4 pr-5 text-sm font-semibold text-white shadow-md hover:bg-navy-dark ${className ?? ""}`}
    >
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span>{label}</span>
    </Link>
  );
}

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
  className?: string;
};

export function ArrowButton({ direction, onClick, label, className }: ArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`interactive-tab inline-flex shrink-0 text-blue-light hover:text-navy ${className ?? ""}`}
    >
      <NavArrow direction={direction} className="h-8 w-8 sm:h-10 sm:w-10" />
    </button>
  );
}
