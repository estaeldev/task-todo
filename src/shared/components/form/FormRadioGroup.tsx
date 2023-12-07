import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useField } from "@unform/core"
import { FC, useEffect, useState } from "react"

type TFormRadioGroupProps = {
    name: string
    disabled?: boolean
}

export const FormRadioGroup: FC<TFormRadioGroupProps> = ({name, disabled}) => {

    const {fieldName, registerField, defaultValue} = useField(name)
    const [isTrue, setIsTrue] = useState(false)

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => isTrue,
            setValue: (_, value) => setIsTrue(value)
        })
    }, [fieldName, isTrue, registerField])

    return (
        <FormControl>
            <FormLabel>{name}</FormLabel>
            <RadioGroup row defaultValue={defaultValue}>
                <FormControlLabel 
                    value="false" 
                    control={<Radio />} 
                    label="False" 
                    disabled={disabled}
                    onChange={() => setIsTrue(false)} 
                />
                <FormControlLabel 
                    value="true" 
                    control={<Radio />} 
                    label="True" 
                    disabled={disabled}
                    onChange={() => setIsTrue(true)} 
                />
            </RadioGroup>
        </FormControl>

    )

}
