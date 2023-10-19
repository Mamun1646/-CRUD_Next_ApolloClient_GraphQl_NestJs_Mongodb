/* eslint-disable */
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "react-bootstrap";
import { CREATE_EMAIL } from "../../components/graphql/index";
import { useRouter } from "next/router";
import style from "../../styles/Create.module.css";
const UserForm = () => {
  const router = useRouter();
  const [addPerson] = useMutation(CREATE_EMAIL);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [Description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const createName = (e) => {
    setName(e.target.value);
  };

  const createCountry = (e) => {
    console.log(e.target.value);
    setCountry(e.target.value);
  };
  const createImage = (e) => {
    setImage(e.target.files[0]);
    console.log(setImage);
  };

  const createDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (event) => {
    //event.preventDefault();
    addPerson({
      variables: {
        createPersonDto: {
          name:"Mamun",
          email:"123458@gmail.com",
          status:"active",

         
        },
      },
    }).then(()=>{
      console.log("successfull")
    }).catch((error)=>{
      console.log(error.message)
    });
    //router.push("/");
  };

  useEffect(()=>{
    handleSubmit()
  })
  return (
    <div className={style.create}>
      <h2>Enter Your Bio</h2>

      <Form>
        <Form.Group>
          <Form.Label>Name </Form.Label>
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
          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={createImage}
              placeholder="Choose Image"
            />
          </Form.Group>
          <Form.Group></Form.Group>

          <Button
            className="action_btn_create"
            //  onClick={() => router.push("/")}
            variant="primary"
            onClick={handleSubmit}
          >
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
