import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    getAllPerson {
      _id
      name
      country
      Description
      image
    }
  }
`;

export const VIEW_USERS = gql`
  query GetPersonById($id: String!) {
    getPersonById(_id: $id) {
      name
      country
      Description
      image
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdatePerson($id: String!, $updatePersonDto: UpdatePersonDto!) {
    updatePerson(_id: $id, updatePersonDto: $updatePersonDto) {
      name
      country
      Description
      image
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation AddPerson($createPersonDto: CreatePersonDto!) {
    addPerson(createPersonDto: $createPersonDto) {
      name
      country
      Description
      image
    }
  }
`;

// export const EDIT_USER = gql`
//   mutation($id: Int, $name: String, $email: String, $job_title: String) {
//     updateUserInfo (id: $id, name: $name, email: $email, job_title: $job_title)
//   }
// `;

export const DELETE_USER = gql`
  mutation DeletePerson($id: String!) {
    deletePerson(_id: $id) {
      _id
      name
      country
      Description
      image
    }
  }
`;

export const SEARCH_BY_NAME = gql`
  query GetPersonByName($data: String!) {
    getPersonByName(data: $data) {
      _id
      name
      country
      Description
      image
    }
  }
`;
