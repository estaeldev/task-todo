import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, Icon, LinearProgress, Skeleton, Typography } from "@mui/material";
import { FC } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { TodoForm } from "shared/components";
import { ICoursesData, ICoursesErrorData } from "shared/interfaces";
import { CoursesServices } from "shared/services";

export const Home: FC = () => {
    
    const {data, error, isLoading, isFetching} = useQuery<ICoursesData[], ICoursesErrorData>("findAll", () => CoursesServices.getAll())

    return (
       
        <Box display="flex" flexDirection="column" gap={4}>

            {error && (
                <Alert severity="error">
                    <Typography>{error.message}</Typography>
                    <Typography>{error.code}</Typography>
                    <Typography>{error.response.status}</Typography>
                </Alert>
            )}
            
            <TodoForm isLoadingData={isLoading} />

            {isLoading && (
                <Box>
                    <CircularProgress />
                    <Grid container>
                        {[0].map(item => (
                            <Grid key={item} item xs={12}>
                                <Skeleton height={100} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            
            <Grid container spacing={2}>
                {isFetching ? <Grid item xs={12}> <LinearProgress /> </Grid> : undefined}

                {data?.slice().reverse().map(course => (
                    <Grid item key={course.id} xs={12} sm={6} xl={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" display="flex" alignItems="center">
                                    {course.done ? <Icon color="primary">check_circle</Icon> : undefined} 
                                    {course.content}
                                </Typography>
                            </CardContent>
                            
                            <CardActions>
                                <Box width="100%" display="flex" justifyContent="flex-end">
                                    <Button component={Link} to={`/todo/details/${course.id}`}>Edit</Button>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Box>
       
    )

}
