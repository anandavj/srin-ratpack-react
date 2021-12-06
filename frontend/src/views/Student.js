import { Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Fab } from '@mui/material'
import React, { useState, useEffect } from 'react'
import MajorService from "../services/MajorService"
import StudentService from "../services/StudentService"
import TableData from "../components/TableData"
import AddIcon from '@mui/icons-material/Add';

const Student = () => {

    // Variables
    const tableHeaders = [
        { field: "name", headerName: "Name", flex: 3 },
        {
            field: "major", headerName: "Major", flex: 2,
            valueGetter: (params) => {
                return params.value.name
            }
        }
    ]
    const studentObject = {
        id: "",
        name: "",
        email: "",
        semester: "",
        major: {
            id: "",
            name: ""
        }
    }
    const semesterList = [
        { id: 1, val: "Semester 1" },
        { id: 2, val: "Semester 2" },
        { id: 3, val: "Semester 3" },
        { id: 4, val: "Semester 4" },
        { id: 5, val: "Semester 5" },
        { id: 6, val: "Semester 6" },
        { id: 7, val: "Semester 7" },
        { id: 8, val: "Semester 8" },
    ]

    // State
    // Data
    const [majors, setMajors] = useState([])
    const [students, setStudents] = useState([])
    const [student, setStudent] = useState(studentObject)
    // Dialog Event
    const [dialog, setDialog] = useState(0)
    const [createDialog, setCreateDialog] = useState(false)
    const [updateDialog, setUpdateDialog] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)

    // =======

    // Use Effect Event
    // Init UseEffect
    useEffect(() => {
        getAllStudents()
        getAllMajors()
    }, [])
    useEffect(() => {
        if (dialog === 1) setCreateDialog(true)
        else if (dialog === 2) setUpdateDialog(true)
        else if (dialog === 3) setDeleteDialog(true)
    }, [dialog])
    // SetStudent Handler Function
    const handleStudentChance = (data) => {
        setStudent(data)
    }
    // Dialog Event Handler Function
    const handleDialog = (e) => {
        setDialog(e)
    }
    const handleDeleteDialog = () => {
        setDeleteDialog(false)
        setDialog(0)
        setStudent(studentObject)
    }
    const handleUpdateDialog = () => {
        setUpdateDialog(false)
        setDialog(0)
        setStudent(studentObject)
    }
    const handleCreateDialog = () => {
        setCreateDialog(false)
        setDialog(0)
        setStudent(studentObject)
    }
    // TextField Event Handler Function
    const handleTextFieldChange = (e) => {
        const val = e.target.value
        setStudent({
            ...student,
            [e.target.name]: val
        })
    }
    const handleTextFieldMajorChange = (e) => {
        const val = e.target.value
        const major = {...student.major,id:val}
        setStudent({
            ...student,
            major
        })
    }
    // Service Function
    const getAllMajors = () => {
        MajorService.getAllMajor()
            .then((res) => setMajors(res))
    }
    const getAllStudents = () => {
        StudentService.getAllStudents()
            .then((res) => setStudents(res))
    }
    const createStudent = () => {
        StudentService.createStudent(student)
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                handleCreateDialog()
                getAllStudents()
            })
    }
    const updateStudent = () => {
        StudentService.updateStudent(student)
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                handleUpdateDialog()
                getAllStudents()
            })
    }
    const deleteStudent = () => {
        StudentService.deleteStudent(student.id)
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                handleDeleteDialog()
                getAllStudents()
            })
    }

    return (
        <div>
            <Container maxwidth="xl" sx={{pt:4}}>
                <TableData header={tableHeaders} datas={students} dataHandler={handleStudentChance} dialogHandler={handleDialog}></TableData>
                
                {/* Create */}
                <Dialog open={createDialog} onClose={handleCreateDialog} maxWidth="md" fullWidth={true}>
                    <DialogTitle>Create New Student</DialogTitle>
                    <DialogContent>
                        <Box sx={{width:"100%"}}>
                        <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{my:2,width:"100%"}}
                                        label="Name"
                                        value={student.name || ""}
                                        name="name"
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{my:2,width:"100%"}}
                                        label="Email"
                                        value={student.email  || ""}
                                        name="email"
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{my:2,width:"100%"}}>
                                    <InputLabel id="demo-simple-select-standard-label">Semester</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Semester"
                                            value={student.semester  || ""}
                                            name="semester"
                                            onChange={handleTextFieldChange}
                                        >
                                            {semesterList.map((semester) => (
                                                <MenuItem key={semester.id} value={semester.id}>{semester.val}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{my:2,width:"100%"}}>
                                    <InputLabel id="demo-simple-select-standard-label">Major</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Major"
                                            value={student.major.id  || ""}
                                            name="major"
                                            onChange={handleTextFieldMajorChange}
                                        >
                                            {majors.map((major) => (
                                                <MenuItem key={major.id} value={major.id}>{major.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCreateDialog()}>No</Button>
                        <Button variant="contained" color="primary" onClick={() => createStudent()}>Yes</Button>
                    </DialogActions>
                </Dialog>

                {/* Update */}
                <Dialog open={updateDialog} onClose={handleUpdateDialog} maxWidth="md" fullWidth={true}>
                    <DialogTitle>Update Student Data</DialogTitle>
                    <DialogContent>
                        <Box sx={{width:"100%"}}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{my:2,width:"100%"}}
                                        label="Name"
                                        value={student.name  || ""}
                                        name="name"
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-basic"
                                        sx={{my:2,width:"100%"}}
                                        label="Email"
                                        value={student.email  || ""}
                                        name="email"
                                        onChange={handleTextFieldChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{my:2,width:"100%"}}>
                                    <InputLabel id="demo-simple-select-standard-label">Semester</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Semester"
                                            value={student.semester  || ""}
                                            name="semester"
                                            onChange={handleTextFieldChange}
                                        >
                                            {semesterList.map((semester) => (
                                                <MenuItem key={semester.id} value={semester.id}>{semester.val}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{my:2,width:"100%"}}>
                                    <InputLabel id="demo-simple-select-standard-label">Major</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Major"
                                            value={student.major.id  || ""}
                                            name="major"
                                            onChange={handleTextFieldMajorChange}
                                        >
                                            {majors.map((major) => (
                                                <MenuItem key={major.id} value={major.id}>{major.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleUpdateDialog()}>No</Button>
                        <Button variant="contained" color="primary" onClick={() => updateStudent()}>Yes</Button>
                    </DialogActions>
                </Dialog>

                {/* Delete */}
                <Dialog open={deleteDialog} onClose={handleDeleteDialog}>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogContent id="alert-dialog-title">
                        <DialogContentText id="alert-dialog-description">
                            Are You Sure You Want to Delete User {student.name} - ID {student.id}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleDeleteDialog()}>No</Button>
                        <Button variant="contained" color="error" onClick={() => deleteStudent()}>Yes</Button>
                    </DialogActions>
                </Dialog>
                <Fab onClick={() => handleDialog(1)} color="primary" aria-label="add" sx={{height:80, width:80,position:'fixed', bottom:50, right:50}}>
                    <AddIcon sx={{height:50, width:50}} />
                </Fab>
            </Container>
        </div>
    )
}

export default Student
