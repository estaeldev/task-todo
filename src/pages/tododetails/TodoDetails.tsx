import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Icon, LinearProgress, Skeleton, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { FC, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormRadioGroup, TextInput } from "shared/components/form";
import { ICoursesData, ICoursesErrorData } from "shared/interfaces";
import { CoursesServices } from "shared/services";
import * as Yup from "yup";

interface IFormData {
    content: string
    done: boolean
}

const formValidation: Yup.Schema<IFormData> = Yup.object().shape({
    content: Yup.string().trim().required("O campo é obrigatório"),
    done: Yup.boolean().required("O campo é obrigatório")
})

export const TodoDetails: FC = () => {

    const {id} = useParams()
    const {data, isLoading, error, isRefetching} = useQuery<
        ICoursesData, 
        ICoursesErrorData
        >(`getById-${id}`, () => CoursesServices.getById(Number(id)))
    const [isOpenRemoveDialog, setIsOpenRemoveDialog] = useState(false)
    const [isOpenEditDialog, setIsOpenEditDialog] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const mutateUpdate = useMutation(`update-${id}`, (data: ICoursesData) => CoursesServices.update(data))
    const mutateDelete = useMutation(`delete-${id}`, (id: number) => CoursesServices.remove(id))
    const queryClient = useQueryClient()
    const navigate = useNavigate()


    const handleSubmit = async (data: IFormData) => {
        await formValidation.validate(data, {abortEarly: false})
        .then(dataValidate => {
            mutateUpdate.mutate({id: Number(id), ...dataValidate}, {onSuccess: () => {
                queryClient.refetchQueries(`getById-${id}`)
                setIsOpenEditDialog(false)
            }})
        }).catch((error: Yup.ValidationError) => {
            error.inner.forEach(erro => {
                formRef.current?.setFieldError("content", erro.message)
            })
        })
    }

    const handleDelete = async () => {
        mutateDelete.mutate(Number(id), {onSuccess: () => {
            navigate("/home")
        }})
    }

    return (
        <Container>
            <Box display="flex" flexDirection="column" gap={4}>
                
                {error && (
                    <Alert severity="error">
                        <Typography>{error.message}</Typography>
                        <Typography>{error.code}</Typography>
                        <Typography>{error.response.status}</Typography>
                    </Alert>
                )}


                {isLoading && (
                    <Box >
                        <CircularProgress />
                        <Skeleton height={300} />
                    </Box>
                )}

                {data && (
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Button component={Link} to={"/home"} variant="outlined" startIcon={<Icon>home</Icon>}>
                                HOME
                            </Button>
                        </Grid>

                        <Grid item>
                            <Card>
                                {isRefetching && (<LinearProgress />)}
                                <CardHeader title={<Typography variant="h4">Details Todo</Typography>} />
                                <CardContent>
                                    <Typography variant="h6">ID: {data.id}</Typography>
                                    <Typography variant="h6">CONTENT: {data.content}</Typography>
                                    <Typography variant="h6">DONE: {data.done ? "TRUE" : "FALSE"}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Box width="100%" display="flex" justifyContent="space-between">
                                        <Button 
                                            variant="outlined"
                                            onClick={() => setIsOpenEditDialog(true)}
                                            >
                                            EDIT
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            onClick={() => setIsOpenRemoveDialog(true)}
                                            >
                                            REMOVER
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                )}

                {isOpenRemoveDialog && (
                    <Dialog open={isOpenRemoveDialog} onClose={() => mutateDelete.isLoading ? undefined : setIsOpenRemoveDialog(false)}>
                        <DialogTitle>Delete Action!!!</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Deseja Realmente Deletar ?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                variant="outlined" 
                                onClick={() => setIsOpenRemoveDialog(false)} 
                                disabled={mutateDelete.isLoading}
                                >
                                CLOSE
                            </Button>
                            <LoadingButton variant="contained" onClick={handleDelete} loading={mutateDelete.isLoading}>
                                YES
                            </LoadingButton>
                        </DialogActions>
                    </Dialog>
                )}

                {isOpenEditDialog && (
                    <Dialog open={isOpenEditDialog} onClose={() => mutateUpdate.isLoading ? undefined : setIsOpenEditDialog(false)} fullWidth > 
                        <Form onSubmit={handleSubmit} initialData={data} ref={formRef}>
                            <DialogTitle>Edition Action!!!</DialogTitle>
                            <DialogContent>
                                <Box display="flex" flexDirection="column" marginTop={1} gap={1}>
                                    <TextInput name="content" type="text" disabled={mutateUpdate.isLoading} />
                                    <FormRadioGroup name="done" disabled={mutateUpdate.isLoading} />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="outlined" onClick={() => setIsOpenEditDialog(false)}>CLOSE</Button>
                                <LoadingButton loading={mutateUpdate.isLoading} type="submit" variant="contained">SAVE</LoadingButton>
                            </DialogActions>
                        </Form>
                    </Dialog>
                )}
                

            </Box>
        </Container>
    )

}
