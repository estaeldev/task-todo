import { LoadingButton } from '@mui/lab';
import { Alert, Box, Typography } from "@mui/material";
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FC, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ICoursesData, ICoursesErrorData } from "shared/interfaces";
import { CoursesServices } from "shared/services";
import * as Yup from "yup";
import { TextInput } from '../form';

interface IFormData {
    newTodo: string
}

const formValidate: Yup.ObjectSchema<IFormData> = Yup.object().shape({
    newTodo: Yup.string().trim().required("O campo é obrigatório!")
})

type TTodoFormProps = {
    isLoadingData?: boolean
}

export const TodoForm: FC<TTodoFormProps> = ({isLoadingData}) => {

    const {mutate, isLoading, error, isError} = useMutation<
        ICoursesData, 
        ICoursesErrorData, 
        Omit<ICoursesData, "id">
        >((todoToCreate) => CoursesServices.create(todoToCreate))
    
    const formRef = useRef<FormHandles>(null)
    const queryClient = useQueryClient()

    const handleClick = async (data: IFormData) => {
        await formValidate.validate(data, {abortEarly: false})
        .then(data => {
            mutate({content: data.newTodo, done: false}, {onSuccess: () => queryClient.refetchQueries("findAll")})
            formRef.current?.reset()
        }).catch((error: Yup.ValidationError) => {
            error.inner.forEach(error => {
                formRef.current?.setFieldError(error.path ?? "", error.message)
            })
        })

    }

    return (
        <>
            {isError && (
                <Alert severity="error">
                    <Typography>{error?.message}</Typography>
                </Alert>
            )}

            <Form onSubmit={handleClick} ref={formRef}>
                <Box display="flex" flexDirection="column" marginBottom={1}>
                    <TextInput name='newTodo' type='text' disabled={isLoading || isLoadingData} />
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <LoadingButton 
                        type='submit'
                        variant="contained" 
                        disabled={isLoading || isLoadingData}
                        loading={isLoading}>
                        Add New Todo
                    </LoadingButton>
                </Box>
            </Form>
        </>
    )

}
