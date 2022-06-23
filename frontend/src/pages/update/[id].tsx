import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { restUrl, headers, Todo } from "../index";
import { Button, TextField, Box } from "@mui/material";

const UpdatePage = () => {
  const router = useRouter();
  const [updateParam, setUpdateParam] = useState({
    name: "",
    description: "",
  });
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    name: "",
    created_at: "",
    updated_at: "",
    description: "",
    user_id: "",
  });

  useEffect(() => {
    getTaskById(router.query.id);
  }, [router.query.id]);

  useEffect(() => {
    // setUpdateParam()
    console.dir(updateParam);
  }, [updateParam]);

  const getTaskById = (id) => {
    axios({
      url: restUrl + "/tasks/" + id,
      method: "get",
      headers,
    })
      .then((res) => {
        setTodo(res.data.task);
        setUpdateParam({
          name: res.data.task.name,
          description: res.data.task.description,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeName = (e) => {
    setUpdateParam({ ...updateParam, name: e.target.value });
  };

  const changeDescription = (e) => {
    setUpdateParam({ ...updateParam, description: e.target.value });
  };

  const update = () => {
    axios({
      url: restUrl + "/tasks/" + todo.id,
      method: "put",
      headers,
      data: JSON.stringify({
        taskId: todo.id,
        name: updateParam.name,
        description: updateParam.description,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          alert("更新しました");
          router.push("/");
        } else {
          alert("更新に失敗しました");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Box>
        <TextField
          id="name"
          autoFocus
          margin="dense"
          type="text"
          variant="standard"
          label="タイトル"
          value={updateParam.name}
          onChange={changeName}
        />
        <TextField
          autoFocus
          margin="dense"
          type="text"
          variant="standard"
          label="内容"
          value={updateParam.description}
          onChange={changeDescription}
        />
        <Button onClick={update}>更新</Button>
      </Box>
    </>
  );
};

export default UpdatePage;
