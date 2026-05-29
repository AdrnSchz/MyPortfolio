import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import projects from "../../data/projects.json";
import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import "./Projects.css";

// All unique types and skills derived once at module level
const ALL_TYPES = [...new Set(projects.map((p) => p.type).filter(Boolean))];
const ALL_SKILLS = [...new Set(projects.flatMap((p) => p.skills))].sort((a, b) =>
    a.localeCompare(b)
);

// Simple multi-word search: every word must appear somewhere in the haystack
function matchesSearch(project, words) {
    if (!words.length) return true;
    const haystack = [
        project.title,
        project.tagline,
        project.description,
        ...(project.skills ?? []),
        project.type,
        project.role,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
    return words.every((w) => haystack.includes(w));
}

export function Projects() {
    const navigate = useNavigate();

    // ── State ──────────────────────────────────────────────────────────────
    const [rawSearch, setRawSearch] = useState("");
    const [search, setSearch] = useState("");       // debounced
    const [filterType, setFilterType] = useState("");
    const [filterSkill, setFilterSkill] = useState("");
    const [sortKey, setSortKey] = useState("newest"); // newest | oldest | az | za
    const searchRef = useRef(null);

    // Debounce the search input (300 ms)
    useEffect(() => {
        const t = setTimeout(() => setSearch(rawSearch.trim().toLowerCase()), 300);
        return () => clearTimeout(t);
    }, [rawSearch]);

    // ── Filtered + sorted list ─────────────────────────────────────────────
    const words = useMemo(() => search.split(/\s+/).filter(Boolean), [search]);

    const filtered = useMemo(() => {
        let result = projects.map((p, i) => ({ ...p, _idx: i }));

        if (words.length) result = result.filter((p) => matchesSearch(p, words));
        if (filterType)   result = result.filter((p) => p.type === filterType);
        if (filterSkill)  result = result.filter((p) => p.skills.includes(filterSkill));

        switch (sortKey) {
            case "newest": result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0)); break;
            case "oldest": result.sort((a, b) => (a.year ?? 0) - (b.year ?? 0)); break;
            case "az":     result.sort((a, b) => a.title.localeCompare(b.title)); break;
            case "za":     result.sort((a, b) => b.title.localeCompare(a.title)); break;
        }
        return result;
    }, [words, filterType, filterSkill, sortKey]);

    // ── Helpers ────────────────────────────────────────────────────────────
    const hasFilters = rawSearch || filterType || filterSkill;

    const clearAll = () => {
        setRawSearch("");
        setFilterType("");
        setFilterSkill("");
        searchRef.current?.focus();
    };

    const removeChip = (kind) => {
        if (kind === "search") setRawSearch("");
        if (kind === "type")   setFilterType("");
        if (kind === "skill")  setFilterSkill("");
    };

    // ── Render ─────────────────────────────────────────────────────────────
    return (
        <div className="projects-page">

            {/* Header */}
            <div className="projects-page__header">
                <div>
                    <h1 className="projects-page__title">Projects</h1>
                    <p className="projects-page__subtitle">
                        A collection of my academic and personal work.
                    </p>
                </div>
                <span className="projects-page__count">
                    {filtered.length} / {projects.length} project{projects.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Toolbar */}
            <div className="projects-page__toolbar">
                {/* Search */}
                <div className="pp-search">
                    <svg className="pp-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                        ref={searchRef}
                        className="pp-search__input"
                        type="text"
                        placeholder="Search by title, skill, keyword…"
                        value={rawSearch}
                        onChange={(e) => setRawSearch(e.target.value)}
                        aria-label="Search projects"
                    />
                    {rawSearch && (
                        <button className="pp-search__clear" onClick={() => setRawSearch("")} aria-label="Clear search">
                            ✕
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="pp-filters">
                    <div className="pp-select-wrap">
                        <select
                            className="pp-select"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            aria-label="Filter by type"
                        >
                            <option value="">All Types</option>
                            {ALL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="pp-select-wrap">
                        <select
                            className="pp-select"
                            value={filterSkill}
                            onChange={(e) => setFilterSkill(e.target.value)}
                            aria-label="Filter by skill"
                        >
                            <option value="">All Skills</option>
                            {ALL_SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="pp-select-wrap pp-select-wrap--sort">
                        <svg className="pp-sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <line x1="3" y1="12" x2="15" y2="12"/>
                            <line x1="3" y1="18" x2="9" y2="18"/>
                        </svg>
                        <select
                            className="pp-select"
                            value={sortKey}
                            onChange={(e) => setSortKey(e.target.value)}
                            aria-label="Sort projects"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="az">A → Z</option>
                            <option value="za">Z → A</option>
                        </select>
                    </div>

                    {hasFilters && (
                        <button className="pp-clear-btn" onClick={clearAll}>
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
                <div className="pp-chips">
                    {rawSearch && (
                        <button className="pp-chip" onClick={() => removeChip("search")}>
                            🔍 &ldquo;{rawSearch}&rdquo; <span>✕</span>
                        </button>
                    )}
                    {filterType && (
                        <button className="pp-chip" onClick={() => removeChip("type")}>
                            Type: {filterType} <span>✕</span>
                        </button>
                    )}
                    {filterSkill && (
                        <button className="pp-chip" onClick={() => removeChip("skill")}>
                            Skill: {filterSkill} <span>✕</span>
                        </button>
                    )}
                </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="projects-page__grid">
                    {filtered.map(({ _idx, ...project }) => (
                        <ProjectCard
                            key={project.title}
                            variant="grid"
                            {...project}
                            onClick={() => navigate(`/projects/${_idx}`)}
                        />
                    ))}
                </div>
            ) : (
                <div className="projects-page__empty">
                    <span className="projects-page__empty-icon">🔍</span>
                    <p>No projects match your filters.</p>
                    <button className="pp-clear-btn pp-clear-btn--lg" onClick={clearAll}>
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
