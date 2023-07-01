
import Input from './components/Input';
import Button from './components/Button';
import Label from './components/Label';
import Textarea from './components/Textarea';
import { Container, Content, Row,Column} from './styles';
import { useState,useEffect } from 'react';
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)


const App = () => {
  const [history, setHistory] = useState('')
  const [currentNumber, setCurrentNumber] = useState('0')
  const [currentValueMemory, setCurrentValueMemory] = useState('')

  useEffect(() => {
    if(currentValueMemory.includes('sqrt')){
      handleEqual()
    }
  }, [currentValueMemory]);

  const handleOnClear = () => {
    setCurrentNumber('0')
    setCurrentValueMemory('')
    setHistory('')
  };

  const handleBackspaceNegativeNumber = () =>{
    const numberBackspace = currentNumber.includes('-') && currentNumber.length > 2 ? currentNumber.substring(0, currentNumber.length - 1) : '0'
    return numberBackspace
  }

  const handleBackspace = () =>{
    const numberBackspace = currentNumber !== '0' && currentNumber.length > 1 && !currentNumber.includes('-')? currentNumber.substring(0, currentNumber.length - 1) : handleBackspaceNegativeNumber()
    setCurrentNumber(numberBackspace)
  }

  const handleSignal = () => {
    const changeSignal = currentNumber === '0' ? currentNumber: currentNumber.includes('-') ? currentNumber.replace('-',''):`-${currentNumber}`
    setCurrentNumber(changeSignal)
  }

  const handleAdd = (element) => {
    element === "." && currentNumber.includes(element) ? element = '' : 
      currentNumber === '0' && element !== "."? setCurrentNumber(element) : setCurrentNumber(`${currentNumber}${element}`)
  }

  const handleOperation = (element) =>{

    if(currentNumber !== '0'){
      if (element.includes('sqrt') && currentValueMemory === ''){
        setCurrentValueMemory(`${element}(${currentNumber})`)
      }
      else if (currentValueMemory === ''){
        currentNumber.includes('-')?setCurrentValueMemory(`(${currentNumber})${element}`):setCurrentValueMemory(`${currentNumber}${element}`)
        setCurrentNumber('0')
      }
      else{
        handleEqual()
      }
    }    
  }

  const handleEqual = () => {
    if(currentValueMemory.includes('sqrt')){
      const calculate = math.evaluate(currentValueMemory).toString()
      setCurrentNumber(calculate)
      currentValueMemory.includes('-')?setHistory(previousValue => `${previousValue}\n${currentValueMemory.replace('sqrt(','√(')}=${calculate}`):setHistory(previousValue => `${previousValue}\n${currentValueMemory.replace('sqrt(','√').replace(')','')}=${calculate}`)
    }
    else if(currentValueMemory.length > 1){
      const calculate = currentNumber.includes('-')?math.evaluate(`${currentValueMemory}(${currentNumber})`).toString():math.evaluate(`${currentValueMemory}${currentNumber}`).toString()
      currentNumber.includes('-')?setHistory(previousValue => `${previousValue}\n${currentValueMemory}(${currentNumber})=${calculate}`):setHistory(previousValue => `${previousValue}\n${currentValueMemory}${currentNumber}=${calculate}`)
      setCurrentNumber(calculate)
    }
    else if (currentNumber !== '0'){
      setHistory(previousValue => `${previousValue}\n${currentNumber}=${currentNumber}`)
    }
    setCurrentValueMemory('')
  }

  return (
    <Container>
      <Content>
        <Column>
          <Label label={currentValueMemory}/>
          <Input value={currentNumber}/>
          <Button label="C" onClick={() => handleOnClear()}/>
          <Row>
            <Button label="x²" onClick={() => handleOperation('^')}/>
            <Button label="²√" onClick={() => handleOperation('sqrt')}/>
            <Button label="÷" onClick={() => handleOperation('/')}/>
            <Button label="⌫" onClick={() => handleBackspace()}/>
          </Row>
          <Row>
            <Button label="7" onClick={() => handleAdd('7')}/>
            <Button label="8" onClick={() => handleAdd('8')}/>
            <Button label="9" onClick={() => handleAdd('9')}/>
            <Button label="x" onClick={() => handleOperation('*')}/>
          </Row>
          <Row>
            <Button label="4" onClick={() => handleAdd('4')}/>
            <Button label="5" onClick={() => handleAdd('5')}/>
            <Button label="6" onClick={() => handleAdd('6')}/>
            <Button label="-" onClick={() => handleOperation('-')}/>
          </Row>
          <Row>
            <Button label="1" onClick={() => handleAdd('1')}/>
            <Button label="2" onClick={() => handleAdd('2')}/>
            <Button label="3" onClick={() => handleAdd('3')}/>
            <Button label="+" onClick={() => handleOperation('+')}/>
          </Row>
          <Row>
            <Button label="+/-" onClick={() => handleSignal()}/>
            <Button label="0" onClick={() => handleAdd('0')}/>
            <Button label="." onClick={() => handleAdd('.')}/>
            <Button label="=" onClick={() => handleEqual()}/>
          </Row>
        </Column>
        <Column><Textarea label={history}/></Column>
        
      </Content>
    </Container>
  );
}

export default App;
