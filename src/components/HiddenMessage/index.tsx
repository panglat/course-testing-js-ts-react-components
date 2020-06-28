import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.scss';

function Fade(props: any) {
  return (
    <CSSTransition unmountOnExit timeout={1000} classNames="fade" {...props} />
  );
}

const HiddenMessage: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((s) => !s);
  return (
    <div className="hidden-message">
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>{children}</div>
      </Fade>
    </div>
  );
};

export default HiddenMessage;
