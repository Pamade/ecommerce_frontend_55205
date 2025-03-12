import React, { useState, FormEvent } from 'react';
import styles from './Register.module.scss';
import { Link } from 'react-router';
import axios from 'axios';
import { API_SERVER } from '../../main';
// Define the user registration interface based on your Java model
interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword:string;
  phoneNumber: string; // Using string for form handling despite being int in backend
  city: string;
  address: string;
}

interface Errors extends Partial<UserRegistration> {
  other?:string
}

const Register: React.FC = () => {
  
// Initialize form state with empty values
  const [formData, setFormData] = useState<UserRegistration>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword:'',
    phoneNumber: '',
    city: '',
    address: '',
  });


  // Error state for validation
  const [errors, setErrors] = useState<Errors>({} as Errors);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing in a field
    if (errors[name as keyof UserRegistration]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: Partial<UserRegistration> = {};
    
    const  setErrorForField = (field:keyof UserRegistration, minSize:number, maxSize:number) => {
      

      const fieldError = (message:string) => {
       return newErrors[field] = field.split("").map((l, i) => {
          if (i === 0 ) return l.toUpperCase();
          if (l.toUpperCase() === l) {
            return " " + l;
          } else return l;
        }).join("") + message;

      }
    if (!formData[field].trim()) {
      fieldError("Cannot be empty")
    } else if (formData[field].length > maxSize || formData[field].length < minSize) {
      fieldError(` must contain ${minSize} to ${maxSize} characters`)
    }
  }

    setErrorForField("firstName", 2, 35)
    setErrorForField("lastName", 2, 35)
    setErrorForField("password", 8, 100)
    setErrorForField("city", 2, 35)
    setErrorForField("address", 2, 50)

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must contain only digits';
    } else if (formData.phoneNumber.length > 15) {
      newErrors.phoneNumber = 'Phone number cannot exceed 15 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email cannot exceed 100 characters';
    }

    if (!formData.repeatPassword.trim()) {
      newErrors.repeatPassword = 'Repeat password is required';
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    } 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false)
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await axios.post(`${API_SERVER}/auth/register`, formData)
        setSubmitSuccess(true);

        
        // Reset form after successful submission
        // setFormData({
        //   firstName: '',
        //   lastName: '',
        //   email: '',
        //   password: '',
        //   phoneNumber: '',
        //   city: '',
        //   address: '',
        // });
      } catch (error : any) {
        
        if (!error.response) {
          setErrors({other:"Server Error"})
        } else return setErrors(error.response.data);
        
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <h2 className={styles.title}>Create your account</h2>
      </div>
      
      <div className={styles.formWrapper}>
        
        <div className={styles.formContainer}>
          {errors.other && <p className={styles.error}>Server error</p>}
          {submitSuccess && (
            <div className={styles.successMessage}>
              <div className={styles.successContent}>
                <div className={styles.successIcon}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={styles.successText}>
                  <p>Registration successful! You can now log in.</p>
                </div>
              </div>
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First name
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    maxLength={35}
                  />
                  {errors.firstName && (
                    <p className={styles.errorText}>{errors.firstName}</p>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last name
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                    maxLength={35}
                  />
                  {errors.lastName && (
                    <p className={styles.errorText}>{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

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
                  maxLength={100}
                />
                {errors.email && (
                  <p className={styles.errorText}>{errors.email}</p>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  maxLength={100}
                />
                {errors.password && (
                  <p className={styles.errorText}>{errors.password}</p>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="repeatPassword" className={styles.label}>
                Repeat Passwordd
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  required
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.repeatPassword ? styles.inputError : ''}`}
                  maxLength={100}
                />
                {errors.repeatPassword && (
                  <p className={styles.errorText}>{errors.repeatPassword}</p>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber" className={styles.label}>
                Phone number
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.phoneNumber ? styles.inputError : ''}`}
                  maxLength={15}
                />
                {errors.phoneNumber && (
                  <p className={styles.errorText}>{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.label}>
                City
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                  maxLength={35}
                />
                {errors.city && (
                  <p className={styles.errorText}>{errors.city}</p>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>
                Address
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                  maxLength={50}
                />
                {errors.address && (
                  <p className={styles.errorText}>{errors.address}</p>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.button} ${isSubmitting ? styles.buttonDisabled : ''}`}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>

            <div className={styles.loginLink}>
              <Link className={styles.link} to="/login"> 
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;