import React, {useState} from 'react';
import {create, act} from 'react-test-renderer';

function Button(props) {
  const [text, setText] = useState('');
  function handleClick() {
    setText("Proceed to Account");
  }
  return <button onClick={handleClick}>{text || props.text}</button>
}
 describe('Button componenet', () => {
   test('it shows the expected text when clicked', () => {
     let componenet;
     act(() => {
       componenet = create(<Button text='SUBSCRIBE TO BASIC' />);
     });
     const instance = componenet.root;
     const button  = instance.findByType("button");
     act(() => button.props.onClick());
     expect(button.props.children).toBe('Proceed to Account');
   });
 });