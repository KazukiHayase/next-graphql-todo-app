import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export type Todo = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  description: string;
  user_id: string;
};

export const restUrl = "http://localhost:8888/api/rest";

export const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret": "secret",
};

const IndexPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({ name: "", description: "" });
  const [todoGroup, setTodoGroup] = useState<Array<Todo>>([]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTodo();
  }, []);

  useEffect(() => {
    setTodoGroup(todoGroup);
  }, [todoGroup]);

  const getTodo = () => {
    axios({
      url: restUrl + "/tasks",
      method: "get",
      headers,
    })
      .then((res) => {
        setTodoGroup(res.data.tasks);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTodo = (todo: Todo) => {
    axios({
      url: restUrl + "/tasks/" + todo.id,
      method: "delete",
      headers,
    })
      .then(() => {
        getTodo();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createTodo = () => {
    axios({
      url: restUrl + "/tasks",
      method: "post",
      headers,
      data: JSON.stringify(newTodo),
    })
      .then((res) => {
        setTodoGroup([...todoGroup, res.data.addTask]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => closeModal());
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.value;
    setNewTodo({ ...newTodo, name });
  };

  const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const description: string = e.target.value;
    setNewTodo({ ...newTodo, description });
  };

  return (
    <>
      <div>一覧</div>
      <div>
        <Button variant="contained" onClick={openModal}>
          新規作成
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell>作成日</TableCell>
              <TableCell>更新日</TableCell>
              <TableCell>内容</TableCell>
              <TableCell>作成者</TableCell>
              <TableCell>更新</TableCell>
              <TableCell>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoGroup.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell component="th" scope="todo">
                  {todo.name}
                </TableCell>
                <TableCell>{todo.created_at}</TableCell>
                <TableCell>{todo.updated_at}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>{todo.user_id}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      router.push({
                        pathname: "/update/[id]",
                        query: { id: todo.id },
                      })
                    }
                  >
                    更新
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteTodo(todo)}>削除</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>新規TODO</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            label="タイトル"
            value={newTodo.name}
            onChange={changeName}
          />
          <TextField
            margin="dense"
            type="text"
            label="内容"
            fullWidth
            variant="standard"
            value={newTodo.description}
            onChange={changeDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={createTodo}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IndexPage;
