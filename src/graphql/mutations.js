import { gql } from "@apollo/client";
export const LOGIN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
       
        Login(email: $email, password: $password) 
    }
`;


export const SENDMAILPASSWORD_MUTATION = gql`
    mutation sendmailpasswordMutation(
        $email: String!
    ) {
        sendmailpassword(email: $email) 
    }
`;

export const SETFAVORITE_MUTATION = gql`
    mutation makeFavoriteMutation(
        $contact_id: ID!
    ) {
        makefavorite(contact_id: $contact_id){
          contact_id
        }
    }
`;

export const SETPASSWORD_MUTATION = gql`
    mutation sendmailpasswordMutation(
        $password: String!
        $confirmpassword: String!
    ) {
        setpassword( password: $password, confirmpassword: $confirmpassword) 
    }
`;

export const UPDATECOMPANY_MUTATION = gql`
    mutation Updatecompanyprofile(
        $name: String,
        $vat_num: String, 
        $street: String, 
        $street2: String, 
        $city: String, 
        $state: String, 
        $zip: String, 
        $country: String
        ){
    updatecompanyprofile(
        name: $name, 
        vat_num: $vat_num, 
        street: $street, 
        street2: $street2, 
        city: $city, 
        state: $state, 
        zip: $zip, 
        country: $country
        )
}
`;
export const CREATEUSER_MUTATION = gql`
  mutation SignupMutation(
            $email: String!
            $vat_num: String!
            $first_name: String!
            $last_name: String!
            $password: String!
            $company_name: String!
            $street: String!
            $street2: String!
            $city: String!
            $state: String!
            $zip:String!
            $country: String!
    ){
        signup(
            email: $email
            vat_num: $vat_num
            first_name: $first_name
            last_name: $last_name
            password: $password
            company_name: $company_name
            street: $street
            street2: $street2
            city: $city
            state: $state
            zip: $zip
            country: $country
        )
  }
`;
export const LOGOUT_MUTATION = gql`
	mutation Logout {
		Logout {
			message
		}
	}
`;
export const EXPORTPDF_MUTATION = gql`
	mutation ExportPDF {
        exportpdf 
        
	}
`;

export const DELETECONTACT_MUTATION = gql`
	mutation deleteContact($id: [ID!]!)
		{
            deletecontact(id: $id)
        }

`;
export const DELETEUSER_MUTATION = gql`
	mutation deleteUser($id: [ID!]!)
    {
        deleteuser(id: $id)
    }

`;

export const CREATECONTACT_MUTATION = gql`
	mutation createContact(  
        $image: String
        $first_name: String!
        $last_name: String!
        $email: String
        $phone: String!
        $email2: String
        $mobile:String
        $address1: String
        $address2: String
                )
		{
            createcontact(
                    first_name: $first_name
                    last_name: $last_name
                    email: $email
                    phone: $phone
                    email2: $email2
                    mobile: $mobile
                    address1: $address1
                    address2: $address2
                    image: $image
            )
        }
`;
export const UPDATECONTACT_MUTATION = gql`
	mutation UpdateContact(  
        $image: String
        $first_name: String
        $last_name: String
        $email: String
        $phone: String
        $email2: String
        $mobile:String
        $address1: String
        $address2: String
        $contact_id: ID!
        $status: String
                )
		{
            updatecontact(
                    contact_id:$contact_id
                    first_name: $first_name
                    last_name: $last_name
                    email: $email
                    phone: $phone
                    email2: $email2
                    mobile: $mobile
                    address1: $address1
                    address2: $address2
                    image: $image
                    status: $status
            )
        }
`;
export const UPDATEUSER_MUTATION = gql`
	mutation UpdateUser(  
        $id:ID!
        $first_name: String
        $last_name: String
        $email: String
        $phone: String
        $role: String
        $status: String
                )
		{
            updateuser(
                    
                    first_name: $first_name
                    last_name: $last_name
                    email: $email
                    phone: $phone
                    role: $role
                    id:$id
                    status:$status
            )
        }
`;
export const UPDATEMYPROFILE_MUTATION = gql`
	mutation UpdateMyprofile(  
        $first_name: String
        $last_name: String
        $email: String
        $phone: String)
		{
            updatemyprofile(     
                    first_name: $first_name
                    last_name: $last_name
                    email: $email
                    phone: $phone
            )
        }
`;
export const INVITEUSER_MUTATION = gql`
	mutation inviteUser(  
        $first_name: String!
        $last_name: String!
        $email: String!
        $phone: String!
        $role: String!
    ){
            inviteuser(
                    first_name: $first_name
                    last_name: $last_name
                    email: $email
                    phone: $phone
                    role: $role
            ){
                message
                token
            }
    }
`;
