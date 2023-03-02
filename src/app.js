import React from 'react';
import { withFormik, Field, ErrorMessage, Form} from "formik";
import logotipo from './img/logo.png';

function MyForm(props){
    const{
        isSubmitting,
        isValid,
    } = props
    return(
        <Form>
            <img src={logotipo} alt="Logotipo" className="logo"></img>
            <div className="row">
                Cuál es tu correo electrónico?
                <Field type="email" name="email" className="input" placeholder="Pon su correo electrónico."/>
                <ErrorMessage name="email" />
            </div>
            <div className="row">
                Confirma el correo electrónico
                <Field type="email" name="confirmEmail" className="input" placeholder="Vuelva a escribir su correo electrónico"/>
                <ErrorMessage name="confirmEmail">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>
            <div className="row">
                Crea una contraseña
                <Field name="pwd" type="password" className="input" placeholder="Crea una contraseña"/>
                <progress id="file" max="100"></progress>
                <ErrorMessage name="pwd">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>
            <div className="row">
                Indica un nombre de usuario
                <Field type="text" name="username" className="input" placeholder="Como quieres que te llamemos?"/>
                <ErrorMessage name="username">
                    {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>
            <div className="row">
                <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                >Enviar</button>
            </div>
        </Form>
    )
}
export default withFormik({

    async validate(values){
        const errors = {};
        if (!values.email) {
            errors.email = 'El correo electrónico es obligatorio';
        }else if(!values.confirmEmail){
            errors.confirmEmail = 'El correo electrónico es obligatorio';
        }else if(values.email !== values.confirmEmail){
            errors.confirmEmail = 'Los correos electrónicos no coinciden';
        }
        if(!values.pwd){
            errors.pwd = 'La contraseña es obligatoria';
        }else if(values.pwd.length <= 8){
            if (values.pwd.length > 0) {
                switch (values.pwd.length) {
                    case 1:
                        document.getElementById('file').value = 12.5;
                        break;
                    case 2:
                        document.getElementById('file').value = 25;
                        break;
                    case 3:
                        document.getElementById('file').value = 37.5;
                        break;
                    case 4:
                        document.getElementById('file').value = 50;
                        break;
                    case 5:
                        document.getElementById('file').value = 62.5;
                        break;
                    case 6:
                        document.getElementById('file').value = 75;
                        break;
                    case 7:
                        document.getElementById('file').value = 87.5;
                        break;
                    case 8:
                        document.getElementById('file').value = 99.9;
                        break;
                    default:
                        break;
                }
            }
        }
        if(!values.username){
            errors.username = 'El nombre de usuario es obligatorio';
        }else if(values.username.length < 2){
            errors.username = 'El nombre de usuario debe tener al menos 2 caracteres';
        }
        return errors;

    },

    handleSubmit(values,formikBag){
        console.log(values);
        formikBag.setSubmitting(false);
    },

})(MyForm);
