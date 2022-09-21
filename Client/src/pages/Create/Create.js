/* eslint-disable */
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "react-bootstrap";
import { CREATE_USER_MUTATION } from "../../components/graphql/index";
import { useRouter } from "next/router";
import style from '../../styles/Create.module.css'
const UserForm = () => {
  const router = useRouter();
  const [addPerson] = useMutation(CREATE_USER_MUTATION);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [Description, setDescription] = useState("");

  const createName = (e) => {
    setName(e.target.value);
  };

  const createCountry = (e) => {
    setCountry(e.target.value);
  };
  const createDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (event) => {
    addPerson({
      variables: {
        createPersonDto: {
          name,
          country,
          Description,
        },
      },
    });

    event.preventDefault();
  };

  return (
    <div className={style.create}>
    <h2>Enter Your Bio</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name  </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={createName}
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={country}
            onChange={createCountry}
            placeholder="Enter Country"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="Description"
            value={Description}
            onChange={createDescription}
            placeholder="Enter Description"
          />
        </Form.Group>
        <Form.Group>
                  <Button className="action_btn_create" variant="primary" onClick={() => router.push("/")} type="submit">
            Create User
          </Button>

          <Button
            className={style.action_btn}
            onClick={() => router.push("/")}
            variant="info"
          >
            Back to Home
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default UserForm;
