import dayjs from "dayjs";

const formatDate = (question: any) => {
    question.submitAt = dayjs(question.submitAt).format("YYYY-MM-DD HH:mm");

    if (question.answered) {
        question.answeredAt = dayjs(question.answeredAt).format(
            "YYYY-MM-DD HH:mm"
        );
    }

    return question;
};

export default formatDate;
