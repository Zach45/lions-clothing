import React from 'react'; 

import './form-input.styles.scss'

const FormInput = ({ handleChange, label, ...otherPorps}) => (
    <div className="group">
        <input className="form-input" onChange={handleChange} {...otherPorps} />
        {
            label ? 
            (<label className={`${otherPorps.value.length ? 'shrink' : ''}  form-input-label`}>
                {label}
            </label>)
            : null

        }
    </div>
)

export default FormInput