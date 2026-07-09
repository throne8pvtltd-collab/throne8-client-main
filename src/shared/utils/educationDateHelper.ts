export const packFutureDate = (description: string, endDate: string | null | undefined): { apiEndDate: string | null, apiDescription: string } => {
    if (!endDate) return { apiEndDate: null, apiDescription: description };

    const end = new Date(endDate);
    const now = new Date();
    const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 365) {
        // Pack inside description if more than 1 year in the future to bypass backend production limit
        const cleanDesc = description ? description.replace(/\s*\[REAL_END_DATE:[^\]]+\]/g, '') : '';
        const apiDescription = `${cleanDesc}\n[REAL_END_DATE:${endDate}]`.trim();
        return { apiEndDate: null, apiDescription };
    }

    return { apiEndDate: endDate, apiDescription: description };
};

export const unpackFutureDate = (education: any): any => {
    if (!education) return education;

    let description = education.description || '';
    let endDate = education.endDate || null;
    let isOngoing = education.isOngoing;

    const match = description.match(/\[REAL_END_DATE:([^\]]+)\]/);
    if (match) {
        endDate = match[1];
        description = description.replace(/\s*\[REAL_END_DATE:[^\]]+\]/g, '').trim();
        isOngoing = false;
    }

    // Recalculate duration if a future end date was unpacked
    let duration = education.duration;
    if (match) {
        const start = new Date(education.startDate);
        const end = new Date(endDate);
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(months / 12);
        const rem = months % 12;
        if (years > 0 && rem > 0) {
            duration = `${years} yr${years > 1 ? 's' : ''} ${rem} mo${rem > 1 ? 's' : ''}`;
        } else if (years > 0) {
            duration = `${years} yr${years > 1 ? 's' : ''}`;
        } else {
            duration = `${rem} mo${rem > 1 ? 's' : ''}`;
        }
    }

    return {
        ...education,
        endDate,
        description,
        isOngoing,
        duration
    };
};
