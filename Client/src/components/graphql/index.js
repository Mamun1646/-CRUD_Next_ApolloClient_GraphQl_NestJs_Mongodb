import { gql } from 'apollo-boost';

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






export const CREATE_USER_MUTATION = gql`
  mutation AddPerson($createPersonDto: CreatePersonDto!) {
  addPerson(createPersonDto: $createPersonDto) {
    _id
    name
    country
    Description
    image
  }
}`








export const DELETE_USER = gql`
  mutation DeletePerson($id: String!) {
    deletePerson(_id: $id) {
      _id
      name
      country
      Description
      image
    }
  }`


export const UPDATE_USER_MUTATION = gql`mutation UpdatePerson($id: String!, $updatePersonDto: UpdatePersonDto!) {
  updatePerson(_id: $id, updatePersonDto: $updatePersonDto) {
    _id
    name
    country
    Description
    image
  }
}`
