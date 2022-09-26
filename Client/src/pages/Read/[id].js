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
  console.log(user[0].image);
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
       
          <img
            className={ style.image_card}
            src={user[0].image}
            alt="Card image cap"
          />
      
        <div className="card-body">
          <h5 className="card-title"> {user[0].name}</h5>
          <h6 className="card-title"> Country :{user[0].country}</h6>

          <p className="card-text">{user[0].Description}</p>
        </div>
      </div>

      <Button variant="info" onClick={() => router.push("/")}>
        Back to Home
      </Button>
    </div>
  );
}
