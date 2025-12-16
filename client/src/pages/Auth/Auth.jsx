import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import DefultInput from '../../component/Forms/DefultInput';
import Button from '../../component/Buttons/Button';
import bgimage from '../../assets/Login.webp'

const Auth = () => {
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(false);
    const { login } = useAuth()
    const [successattempt, setsuccessattempt] = useState(false)

    const { values, handleChange } = useForm({
        email: '',
    });

    const headleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post('/auth/auth', values, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.data.success) {
                login(res.data.token);
            }
            else {
                alert(res.data.error)
            }
        }
        catch (err) {
            alert(res.data.error)
        }
    }

    const headleVerifyPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post('/auth/auth', values, {
                headers: { "Content-Type": "application/json" },
            });
        }
        catch (err) {
            alert(res.data.error)

        }
    }

    return (
        <div className='bg-gray-50 min-h-screen pt-24'
            style={{
                backgroundImage: `url(${bgimage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="md:mx-auto md:max-w-md mx-4 bg-white shadow-md rounded-lg p-8 border-gray-200">
                <div className="border-b pb-4 border-gray-200">
                    <h1 className="text-gray-500 font-semibold text-xl">Welcome to Travel System</h1>
                    <p className="text-gray-500 pt-1">
                        This system is designed to manage your travel plans and all related travel needs in one place.
                        It uses a secure password-less login method, so you don’t have to worry about remembering passwords.
                        Each time you log in, a unique one-time password is sent to your email.
                        This password expires immediately after use and cannot be reused for future logins.
                    </p>

                </div>

                <div className="mt-4">
                    <form onSubmit={headleAuth} method="post">
                        <DefultInput
                            type='email'
                            name={'email'}
                            value={values.email}
                            onChange={handleChange}
                            placeholder={"Enter Your Email Address"}
                            required
                        />

                        <div className="mt-4">
                            <Button
                                type='submit'
                                color='#238636'
                                label='Request Password'
                            />
                        </div>
                    </form>
                </div>
                <p className="text-center mt-2 text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} - Travel Management System
                </p>
            </div>

        </div>
    )
}

export default Auth