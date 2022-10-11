# React Native Mazic Components

This package is created for my personal use, but if you find it helpful, I will be very happy. This package is aimed to provide custom React Native Components.

## Custom Text Input

### Uses Example 

```js
function anyFunction(){
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(true);
  const [mobile, setMobile] = useState('');
  const [mobErr, setMobErr] = useState(true);
  .......
  .......
  return(<View>
        <MazicTextInput
        value={mobile}
        setValue={setMobile}
        err={mobErr}
        setErr={setMobErr}
        placeholder="Mobile No"
        validation={['no-space', 'only-digits', 'min', 'max']}
        min={10}
        max={10}
      />
      <MazicTextInput
        value={email}
        setValue={setEmail}
        err={emailErr}
        setErr={setEmailErr}
        placeholder="Email"
        validation={['valid-email']}
      />
      <MazicButton
        title={'SUBMIT'}
        onPressFn={onSubmitPress}
        disabled={emailErr || mobErr}
      />
  </View>)
}
```
In the above example at the beginning we have set the error to true. Means we are assuming that the text input has not passed validation. The validations that you want to execute can be mentioned in an array as in example.

### Validation Details

- no-space: the input can not contain spaces
- only-digits: the input can contain only numbers from 0 to 9
- only-letters: the input can not contain any letters from 0 to 9
- max: the maximum number of letters to be accepted as input. For this you have to pass value for `max` other wise the default max value is 30.
- min: the minimum number of letters to be accepted as input. For this you have to pass value for `min` other wise the default min value is 3.
- valid-email: the input should be a valid email address