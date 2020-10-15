import { csv } from "../data/criteria"

export const createDataFromCsv = () => {
    const [namesLine, ...criteriaLines] = csv.split("\n");
    const [,,...names] = namesLine.split(",");
    const questionsList = [];
    const answersList = names.map((name) => { return { name, criteria: [], anticriteria:[]}});
    
    for(let criteriaLine of criteriaLines) {
        const [question, id, ...criteria] = criteriaLine.split(",");
        questionsList[id] = question;
        criteria.forEach((criterium, index) => {
            if (criterium === "1") {
                answersList[index].criteria.push(id)
            } else {
                answersList[index].anticriteria.push(id)
            }
        })
    }

    return {
        questionsList,
        answersList,
    }
}