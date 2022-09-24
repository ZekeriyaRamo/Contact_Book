import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import LoginPage from './components/loginpage/login';
import Footer from './components/footer/footer';
import RegisterPage from './components/registerpage/register';
import ResetPasswordPage from './components/resetpasswordpage/resetpassword';
import InviteUserPage from './components/inviteuserpage/inviteUser';
import SetPasswordPage from './components/setpasswordpage/setpassword';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { setContext } from '@apollo/client/link/context';
import Navbarr from './components/navbar/navbar';
import UserProfilePage from './components/userprofilepage/userProfile';
import UsersPage from './components/usersPage/users';
import CompanyProfile from './components/companyProfilePage/companyProfile'
import ContactsProfile from './components/contactsPage/contacts'
import CreateConatact from './components/createConatactpage/createConatact'
import UpdateContact from './components/updateContactPage/updateContact'
import MyProfile from './components/myProfilepage/myProfile';
import Dashboard from './components/dashboardPage/dashboard';
import ActivityList from './components/activities/activitiesList';
import { useEffect, useState } from 'react';
import Protected from './components/protected/protected';
const httpLink = createHttpLink({
  uri: 'https://0b18-176-33-97-230.eu.ngrok.io/graphql/',
});
const authLink = setContext((_, { headers }) => {

  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('Token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



function App() {
  const [isLoggedIn, setisLoggedIn] = useState("");
  return (

    <div className="App">
      <ApolloProvider client={client}>

        <BrowserRouter>

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register"  element={<RegisterPage />} />
            <Route path="/resetpassword"element={<ResetPasswordPage />}/>
            <Route path="/setpassword/:token" element={ <SetPasswordPage />}/>
            <Route path="/inviteuser"element={<Protected>
              <InviteUserPage />
            </Protected>} />
            <Route path="/userprofile/:userId" element={<Protected>
              <UserProfilePage />
            </Protected>}  />
            <Route path="/users" element={<Protected >
              <UsersPage />
            </Protected>} />

            <Route path="/companyprofile" element={<Protected>
              <CompanyProfile />
            </Protected>} />

            <Route path="/contacts" element={<Protected>
              <ContactsProfile />
            </Protected>} />

            <Route path="/createContact"element={<Protected>
              <CreateConatact />
            </Protected>} />

            <Route path="/updateContact/:conId" element={<Protected>
              <UpdateContact />
            </Protected>} />
            
            <Route path="/myprofile"element={<Protected>
              <MyProfile />
            </Protected>} />

            <Route path="/home" element={<Protected>
              <Dashboard />
            </Protected>}
            />
             {/* <Route path="/home" element={<Dashboard> } */}
            <Route path="/activitylist" element={<Protected>
              <ActivityList />
            </Protected>}
            />
          </Routes>
        </BrowserRouter>
        {/* <Footer /> */}
      </ApolloProvider>

    </div>
  );
}

export default App;
