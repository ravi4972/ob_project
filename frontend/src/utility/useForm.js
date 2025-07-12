import { useState } from "react";

function useForm(initialValue){
    const [formValue, setFormValue] = useState(initialValue)
    function handleOnChange(e){
        e.preventDefault()
        const {name,value} = e.target
        setFormValue((prev)=>{
            return(
                {...prev,[name]:{description:prev[name].description,value}}
            )
        })
    }

    function handleOnReset(){
        setFormValue(initialValue)
    }

    return {formValue,handleOnChange,handleOnReset,setFormValue}
}

export default useForm