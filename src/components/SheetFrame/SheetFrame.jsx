import "./SheetFrame.css";

const COLS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ROWS = ["A", "B", "C", "D", "E", "F"];

// Fixed drawing-sheet border with zone references, framing the scrolling page.
export function SheetFrame() {
    return (
        <div className="sheet-frame" aria-hidden="true">
            <div className="sheet-frame__edge sheet-frame__edge--top">
                {COLS.map((c) => <span key={c}>{c}</span>)}
            </div>
            <div className="sheet-frame__edge sheet-frame__edge--bottom">
                {COLS.map((c) => <span key={c}>{c}</span>)}
            </div>
            <div className="sheet-frame__edge sheet-frame__edge--left">
                {ROWS.map((r) => <span key={r}>{r}</span>)}
            </div>
            <div className="sheet-frame__edge sheet-frame__edge--right">
                {ROWS.map((r) => <span key={r}>{r}</span>)}
            </div>
            <div className="sheet-frame__border" />
        </div>
    );
}
