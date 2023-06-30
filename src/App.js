
import Input from './components/Input';
import Button from './components/Button';
import Textarea from './components/Textarea';

import { Container, Content, Row,Column} from './styles';
import { useState } from 'react';


const App = () => {
  const [history, setHistory] = useState('')
  const [currentNumber, setCurrentNumber] = useState('0');
  const [operation, setOperation] = useState('');

  const handleOnClear = () => {
    setCurrentNumber('0')
    setOperation('')
    setHistory('')
  };

  const handleBackspace = () =>{
    const numberBackspace = currentNumber !== '0' && currentNumber.length > 1 && !currentNumber.includes('-')? currentNumber.substring(0, currentNumber.length - 1) : '0'
    setCurrentNumber(numberBackspace)
  }

  const handleSignal = () => {
    const changeSignal = currentNumber === '0' ? currentNumber: currentNumber.includes('-') ? currentNumber.replace('-',''):`-${currentNumber}`
    setCurrentNumber(changeSignal)
  }

  const handleAdd = (element) => {

    element === "," && currentNumber.includes(element) ? element = '' : 
      currentNumber === '0' && element !== ","? setCurrentNumber(element) : setCurrentNumber(`${currentNumber}${element}`)
  }

  const handleOperation = (element) =>{
    operation === '' ? setOperation(element) : setOperation('')
  }

  const handleEqual = () => {
    if(operation !== ''){
      return
    }
    else if (currentNumber !== '0'){
      setHistory(previousValue => `${previousValue}\n${currentNumber}=${currentNumber}`)
    }

  }

  return (
    <Container>
      <Content>
        <Column>
          <Input value={currentNumber}/>
          <Button label="C" onClick={() => handleOnClear()}/>
          <Row>
            <Button label="x²" onClick={() => handleOperation('^')}/>
            <Button label="²√" onClick={() => handleOperation('√')}/>
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
            <Button label="," onClick={() => handleAdd(',')}/>
            <Button label="=" onClick={() => handleEqual()}/>
          </Row>
        </Column>
        <Column><Textarea label={history}/></Column>
        
      </Content>
    </Container>
  );
}

export default App;
