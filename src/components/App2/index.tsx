import React, { createContext, useState, useReducer, useContext } from 'react';
import {
  Link,
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { submitForm } from 'api';

const MultiPageForm = createContext<{
  form: any;
  setFormValues: any;
  resetForm: any;
}>({ form: undefined, setFormValues: undefined, resetForm: undefined });

const MultiPageFormProvider: React.FC<{
  initialValues: { food: string; drink: string };
}> = ({ initialValues = {}, ...props }) => {
  const [initState] = useState(initialValues);
  const [form, setFormValues] = useReducer(
    (s: any, a: any) => ({ ...s, ...a }),
    initState
  );
  const resetForm = () => setFormValues(initialValues);

  return (
    <MultiPageForm.Provider
      value={{ form, setFormValues, resetForm }}
      {...props}
    />
  );
};

function useMultiPageForm() {
  const context = useContext(MultiPageForm);
  if (!context) {
    throw new Error(
      'useMultiPageForm must be used within a MiltiPageFormProvider'
    );
  }
  return context;
}

const Main: React.FC = () => {
  return (
    <>
      <h1>Welcome home</h1>
      <Link to="page-1">Fill out the form</Link>
    </>
  );
};

const Page1: React.FC = () => {
  const { form, setFormValues } = useMultiPageForm();
  const history = useHistory();

  return (
    <>
      <h2>Page 1</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push('/page-2');
        }}
      >
        <label htmlFor="food">Favorite Food</label>
        <input
          id="food"
          value={form.food}
          onChange={(e) => setFormValues({ food: e.target.value })}
        />
      </form>
      <Link to="/">Go Home</Link> | <Link to="/page-2">Next</Link>
    </>
  );
};

const Page2: React.FC = () => {
  const { form, setFormValues } = useMultiPageForm();
  const history = useHistory();

  return (
    <>
      <h2>Page 2</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push('/confirm');
        }}
      >
        <label htmlFor="drink">Favorite Drink</label>
        <input
          id="drink"
          value={form.drink}
          onChange={(e) => setFormValues({ drink: e.target.value })}
        />
      </form>
      <Link to="/page-1">Go Back</Link> | <Link to="/confirm">Review</Link>
    </>
  );
};

const ConfirmPage: React.FC = () => {
  const { form, resetForm } = useMultiPageForm();
  const history = useHistory();

  function handleConfirmClick() {
    submitForm(form).then(
      () => {
        resetForm();
        history.push('/success');
      },
      (error) => {
        history.push('/error', { state: { error } });
      }
    );
  }

  return (
    <>
      <h2>Confirm</h2>
      <div>
        <strong>Please confirm your choices</strong>
      </div>
      <div>
        <strong id="food-label">Favorite Food</strong>:{' '}
        <span aria-labelledby="food-label">{form.food}</span>
      </div>
      <div>
        <strong id="drink-label">Favorite Drink</strong>:{' '}
        <span aria-labelledby="drink-label">{form.drink}</span>
      </div>
      <Link to="/page-2">Go Back</Link> |{' '}
      <button onClick={handleConfirmClick}>Confirm</button>
    </>
  );
};

const SuccessPage: React.FC = () => (
  <>
    <h2>Congrats. You did it.</h2>
    <div>
      <Link to="/">Go home</Link>
    </div>
  </>
);

const ErrorPage: React.FC<{ location: { state: { error: any } } }> = ({
  location: {
    state: { error },
  },
}) => (
  <>
    <div>Oh no. There was an error.</div>
    <pre>{error.message}</pre>
    <Link to="/">Go Home</Link>
    <Link to="/confirm">Try again</Link>
  </>
);

const App2: React.FC = () => (
  <MultiPageFormProvider initialValues={{ food: '', drink: '' }}>
    <Router>
      <Switch>
        <Route path="/page-1" component={Page1} />
        <Route path="/page-2" component={Page2} />
        <Route path="/confirm" component={ConfirmPage} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/error" component={ErrorPage} />
        <Route component={Main} />
      </Switch>
    </Router>
  </MultiPageFormProvider>
);

export default App2;
