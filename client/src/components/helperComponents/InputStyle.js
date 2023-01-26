const InputNewActivity = ({classes, min, step, inputId, inputClass, inputName, label, required, inputType, inputPlaceholder, onChange, checked}) =>{
    return(
            <div className={classes}>
                <label htmlFor={inputId}>{label}</label>
                <input 
                    type={inputType} 
                    name={inputName? inputName : inputId} 
                    id={inputId}
                    placeholder={inputPlaceholder}
                    onChange={onChange}
                    checked ={checked}
                    required={required}
                    className={inputClass}
                    step={step}
                    min={min}
                />
            </div>
    )
}
export default InputNewActivity