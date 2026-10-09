import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck, FaSearch, FaTimes } from "react-icons/fa";
import projects from "../../data/projects.json";
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

// Ongoing work counts as the most recent, ahead of anything already finished
const recency = (p) => (p.status && p.status !== "Completed" ? Infinity : p.year ?? 0);

export function Projects() {
    // ── State ──────────────────────────────────────────────────────────────
    const [rawSearch, setRawSearch] = useState("");
    const [search, setSearch] = useState("");           // debounced
    const [filterType, setFilterType] = useState("");
    const [filterSkills, setFilterSkills] = useState(new Set());
    const [skillDropdownOpen, setSkillDropdownOpen] = useState(false);
    const [sortKey, setSortKey] = useState("newest");   // newest | oldest | az | za
    const searchRef = useRef(null);
    const skillDropdownRef = useRef(null);

    // Debounce the search input (300 ms)
    useEffect(() => {
        const t = setTimeout(() => setSearch(rawSearch.trim().toLowerCase()), 300);
        return () => clearTimeout(t);
    }, [rawSearch]);

    // Close skill dropdown on outside click or Escape
    useEffect(() => {
        if (!skillDropdownOpen) return;
        const handler = (e) => {
            if (skillDropdownRef.current && !skillDropdownRef.current.contains(e.target)) {
                setSkillDropdownOpen(false);
            }
        };
        const onKey = (e) => {
            if (e.key === "Escape") setSkillDropdownOpen(false);
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("keydown", onKey);
        };
    }, [skillDropdownOpen]);

    // ── Filtered + sorted list ─────────────────────────────────────────────
    const words = useMemo(() => search.split(/\s+/).filter(Boolean), [search]);

    const filtered = useMemo(() => {
        let result = projects.map((p, i) => ({ ...p, _idx: i }));

        if (words.length)        result = result.filter((p) => matchesSearch(p, words));
        if (filterType)          result = result.filter((p) => p.type === filterType);
        if (filterSkills.size)   result = result.filter((p) =>
            [...filterSkills].every((s) => p.skills.includes(s))
        );

        switch (sortKey) {
            case "newest": result.sort((a, b) => recency(b) - recency(a)); break;
            case "oldest": result.sort((a, b) => recency(a) - recency(b)); break;
            case "az":     result.sort((a, b) => a.title.localeCompare(b.title)); break;
            case "za":     result.sort((a, b) => b.title.localeCompare(a.title)); break;
        }
        return result;
    }, [words, filterType, filterSkills, sortKey]);

    // ── Helpers ────────────────────────────────────────────────────────────
    const hasFilters = rawSearch || filterType || filterSkills.size > 0;

    const toggleSkill = (skill) => {
        setFilterSkills((prev) => {
            const next = new Set(prev);
            if (next.has(skill)) next.delete(skill);
            else next.add(skill);
            return next;
        });
    };

    const removeSkill = (skill) => {
        setFilterSkills((prev) => {
            const next = new Set(prev);
            next.delete(skill);
            return next;
        });
    };

    const clearAll = () => {
        setRawSearch("");
        setFilterType("");
        setFilterSkills(new Set());
        setSkillDropdownOpen(false);
        searchRef.current?.focus();
    };

    const skillTriggerLabel =
        filterSkills.size === 0 ? "Any" :
        filterSkills.size === 1 ? [...filterSkills][0] :
        `${filterSkills.size} selected`;

    // ── Render ─────────────────────────────────────────────────────────────
    return (
        <div className="projects-page">

            {/* Header */}
            <header className="projects-page__header">
                <div className="projects-page__heading-row">
                    <div>
                        <h1 className="projects-page__title">Projects</h1>
                        <p className="projects-page__subtitle">
                            Professional, academic and personal work. Open any row for the full project sheet.
                        </p>
                    </div>
                    <p className="projects-page__count mono" aria-live="polite">
                        <span className="projects-page__count-n">{filtered.length}</span>
                        {" "}/ {projects.length} project{projects.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </header>

            {/* Toolbar */}
            <div className="projects-page__toolbar">
                {/* Search */}
                <div className="pp-search">
                    <FaSearch className="pp-search__icon" aria-hidden="true" />
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
                            <FaTimes aria-hidden="true" />
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="pp-filters">
                    <label className="pp-field">
                        <span className="pp-field__label">Type</span>
                        <select
                            className="pp-select"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="">All Types</option>
                            {ALL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </label>

                    {/* Multi-select skill dropdown */}
                    <div className="pp-field pp-skill-dropdown" ref={skillDropdownRef}>
                        <span className="pp-field__label" id="pp-skill-label">Skills</span>
                        <button
                            className={`pp-skill-trigger${filterSkills.size ? " pp-skill-trigger--active" : ""}${skillDropdownOpen ? " pp-skill-trigger--open" : ""}`}
                            onClick={() => setSkillDropdownOpen((v) => !v)}
                            aria-expanded={skillDropdownOpen}
                            aria-haspopup="listbox"
                            aria-label={`Filter by skills: ${skillTriggerLabel}`}
                        >
                            <span className="pp-skill-trigger__text">{skillTriggerLabel}</span>
                            <svg className="pp-skill-trigger__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>

                        {skillDropdownOpen && (
                            <div className="pp-skill-panel" role="listbox" aria-multiselectable="true" aria-labelledby="pp-skill-label">
                                {ALL_SKILLS.map((skill) => {
                                    const selected = filterSkills.has(skill);
                                    return (
                                        <button
                                            key={skill}
                                            role="option"
                                            aria-selected={selected}
                                            className={`pp-skill-option${selected ? " pp-skill-option--selected" : ""}`}
                                            onClick={() => toggleSkill(skill)}
                                        >
                                            <span className="pp-skill-option__check" aria-hidden="true">
                                                {selected && <FaCheck />}
                                            </span>
                                            {skill}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <label className="pp-field">
                        <span className="pp-field__label">Sort</span>
                        <select
                            className="pp-select"
                            value={sortKey}
                            onChange={(e) => setSortKey(e.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="az">A → Z</option>
                            <option value="za">Z → A</option>
                        </select>
                    </label>

                    {hasFilters && (
                        <button className="btn btn--plain pp-clear-btn" onClick={clearAll}>
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
                <div className="pp-chips">
                    {rawSearch && (
                        <button className="pp-chip" onClick={() => setRawSearch("")} aria-label={`Remove search "${rawSearch}"`}>
                            &ldquo;{rawSearch}&rdquo; <FaTimes aria-hidden="true" />
                        </button>
                    )}
                    {filterType && (
                        <button className="pp-chip" onClick={() => setFilterType("")} aria-label={`Remove type filter ${filterType}`}>
                            Type: {filterType} <FaTimes aria-hidden="true" />
                        </button>
                    )}
                    {[...filterSkills].map((skill) => (
                        <button key={skill} className="pp-chip" onClick={() => removeSkill(skill)} aria-label={`Remove skill filter ${skill}`}>
                            {skill} <FaTimes aria-hidden="true" />
                        </button>
                    ))}
                </div>
            )}

            {/* Register */}
            {filtered.length > 0 ? (
                <ol className="register">
                    <li className="register__head" aria-hidden="true">
                        <span>No.</span>
                        <span>Project</span>
                        <span>Type</span>
                        <span>Year</span>
                        <span>Technologies</span>
                    </li>
                    {filtered.map(({ _idx, ...project }) => (
                        <li key={project.title}>
                            <Link to={`/projects/${_idx}`} className="register__row">
                                <span className="register__no mono">{String(_idx + 1).padStart(2, "0")}</span>
                                <span className="register__project">
                                    <span className="register__title">{project.title}</span>
                                    <span className="register__tagline">{project.tagline}</span>
                                </span>
                                <span className="register__type">
                                    {project.type}
                                    {project.status && project.status !== "Completed" && (
                                        <span className="rev-mark">{project.status}</span>
                                    )}
                                </span>
                                <span className="register__year mono">{project.year}</span>
                                <ul className="stack register__stack">
                                    {project.skills.slice(0, 5).map((s) => <li key={s}>{s}</li>)}
                                    {project.skills.length > 5 && <li>+{project.skills.length - 5}</li>}
                                </ul>
                                <FaArrowRight className="register__go" aria-hidden="true" />
                            </Link>
                        </li>
                    ))}
                </ol>
            ) : (
                <div className="projects-page__empty">
                    <p className="projects-page__empty-title">No projects match your filters.</p>
                    <p className="projects-page__empty-sub">Remove a filter above, or clear them all to see the full register.</p>
                    <button className="btn" onClick={clearAll}>
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
