import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../../components/graphql";
import { Button } from "react-bootstrap";
import style from "../../styles/Read.module.css";

export default function Read() {
  const router = useRouter();
  const { id } = router.query;

  const Users = useQuery(GET_USERS);
  // eslint-disable-next-line
  const user = Users.data.getAllPerson.filter((data) => data._id == id);

  return (
    <div className={style.read}>
      <h1>ID: {user[0]._id}</h1>
      <h1>Name: {user[0].name}</h1>
      <h1>Country: {user[0].country}</h1>
      <h1>Description: {user[0].Description} </h1>

      <Button variant="info" onClick={() => router.push("/")}>
        Back to Home
      </Button>
    </div>
  );
}
