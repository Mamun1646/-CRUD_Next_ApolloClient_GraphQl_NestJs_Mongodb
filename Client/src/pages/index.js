import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS, SEARCH_BY_NAME } from "../components/graphql/index";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import Persons from "../components/Persons";
import Pagination from "../components/Pagination";

const Home = () => {
  //Pagination Code start

  const [persons, setPersons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [personsPerPage] = useState(3);

  const getAllUsers = useQuery(GET_USERS);
  useEffect(() => {
    if (!!getAllUsers.data) {
      setPersons(getAllUsers.data.getAllPerson);
    }
  }, [getAllUsers]);

  // Get current persons
  const indexOfLastPerson = currentPage * personsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
  const currentPersons = persons.slice(indexOfFirstPerson, indexOfLastPerson);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //pagination code end

  const router = useRouter();

  const [datas, setData] = useState([]);

  useEffect(() => {
    if (!!getAllUsers.data) {
      setData(getAllUsers.data.getAllPerson);
    }
  }, [getAllUsers]);

  const [searchName, setSearchName] = useState("");
  const [searchedPerson, setSearchedPerson] = useState([]);

  const { data } = useQuery(SEARCH_BY_NAME, {
    variables: { data: searchName },
  });

  const createSearch = (e) => {
    e.preventDefault();
    setSearchName(e.target.value);
  };

  useEffect(() => {
    if (data) {
      setSearchedPerson(data.getPersonByName);
    }
  }, [data]);
  console.log(searchedPerson);

  return (
    <div>
      <h2> Next GraphQL Nest Mongodb CRUD</h2>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Button
            variant="primary"
            onClick={() => router.push("Create/Create")}
          >
            Create Person
          </Button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="text"
                onChange={createSearch}
                placeholder="Search By Name"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                onClick={() => router.push("/")}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {searchedPerson.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Country</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchedPerson.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>{user.Description}</td>
                <td>
                  <img
                    className="view_image"
                    src={user.image}
                    alt="Card image cap"
                  />
                </td>
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
      ) : (
        //Pagination Code start
        <div className="container mt-5">
          <Persons persons={currentPersons} />
          <Pagination
            personsPerPage={personsPerPage}
            totalPersons={persons.length}
            paginate={paginate}
          />
        </div>

        //Pagination code end here
      )}
    </div>
  );
};
export default Home;
