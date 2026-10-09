import "./PartsList.css";

// Drawing parts list (bill of materials): the technologies a system is built from.
// Rows highlight together with the matching balloon on the schematic.
export function PartsList({ parts, activeItem, onItem, caption = "Parts list" }) {
    return (
        <div className="parts-list">
            <p className="parts-list__caption">{caption}</p>
            <ol className="parts-list__rows">
                {parts.map((part, i) => {
                    const n = i + 1;
                    return (
                        <li
                            key={part}
                            className={activeItem === n ? "is-active" : undefined}
                            onMouseEnter={onItem ? () => onItem(n) : undefined}
                            onMouseLeave={onItem ? () => onItem(null) : undefined}
                        >
                            <span className="parts-list__n" aria-hidden="true">{n}</span>
                            <span>{part}</span>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
