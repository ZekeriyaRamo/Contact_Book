import { gql } from "@apollo/client";

export const GET_USERS = gql`

    query GetUsers($search: String,$page: Int){ 

        getusers(search: $search, page: $page){
          id
          first_name
          last_name
          email
          phone
          status
          role
        } 
        usercount(search: $search)
    }  
`;
export const MYCOMPANYPROFILE = gql`

    query myCompanyProfile{ 
      mycompanyprofile{
        id
        name
        vat_num
        street
        street2
        city
        state
        zip
        country
      }   
    }  
`;

export const ALLUSERS = gql`

{
  users{
    id
    first_name
    last_name


  }
}

`;
export const GET_CONTACTS = gql`

    query GetContacts($search: String,$page: Int!){ 

        getcontacts(search: $search, page: $page){
          id
          first_name
          last_name
          email
          phone
          status
          image
          user_id
        }
    }  
`;
export const GET_FAVORITE = gql`

    query getFavorite{ 

      getfavorite{
          contact_id
        }
    }  
`;
export const GETNAME_QUERY = gql`

query getmyprofile{
  getmyprofile{
    id
    first_name
    last_name
    role
  }
}

`;
export const GETCONTACTCOUNTS_QUERY = gql`

query getContactsCount{
  contactsCount
}

`;
export const GETACTIVITIESCOUNTS_QUERY = gql`

query getActivitiescount{
  getactivitiescount
}

`;
export const GETUSERSCOUNT_QUERY = gql`
query getUsercount{
  userscount
}
`;
export const GETCONTACTPROFILE_QUERY = gql`
query getContactProfile($id: ID!){
  getcontactprofile(id: $id ) {
    id
    image
    first_name
    last_name
    email
    phone
    status
    email2
    mobile
    address1
    address2
  }
}

`;
export const GETUSERPROFİLE_QUERY = gql`

query getUserProfile($id: ID!){
  userprofilbyid(id: $id ) {
    id
    first_name
    last_name
    email
    phone
    status
    role
  }
}
`;

export const GETMYPROFILE_QUERY = gql`

query getMyProfile{
  getmyprofile {
    first_name
    last_name
    email
    phone
  }
}
`;
export const GETACTIVITIES_QUERY = gql`

query getActivities($page: Int!){
  
  Getactivities(page: $page) {
    id
    title
    date
    created_at
  }

}
`;
export const GETLASTACTIVITIES_QUERY = gql`

query getLastactivities{
  
  getlastactivities {
    id
    title
    date
    created_at
    username
    contactname
    user_id
  }
}
`;
export const GETACTIVECONTACTS_QUERY = gql`

query getActivecontacts{
  
  Getactivecontacts 
}
`;
export const GETINACTIVECONTACTS_QUERY = gql`

query getInactivecontacts{
  
  Getinactivecontacts
}
`;
export const GETWITHEMAILCONTACTS_QUERY = gql`

query getWithemailcontacts{
  
  Getwithemailcontacts
}
`;
export const GETWITHOUTEMAILCONTACTS_QUERY = gql`

query getWithoutemailcontacts{
  
  Getwithoutemailcontacts
}
`;
export const GETACTIVITYLIST_QUERY = gql`

query getActivieslist($page : Int!){
  
  Getactivities(page: $page){
    id
    title
    date
    created_at
    username
    contactname
    user_id
  }
}
`;
