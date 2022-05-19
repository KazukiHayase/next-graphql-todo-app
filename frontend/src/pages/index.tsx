import React, { useCallback, useEffect, useState } from "react";

const IndexPage = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    console.log("test");
  }

  return (
    <>
      <div>一覧</div>
      <div>
        作成
        <input value={todo} onKeyDown={handleKeyDown}/>
      </div>
      <table>
        <thead>
          <tr>
            <th>TODO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* 仮置き */}
            <td>しなければいけないこと</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default IndexPage
