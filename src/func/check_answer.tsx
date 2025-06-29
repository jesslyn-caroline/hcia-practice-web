function checkAnswer(correctAnswer : string[], isSelectedOption : boolean[], optionValue : string[]):boolean {

    let isCorrect:boolean = true

    let arr:string[] = []

    for (let i = 0; i < 4; i++) {
        if (isSelectedOption[i]) arr.push(optionValue[i])
    }

    for (let i = 0; i < correctAnswer.length; i++) {
        if (correctAnswer[i] !== arr[i]) return false
    }

    return isCorrect
}

export default checkAnswer