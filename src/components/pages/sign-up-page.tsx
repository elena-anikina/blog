import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../helpers/schemaFormValidation';
import classes from '../form/form.module.scss';
import Button from '../form/button';
import * as actions from '../../redux/actions';
import Checkbox from '../form/checkbox';
import { signUpLabels } from '../form/labels';
import BaseLayout from '../form/base-layout';

const SignUpPage = ({ signUpSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      checkbox: true,
    },
    mode: 'onChange',
    resolver: yupResolver(signUpSchema),
  });

  const navigate = useNavigate();
  const location: any = useLocation();
  const fromPage: any = location.state?.from?.pathname || '/';

  const inputs = signUpLabels.map((el: any) => {
    const style = {
      border: Object.prototype.hasOwnProperty.call(errors, el.label) ? '1px solid #F5222D' : '1px solid #D9D9D9',
    };
    const errorMessage = errors[el.label]?.message && (
      <span className={classes.errorText}>{errors[el.label].message}</span>
    );
    return (
      <div key={el.label} className={classes.form}>
        <label>
          {el.label}
          <input
            className={classes.input}
            placeholder={el.placeholder || el.label}
            style={style}
            {...register(el.label)}
          />
          <div className={classes.errorText}>{errorMessage}</div>
        </label>
      </div>
    );
  });

  const navFunc = () => navigate(fromPage);

  const onSubmit = (data) => {
    signUpSubmit(data, reset, navFunc);
  };

  return (
    <BaseLayout heading="Create new account">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {inputs}
        <Checkbox register={register} errors={errors} />
        <Button value="Create" />
        <span className={classes.additionalText}>
          Already have an account?&nbsp;<Link to="/sign-in">Sign In</Link>.
        </span>
      </form>
    </BaseLayout>
  );
};

SignUpPage.propTypes = {
  signUpSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ signUp }) => ({ signUp });

export default connect(mapStateToProps, actions)(SignUpPage);
