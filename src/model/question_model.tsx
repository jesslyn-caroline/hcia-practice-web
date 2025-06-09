export interface QuestionModel {
    _id: string,
    question: string,
    year: number,
    type: string,
    options: string[],
    answer: string[],
    score: number
}