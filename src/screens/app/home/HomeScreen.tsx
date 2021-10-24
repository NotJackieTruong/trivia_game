import { Block, ButtonPrimary, Text } from '#components';
import { ApiClient } from '#src/service/network/ApiService';
import { saveString } from '#src/service/storage';
import { colors, fonts, spacing } from '#src/theme';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import QuestionCard from './Components/QuestionCard';


interface HomeScreenProps { }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: colors.green.primary
  },
  questionsBlock: {
    backgroundColor: colors.green.primary
  },
  buttonSubmit: {
    marginHorizontal: 0,
  },
  resultContainer: {

  },
  resultText: {
    color: colors.white,
    ...fonts.bold20,
    textAlign: 'center',
    marginBottom: spacing.large
  }
})

const HomeScreen = ({ }: HomeScreenProps) => {
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState("")
  const [userAnswers, setUserAnswers] = useState("")
  const [result, setResult] = useState(false)
  const [showResultText, setShowResultText] = useState(false)

  const getMoreQuestion = () => {
    ApiClient.get('https://jservice.io/api/random').then((response: any) => {
      if (response && response.length > 0) {
        console.log({ response })
        setQuestion(response[0])
        setAnswers(response[0].answer)
        setShowResultText(false)
        saveString('Questions', JSON.stringify(response[0].answer))
      }
    })
  }

  const onSetUserAnswers = (data: string) => {
    setUserAnswers(data)
  }

  const onSubmit = () => {
    console.log('Answers: ', answers)
    if (userAnswers === answers) {
      setResult(true)
      setUserAnswers("")
      getMoreQuestion()
    } else {
      setResult(false)
    }
    setShowResultText(true)
  }

  useEffect(() => {
    getMoreQuestion()
  }, [])

  return (
    <Block
      style={styles.container}
      block
      paddingVertical={spacing.mediumPlush}
      paddingHorizontal={15}
    >
      {showResultText && <Block style={styles.resultContainer}>
        <Text style={styles.resultText}>{result ? 'Correct!' : 'Incorrect!'}</Text>
      </Block>}
      <Block
        style={styles.questionsBlock}>
        {question && <QuestionCard
          data={question}
          setUserAnswers={onSetUserAnswers}
          userAnswers={userAnswers}
        />}
      </Block>

      <ButtonPrimary
        title={"Submit"}
        style={styles.buttonSubmit}
        onPress={onSubmit}
      />
    </Block>
  );
};

export default HomeScreen;
