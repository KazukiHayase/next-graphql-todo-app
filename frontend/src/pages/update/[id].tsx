import { useRouter } from "next/router";

const UpdatePage = () => {
  const router = useRouter();

  return (
    <>
      <h3>更新 id: {router.query.id}</h3>
    </>
  );
};

export default UpdatePage;
