import { useDrawIn } from "./useDrawIn";
import "./Schematic.css";

function Balloon({ x, y, n, active, onEnter, onLeave }) {
    return (
        <g
            className={`sch-balloon${active ? " is-active" : ""}`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <line className="sch-leader" x1={x - 14} y1={y + 14} x2={x - 4} y2={y + 4} pathLength="1" />
            <circle cx={x} cy={y} r="10" />
            <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="middle">{n}</text>
        </g>
    );
}

export function Schematic({ schematic, title, activeItem, onItem }) {
    const [ref, drawState] = useDrawIn();
    const { width, height, nodes, edges, dimension, vdimension, boundary } = schematic;
    const hover = (n) => () => onItem?.(n);
    const leave = () => onItem?.(null);

    return (
        <figure ref={ref} className={`schematic schematic--${drawState}`}>
            <svg
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label={`${title} architecture diagram`}
                className="schematic__svg"
            >
                <defs>
                    <marker id="sch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M0 1 L10 5 L0 9 z" className="sch-arrowhead" />
                    </marker>
                    <marker id="sch-tick" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto">
                        <path d="M2 8 L8 2" className="sch-tick" />
                    </marker>
                </defs>

                {boundary && (
                    <g className={`sch-boundary${activeItem === boundary.item ? " is-active" : ""}`}>
                        <rect x={boundary.x} y={boundary.y} width={boundary.w} height={boundary.h} />
                        <text x={boundary.x + 8} y={boundary.y + boundary.h - 8} className="sch-boundary__label">
                            {boundary.label.toUpperCase()}
                        </text>
                        {boundary.item && (
                            <Balloon
                                x={boundary.x + boundary.w}
                                y={boundary.y + boundary.h}
                                n={boundary.item}
                                active={activeItem === boundary.item}
                                onEnter={hover(boundary.item)}
                                onLeave={leave}
                            />
                        )}
                    </g>
                )}

                {edges.map((e, i) => (
                    <g key={i} className={`sch-edge${e.item && activeItem === e.item ? " is-active" : ""}`}>
                        <path d={e.d} pathLength="1" markerEnd="url(#sch-arrow)" />
                        {e.label && (
                            <text x={e.lx} y={e.ly} className={`sch-edge__label${e.figure ? " sch-edge__label--figure" : ""}`}>{e.label}</text>
                        )}
                    </g>
                ))}

                {nodes.map((n) => {
                    const active = n.item && activeItem === n.item;
                    const cls = [
                        "sch-node",
                        n.device && "sch-node--device",
                        n.quiet && "sch-node--quiet",
                        active && "is-active",
                    ].filter(Boolean).join(" ");
                    const cy = n.sub ? n.y + n.h / 2 - 8 : n.y + n.h / 2;
                    return (
                        <g key={n.id} className={cls}>
                            <rect x={n.x} y={n.y} width={n.w} height={n.h} />
                            <text x={n.x + n.w / 2} y={cy} textAnchor="middle" dominantBaseline="middle" className="sch-node__label">
                                {n.label}
                            </text>
                            {n.sub && (
                                <text x={n.x + n.w / 2} y={cy + 19} textAnchor="middle" dominantBaseline="middle" className="sch-node__sub">
                                    {n.sub}
                                </text>
                            )}
                            {n.item && (
                                <Balloon
                                    x={n.x + n.w}
                                    y={n.y}
                                    n={n.item}
                                    active={active}
                                    onEnter={hover(n.item)}
                                    onLeave={leave}
                                />
                            )}
                        </g>
                    );
                })}

                {edges.filter((e) => e.item).map((e, i) => (
                    <Balloon
                        key={`eb${i}`}
                        x={e.lx - 22}
                        y={e.ly - 5}
                        n={e.item}
                        active={activeItem === e.item}
                        onEnter={hover(e.item)}
                        onLeave={leave}
                    />
                ))}

                {dimension && (
                    <g className="sch-dim">
                        <line x1={dimension.x1} y1={dimension.ext} x2={dimension.x1} y2={dimension.y + 8} pathLength="1" />
                        <line x1={dimension.x2} y1={dimension.ext} x2={dimension.x2} y2={dimension.y + 8} pathLength="1" />
                        <line
                            className="sch-dim__line"
                            x1={dimension.x1}
                            y1={dimension.y}
                            x2={dimension.x2}
                            y2={dimension.y}
                            pathLength="1"
                            markerStart="url(#sch-arrow)"
                            markerEnd="url(#sch-arrow)"
                        />
                        <rect
                            className="sch-dim__gap"
                            x={(dimension.x1 + dimension.x2) / 2 - dimension.label.length * 5.4 - 10}
                            y={dimension.y - 10}
                            width={dimension.label.length * 10.8 + 20}
                            height={20}
                        />
                        <text x={(dimension.x1 + dimension.x2) / 2} y={dimension.y + 1} textAnchor="middle" dominantBaseline="middle" className="sch-dim__label">
                            {dimension.label}
                        </text>
                    </g>
                )}

                {vdimension && (
                    <g className="sch-dim">
                        <line x1={vdimension.ext} y1={vdimension.y1} x2={vdimension.x + 6} y2={vdimension.y1} pathLength="1" />
                        <line x1={vdimension.ext} y1={vdimension.y2} x2={vdimension.x + 6} y2={vdimension.y2} pathLength="1" />
                        <line
                            className="sch-dim__line"
                            x1={vdimension.x}
                            y1={vdimension.y1}
                            x2={vdimension.x}
                            y2={vdimension.y2}
                            pathLength="1"
                            markerStart="url(#sch-arrow)"
                            markerEnd="url(#sch-arrow)"
                        />
                        <text
                            x={vdimension.x - 8}
                            y={(vdimension.y1 + vdimension.y2) / 2}
                            textAnchor="end"
                            dominantBaseline="middle"
                            className="sch-dim__label"
                        >
                            {vdimension.label}
                        </text>
                    </g>
                )}
            </svg>
        </figure>
    );
}
