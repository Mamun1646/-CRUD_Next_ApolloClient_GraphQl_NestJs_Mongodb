import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../components/graphql/index";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {
  const router = useRouter();
  const getAllUsers = useQuery(GET_USERS);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!!getAllUsers.data) {
      setData(getAllUsers.data.getAllPerson);
    }
  }, [getAllUsers]);

  return (
    <div>
      <h2> Next GraphQL Nest Mongodb CRUD</h2>
      <Button variant="primary" onClick={() => router.push("Create/Create")}>
        Create Person
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.country}</td>
              <td>{user.Description}</td>
              <td>
                <Link href={`/Read/${user._id}`}>
                  <Button className="action__btn" variant="success">
                    Read
                  </Button>
                </Link>

                <Link href={`/Edit/${user._id}`}>
                  <Button className="action__btn" variant="info">
                    Edit
                  </Button>
                </Link>

                <Link href={`/Delete/${user._id}`}>
                  <Button className="action__btn" variant="danger">
                    Delete
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Home;
