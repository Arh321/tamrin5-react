import { useId } from "react"



export const FormInput = ({
    onChange,
    onkey,
    type,
    classNameDiv,
    classNameInput,
    classNameLabel,
    value,
    placeHolder,
    subject
}) => {
    const id = useId()
    return(
        <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor={id}>{subject}</label>
            <input id={id} value={value} className={classNameInput} onChange={onChange} onKeyDown={onkey} type={type}  placeholder={placeHolder}/>
        </div>
    )
}