import React from 'react'
import DefultInput from '../../component/Forms/DefultInput'
import DateInput from '../../component/Forms/DateInput'
import DropDown from '../../component/Forms/DropDown'
import TextArea from '../../component/Forms/TextArea'
import Button from '../../component/Buttons/Button'

const FormTest = () => {
    const options = [
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" },
    ];
    return (
        <div className='mx-auto max-w-4xl mt-20'>
            <DefultInput
                placeholder={"Enter Your Email Address"}
            />

            <p className="text-gray-500 text-sm mb-1 mt-4">BirthDay</p>
            <DateInput
            />

            <div className="mt-4"></div>
            <DropDown
                options={options}
            />

            <div className="mt-4"></div>
            <TextArea 
                placeholder='Enter Your Bio'
            />

            <Button 
                type='button'
                color='success'
                label='Click me'
            />


        </div>
    )
}

export default FormTest