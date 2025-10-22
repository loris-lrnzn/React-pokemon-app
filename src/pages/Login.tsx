import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from "../services/authentificationService";
import type { FunctionComponent } from 'react'
type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
};
type Form = {
    email: Field,
    password: Field
}
const Login: FunctionComponent = () => {
    //Hook de navigation
    const navigate = useNavigate();
    //Hook de gestion du formulaire
    const [form, setForm] = useState<Form>({
        email: { value: '' },
        password: { value: '' },
    });
    //Hook de gestion des messages d'erreur ou d'information du formulaire
    const [message, setMessage] = useState<string>('Vous êtes déconnecté. (pikachu / pikachu123)');
//méthode de gestion des changements dans les champs du formulaire
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };
        setForm({ ...form, ...newField });
    }
    //méthode de validation du formulaire
    const validateForm = () => {
        let newForm: Form = form;
        // Validator email
        if (form.email.value.length < 3) {
            const errorMsg: string = 'Votre prénom doit faire au moins 3 caractères de long.';
            const newField: Field = {
                value: form.email.value, error: errorMsg,
                isValid: false
            };
            newForm = { ...newForm, ...{ email: newField } };
        } else {
            const newField: Field = {
                value: form.email.value, error: '',
                isValid: true
            };
            newForm = { ...newForm, ...{ email: newField } };
        }
        // Validator password
        if (form.password.value.length < 6) {
            const errorMsg: string = 'Votre mot de passe doit faire au moins 6 caractères de long.';
            const newField: Field = {
                value: form.password.value, error: errorMsg,
                isValid: false
            };
            newForm = { ...newForm, ...{ password: newField } };
        } else {
            const newField: Field = {
                value: form.password.value, error: '',
                isValid: true
            };
            newForm = { ...newForm, ...{ password: newField } };
        }
        setForm(newForm);
        return newForm.email.isValid && newForm.password.isValid;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //validation du formulaire
        const isFormValid = validateForm();
        if (isFormValid) {
            setMessage('👉 Tentative de connexion en cours ...');
            //appel du service d'authentification
            AuthenticationService.login(form.email.value,
                form.password.value).then(isAuthenticated => {
                    if (!isAuthenticated) {
                        setMessage('🔐 Identifiant ou mot de passe incorrect.');
                        return;
                    }
                    console.log('✅ Vous êtes maintenant connecté.');
                    navigate('/team');
                });
        }
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex justify-center
items-center h-screen">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        {message && (
                            <div className="bg-gray-100 border border-gray-400 text-gray-700
px-4 py-3 rounded relative">
                                {message}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email">
                            Identifiant
                        </label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-
3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.email.value}
                            onChange={handleInputChange}
                        />
                        {form.email.error && (
                            <div className="bg-red-100 border border-red-400 text-red-700
px-4 py-3 rounded relative mt-2">
                                {form.email.error}
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="shadow appearance-none border rounded w-full py-2 px-
3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={form.password.value}
                            onChange={handleInputChange}
                        />
                        {form.password.error && (
                            <div className="bg-red-100 border border-red-400 text-red-700
px-4 py-3 rounded relative">
                                {form.password.error}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold
py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Valider
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default Login;