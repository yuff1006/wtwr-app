import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

/**
 * The **Login** component will let registered users signin to the web application.
 *
 *  @author [Shraddha](https://github.com/5hraddha)
 */
const Login = ({
  isOpen,
  onClose,
  onSubmit,
  setLoginEmail,
  setLoginPassword,
}) => {
  const { values, isValid, errors, handleChange, resetForm } = useFormAndValidation([
    'login-email',
    'login-password',
  ]);

  const formRef = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(formRef.current.checkValidity());
  }, [isOpen, formRef]);

  // Reset form values every time the popup opens
  useEffect(() => {
    const initialValues = {
      'login-email': '',
      'login-password': '',
    };
    setLoginEmail('');
    setLoginPassword('');
    resetForm({ ...initialValues }, { ...initialValues }, true);
  }, [isOpen, resetForm, setLoginEmail, setLoginPassword]);

  // Event Handlers
  const handleFormChange = () => setIsFormValid(formRef.current.checkValidity());

  const handleInputChange = (e) => handleChange(e);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isValid || (values['login-email'] && values['login-password'])) {
      setLoginEmail(values['login-email']);
      setLoginPassword(values['login-password']);
      onSubmit({ loginEmail: values['login-email'], loginPassword: values['login-password'] });
    }
  };

  // Set form elements classnames
  const setInputLabelClassName = (name, isRequired) =>
    `form__input-label ${isRequired && `form__input-label_required`} ${(!isValid && errors[name]) && `form__input-label_error`}`;
  const setInputClassName = (name) => `form__input ${(!isValid && errors[name]) && `form__input_error`}`;
  const setErrorClassName = (name) => `form__error ${(!isValid && errors[name]) && `form__error_visible`}`;

  const submitButtonClassName = `form__submit-button form__submit-button_rel_login ${!isFormValid && 'form__submit-button_disabled'
    }`;

  return (
    <ModalWithForm
      ref={formRef}
      formTitle="Log in"
      name="login"
      position="top-right"
      width="normal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
    >
      <div className="form__input-container">
        <div className="form__input-label-container">
          <label htmlFor="login-email" className={setInputLabelClassName('login-email', true)}>
            Email
          </label>
          <p id="login-email-error" className={setErrorClassName('login-email')}>
            {(errors['login-email']) && '(this is not a valid email address)'}
          </p>
        </div>
        <input
          type="email"
          id="login-email"
          name="login-email"
          placeholder="Email"
          className={setInputClassName('login-email')}
          value={values['login-email']}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form__input-container">
        <div className="form__input-label-container">
          <label htmlFor="login-password" className={setInputLabelClassName('login-password', true)}>
            Password
          </label>
          <p id="login-password-error" className={setErrorClassName('login-password')}>
            {(errors['login-email']) && '(this is not a valid password)'}
          </p>
        </div>
        <input
          type="password"
          id="login-password"
          name="login-password"
          placeholder="Password"
          className={setInputClassName('login-password')}
          value={values['login-password']}
          minLength="8"
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form__button-grp">
        <button
          type="submit"
          className={submitButtonClassName}
          disabled={!isFormValid}
          aria-label="Log in"
        >
          Log in
        </button>
        <p>or</p>
        <button type="button" className="form__secondary-button" aria-label="Register">
          Register
        </button>
      </div>
    </ModalWithForm >
  );
};

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setLoginEmail: PropTypes.func.isRequired,
  setLoginPassword: PropTypes.func.isRequired,
}

export default Login;
