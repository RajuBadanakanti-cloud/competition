

export const getCompetitionStatus = (competition) => {
    const now = new Date();

    if (now < competition.registrationStart) {
        return "upcoming";
    }

    if (
        now >= competition.registrationStart &&
        now <= competition.registrationEnd
    ) {
        return "registration_open";
    }

    if (
        now > competition.registrationEnd &&
        now < competition.submissionStart
    ) {
        return "registration_closed";
    }

    if (
        now >= competition.submissionStart &&
        now <= competition.submissionEnd
    ) {
        return "submission_open";
    }

    if (now > competition.submissionEnd) {
        return "completed";
    }
};