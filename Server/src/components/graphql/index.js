import { gql } from 'apollo-boost';

export const GET_USERS = gql`
  {
    getAllPerson {
    _id
    name
    country
    Description
  }
  }
`;

export const VIEW_USERS = gql`
query GetPersonById($id: String!) {
  getPersonById(_id: $id) {
    name
    country
    Description
  }
}
`;



export const UPDATE_USER_MUTATION = gql`
  mutation UpdatePerson($id: String!, $updatePersonDto: UpdatePersonDto!) {
    updatePerson(_id: $id, updatePersonDto: $updatePersonDto) {
      
      name
      country
      Description
    }
  }`




export const CREATE_USER_MUTATION =gql`mutation AddPerson($createPersonDto: CreatePersonDto!) {
  addPerson(createPersonDto: $createPersonDto) {
    name
    country
    Description
    
  }
}`



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
    }
  }`
