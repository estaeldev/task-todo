import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { FC, useEffect, useRef } from "react";


type TTextInputProps = {
    name: string
} & TextFieldProps

export const TextInput: FC<TTextInputProps> = ({name, ...rest}) => {

    const {fieldName, registerField, error, clearError, defaultValue} = useField(name)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value"
        })
    }, [fieldName, registerField])

    return (
        <TextField 
            inputRef={inputRef}
            label={name}
            helperText={error} 
            error={!!error}
            defaultValue={defaultValue}
            onKeyDown={() => error ? clearError() : undefined}
            {...rest}
        />
    )

}
