import React from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ERoutes } from '../../App';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useInput } from '../../hooks/useInput';
import {
  postLogout, postSignIn
} from '../../api/api';

const Login = () => {
  const navigate = useNavigate();
  const login = useInput('', {
    isEmpty: true,
    login: {
      isError: null,
      error: ''
    }
  });
  const password = useInput('', {
    isEmpty: true,
    password: {
      isError: null,
      error: ''
    }
  });

  const formMethod = {
    login: login.value,
    password: password.value,
  };
  // const [u, setU] = useState({});
  //
  // useEffect(() => {
  //   getUser().then((data) => setU(data));
  // }, []);
  //
  // console.log('122', u);

  const handleSubmit = () => {
    // e.preventDefault();

    postSignIn(formMethod).then();

    // const profile = await postSearchUser({ login: formMethod?.login });
    // const profile = await postSearchUser({ login: 'Testtt' });
    // console.log('profile', profile);

    // const profile = await postSearchUser(formMethod.login);

    navigate(ERoutes.PROFILE);

    // async postSignIn(formMethod)
    //   // eslint-disable-next-line no-console
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data === 'OK') {
    //       getUser().then((res) => setU(res));
    //       // console.log('ok');
    //       // setU(user);
    //     }
    //     navigate(ERoutes.PROFILE);
    //   })
    //   // eslint-disable-next-line no-console
    //   .catch((error: any) => console.log(`Ошибка ${error}`));
  };

  const handleLogout = (e: any) => {
    console.log(e);
    // e.preventDefault();
    postLogout()
      .then(() => {
        navigate(ERoutes.LOGIN);
      });
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Авторизация</h1>
        <div className='form__wrapper'>
          <Input className='form__input' name='login' type='text' placeholder='login'
                 value={login.value} onBlur={login.onBlur}
                 onChange={(e: HTMLInputElement) => login.onChange(e)}
                 isDirty={login.isDirty} isEmpty={login.isEmpty} isError={login.loginError}/>
        </div>
        <div className='form__wrapper'>
          <Input className='form__input' name='password' type='password' placeholder='password'
                 value={password.value} onBlur={password.onBlur}
                 onChange={(e: HTMLInputElement) => password.onChange(e)}
                 isDirty={password.isDirty} isEmpty={password.isEmpty}
                 isError={password.passwordError}/>
        </div>
        <Button type='submit' title='Войти' onClick={() => handleSubmit()}
                disabled={!login.inputValid || !password.inputValid}/>
      </form>
      <Link className='register' to={ERoutes.REGISTER}>Регистрация</Link>
      <Button type='button' title='Выход' onClick={(e:any) => handleLogout(e)}/>
    </div>
  );
};

export default Login;
