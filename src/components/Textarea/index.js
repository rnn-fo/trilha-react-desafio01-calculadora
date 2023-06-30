import { TextareaContainer } from './styles';

const Textarea = ({label}) => {
    return (
      <TextareaContainer disabled value={label}/>
    );
  }
  
  export default Textarea;