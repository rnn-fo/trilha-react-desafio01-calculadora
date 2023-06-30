
import { ButtonContainer } from './styles';

const Button = ({label, onClick}) => {
    const style = label === '⌫'? {fontSize:23+'px'}:{}
    return (
      <ButtonContainer style={style} onClick={onClick} type="button">
       {label}
      </ButtonContainer>
    );
  }
  
  export default Button;