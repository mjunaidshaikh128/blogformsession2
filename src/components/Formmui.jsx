import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';

const validationSchema = Yup.object({
    id: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    subtitle: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
  });

const Formmui = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = items.find((item) => newItem.id === item.id);
    console.log(isEdit);
    let updatedItems = [];
    if (isEdit && items.length > 0) {
      updatedItems = items.map((item) =>
        newItem.id === item.id ? { ...item, ...newItem } : item
      );

      setItems(updatedItems);
    } else {
      setItems([...items, newItem]);
    }
    setNewItem({
      id: "",
      title: "",
      subtitle: "",
      author: "",
    });
  };

  const handleEdit = (item) => {
    setNewItem(item);
  };

  const handleDelete = (item) => {
    const updatedItems = items.filter((it) => it.id !== item.id);
    setItems(updatedItems);
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Blog Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Id"
            variant="outlined"
            fullWidth
            margin="normal"
            name="id"
            value={newItem.id}
            onChange={(e) =>
                setNewItem({ ...newItem, id: e.target.value })}
          />
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={newItem.title}
            onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })}
          />
          <TextField
            label="Subtitle"
            variant="outlined"
            fullWidth
            margin="normal"
            name="subtitle"
            value={newItem.subtitle}
            onChange={(e) =>
                setNewItem({ ...newItem, subtitle: e.target.value })}
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            margin="normal"
            name="author"
            value={newItem.author}
            onChange={(e) =>
                setNewItem({ ...newItem, author: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </Box>

      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Blog List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Subtitle</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.subtitle}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(item)}
                      color="primary"
                      aria-label="edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item)}
                      color="secondary"
                      aria-label="delete"
                    >
                      <Delete />
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
};

export default Formmui;
