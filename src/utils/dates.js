const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(dateStr) {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
}

export function dateRange(startDate, endDate, current) {
    const start = formatDate(startDate);
    const end = current || !endDate ? "Present" : formatDate(endDate);
    return `${start} – ${end}`;
}

export function duration(startDate, endDate, current) {
    const [sy, sm] = startDate.split("-").map(Number);
    const now = new Date();
    const [ey, em] = current || !endDate
        ? [now.getFullYear(), now.getMonth() + 1]
        : endDate.split("-").map(Number);
    const months = (ey - sy) * 12 + (em - sm);
    if (months < 1) return "< 1 month";
    if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return rem > 0 ? `${years} yr ${rem} mo` : `${years} yr${years > 1 ? "s" : ""}`;
}
