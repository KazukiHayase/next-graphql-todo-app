import React, { useCallback, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import axios from "axios";

type Todo = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  description: string;
  user_id: string;
}

const endpoint = 'http://localhost:8888/v1/graphql';

const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret": "secret",
};

const getQuery = {
  "operationName": "FetchTasks",
  "query": `query FetchTasks { tasks { id name description created_at updated_at user_id } }`,
  "variables": {}
};

const IndexPage = () => {
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState<string>('');
  const [todoGroup, setTodoGroup] = useState<Array<Todo>>([]);

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setNewTodo('');
    setOpen(false);
  }

  useEffect(() => {
    getTodo();
  }, [])

  useEffect(() => {
    setTodoGroup(todoGroup);
  }, [todoGroup]);

  const getTodo = () => {
    axios(
      {
        url: endpoint,
        method: 'post',
        headers: headers,
        data: getQuery,
      })
      .then((res) => {
        setTodoGroup(res.data.data.tasks)
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  const updateTodo = (todo: Todo) => { console.dir(todo); };

  const deleteTodo = (todo: Todo) => { console.dir(todo); };

  const createTodo = () => {
    // const tmp: Todo = {
    //   id: null,
    //   todo: newTodo,
    //   update: true,
    //   delete: true,
    // };
    // todoGroup.push(tmp);
    // count++; // 後で状態管理にする
    // axios.post('/api/rest/tasks', tmp)
    // .then((res) => {
    //   console.log(res);
    // });
    // closeModal();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  return (
    <>
      <div>一覧</div>
      <div>
        <Button
          variant="contained"
          onClick={openModal}
        >新規作成
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
              <TableRow
                key={todo.id}
              >
                <TableCell component="th" scope="todo">
                  {todo.name}
                </TableCell>
                <TableCell>
                  {todo.created_at}
                </TableCell>
                <TableCell>
                  {todo.updated_at}
                </TableCell>
                <TableCell>
                  {todo.description}
                </TableCell>
                <TableCell>
                  {todo.user_id}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => updateTodo(todo)}
                  >更新
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => deleteTodo(todo)}
                  >削除</Button>
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
            name="newTodo"
            type="text"
            fullWidth
            variant="standard"
            value={newTodo}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={createTodo}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default IndexPage
