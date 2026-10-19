import type { FaqItem } from "../data/faq";
import "./FaqList.css";

/**
 * FAQ rendered as native <details> elements: the full answers are always
 * present in the HTML (good for search and AI crawlers) while staying
 * collapsible, keyboard-operable and readable without JavaScript.
 */
export function FaqList({ items, idPrefix = "faq" }: { items: FaqItem[]; idPrefix?: string }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details className="faq__item" id={`${idPrefix}-${item.id}`} key={item.id}>
          <summary className="faq__q">
            <span>{item.question}</span>
          </summary>
          <p className="faq__a">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
