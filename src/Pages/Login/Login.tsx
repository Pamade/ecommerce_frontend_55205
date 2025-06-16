import React, { useState, FormEvent } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { API_SERVER } from '../../main';
import { useUserContext } from '../../context/UserContext';
// Define the login credentials interface
interface LoginCredentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
  const [loginError, setLoginError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {fetchUserData} = useUserContext();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    
    if (errors[name as keyof LoginCredentials]) {
      setErrors({ ...errors, [name]: '' });
    }

    
    if (loginError) {
      setLoginError('');
    }
  };

  
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};
    
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {

        const response = await axios.post(`${API_SERVER}/auth/login`, formData)
        console.log(response)
        const token = response.data.access_token
        token && localStorage.setItem("access_token", token)
        console.log('Login attempt with credentials:', formData);
        fetchUserData(token)
        setTimeout(() => {
          navigate("/")
        }, 1000)
        
        
      } catch (error : any) {
        if (!error.response) {
            setLoginError("Server Error")
          } else return setLoginError(error.response.data.error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <h2 className={styles.title}>Sign in to your account</h2>
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          {loginError && (
            <div className={styles.errorMessage}>
              <div className={styles.errorContent}>
                <div className={styles.errorIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={styles.errorText}>
                  <p>{loginError}</p>
                </div>
              </div>
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email address
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && (
                  <p className={styles.errorText}>{errors.email}</p>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordHeader}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                {/* <div className={styles.forgotPassword}>
                  <a href="#" className={styles.link}>
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                />
                {errors.password && (
                  <p className={styles.errorText}>{errors.password}</p>
                )}
              </div>
            </div>

            <div className={styles.rememberMe}>
              <div className={styles.checkbox}>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={styles.checkboxInput}
                />
                {/* <label htmlFor="remember-me" className={styles.checkboxLabel}>
                  Remember me
                </label> */}
              </div>
            </div>

            <div className={styles.formGroup}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.button} ${isSubmitting ? styles.buttonDisabled : ''}`}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className={styles.registerLink}>
              <Link to="/register" className={styles.link}>
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;