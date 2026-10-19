interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in ms. */
  delay?: number;
  as?: "div" | "li" | "article" | "header";
  className?: string;
}

/**
 * Wraps content in an element that fades/slides in when scrolled into view
 * (see useReveal). With reduced motion the element is simply visible.
 */
export function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: RevealProps) {
  return (
    <Tag className={`reveal ${className}`.trim()} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
