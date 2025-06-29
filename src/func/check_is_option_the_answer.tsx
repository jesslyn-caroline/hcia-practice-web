function checkIsOptionTheAnswer(option: string, answer: string[]) {
    for (let i = 0; i < answer.length; i++) {
        if (option === answer[i]) return true
    }

    return false
}

export default checkIsOptionTheAnswer