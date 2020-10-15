import React, { useState } from 'react';
import styled from 'styled-components';
import { createDataFromCsv } from './util/util';

export const AkinatotemGame = () => {

     const { answersList: answers, questionsList: questions } = createDataFromCsv()

    const getRandomCriteria = (candidates) => {
        const numberOfCandidates = candidates.length;
        const randomCandidateIndex = Math.floor(Math.random() * numberOfCandidates);

        const randomCandidate = candidates[randomCandidateIndex];

        const numberOfCriteria = randomCandidate.criteria.length;
        if(numberOfCriteria) {
            const randomCriteriaIndex = Math.floor(Math.random() * numberOfCriteria);
            return randomCandidate.criteria[randomCriteriaIndex];
        } else {
            const numberOfAnticriteria = randomCandidate.anticriteria.length;
            const randomAnticriteriaIndex = Math.floor(Math.random() * numberOfAnticriteria);
            return randomCandidate.anticriteria[randomAnticriteriaIndex];
        }
    }

    const [remainingCandidates, setRemainingCandidates] = useState(answers);
    const [currentCriteria, setCurrentCriteria] = useState(getRandomCriteria(answers));
    const [questionsAsked, setQuestionsAsked] = useState([]);

    const answer_types = {
        yes: 'Oui',
        no: 'Non',
        maybe: 'Je ne sais pas'
    };

    const resetGame = () => {
        setRemainingCandidates(answers);
        setCurrentCriteria(getRandomCriteria(answers));
        setQuestionsAsked([]);
    }

    const updateCriteria = (candidates) => {
        const randomCriteria = getRandomCriteria(candidates);
        setCurrentCriteria(randomCriteria);
    };

    const handleAnswer = (type) => {
        let filteredCandidates = [...remainingCandidates];
        if (type === answer_types.yes) {
            filteredCandidates = remainingCandidates.filter((candidate) => candidate.criteria.includes(currentCriteria));
        }
        if (type === answer_types.no) {
            filteredCandidates = remainingCandidates.filter((candidate) => candidate.anticriteria.includes(currentCriteria));
        }
        const candidatesWithFilterCriteria = filteredCandidates.map((candidate) => {
            const updatedCriteria = candidate.criteria.filter(criteria => criteria !== currentCriteria);
            const updatedAnticriteria = candidate.anticriteria.filter(anticriteria => anticriteria !== currentCriteria);
            return { ...candidate, criteria: updatedCriteria, anticriteria: updatedAnticriteria};
        })
        const possibleCandidates = candidatesWithFilterCriteria.filter((candidate) => candidate.criteria.length || candidate.anticriteria.length);
        setRemainingCandidates(possibleCandidates);
        if (possibleCandidates.length > 1) {
            updateCriteria(possibleCandidates);
        }
        setQuestionsAsked([...questionsAsked, { question: questions[currentCriteria], answer: type}])
    };

    const hasFoundFinalResult = remainingCandidates.length === 1;
    const hasFailed = !remainingCandidates.length;

    if (hasFailed) {
        return (<Container>
            <Question>Désolé, on n'a pas trouvé <span role="img" aria-label="Emoji embêté">😕</span></Question>
            <Option onClick={() => resetGame()}>Recommencer</Option>
        </Container>);
    }

    if (hasFoundFinalResult) {
        return (<Container>
            <Question><span role="img" aria-label="Boule de cristal">🔮</span>Je pense que c'est {remainingCandidates[0].name}</Question>
            <SumUp>
               {questionsAsked.map((item, index) => {
                return <QuestionContainer key={index}>
                    <QuestionItem>Cette personne {item.question}</QuestionItem>
                    <AnswerItem>{item.answer}</AnswerItem>
                </QuestionContainer>})}
            </SumUp>
            <Option onClick={() => resetGame()}>Recommencer</Option>
        </Container>);
    }

    const question = questions[currentCriteria];

    return (<Container>
        <Question>Cette personne {question}</Question>
        <Options>
            <Option onClick={() => handleAnswer(answer_types.yes)}>{answer_types.yes}</Option>
            <Option onClick={() => handleAnswer(answer_types.no)}>{answer_types.no}</Option>
            <Option onClick={() => handleAnswer(answer_types.maybe)}>{answer_types.maybe}</Option>
        </Options>
    </Container>)
}

const Container = styled.div`
    margin-top: 20px;
`;

const Question = styled.span`
    font-size: 40px;
`;

const Options = styled.div`
    display: flex;
    justify-content: center;
`;

const Option = styled.div`
    margin: 20px;
    padding: 10px;
    border-radius: 5px;
    background-color: #61dafb;
    cursor: pointer;
`;

const SumUp = styled.div`
    margin-top: 20px;
`;

const QuestionContainer = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
`;

const QuestionItem = styled.span`
    font-size: 16px;
`;

const AnswerItem = styled.span`
    font-size: 16px;
    margin-left: 30px;
`;