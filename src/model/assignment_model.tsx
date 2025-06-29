import type { QuestionModel } from "./question_model"

export interface AssignmentModel {
    _id: string,
    type: string,
    time: number,
    title: string,
    questions: QuestionModel[]
}