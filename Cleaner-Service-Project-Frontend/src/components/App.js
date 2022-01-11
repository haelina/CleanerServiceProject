import "./styles/App.css";
import React, { useState, useEffect } from "react";
import MainPage from "./MainPage";
import AdminPage from "./AdminPage";
import CompaniesPage from "./CompaniesPage";
import InfoPage from "./InfoPage";
import CustomerFront from "./CustomerFront";
import CompanyFront from "./CompanyFront";
import OrderForm from "./OrderForm";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy.js";
import OfferRequest from "./OfferRequest";
import CreateSpecialOffer from "./CreateSpecialOffer";
import MySpecialOffers from "./MySpecialOffers";
import CompanyOfferRequests from "./CompanyOfferRequests";
import HeaderComponent from "./HeaderComponent";
import ModifyCompanyData from "./ModifyCompanyData";
import ModifyCustomerData from "./ModifyCustomerData";
import CustomerOfferRequests from "./CustomerOfferRequests";
import Signup from "./Signup";
import AddSupplier from "./AddSupplier";
import CompanyLogin from "./CompanyLogin";

const App = () => {
  const [loggedInCompanyId, setLoggedInCompanyId] = useState(null);
  const [loggedInCustomerId, setLoggedInCustomerId] = useState(null);

  useEffect(() => {
    const getCustomer = localStorage.getItem("user");
    if (getCustomer) {
      setLoggedInCustomerId(Number(getCustomer));
    }
  }, [loggedInCustomerId]);

  useEffect(() => {
    const getCompany = localStorage.getItem("company");
    if (getCompany) {
      setLoggedInCompanyId(Number(getCompany));
    }
  }, [loggedInCompanyId]);

  return (
    <div className="AppBackground">
      <BrowserRouter>
        <div className="App">
          <HeaderComponent />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/info">
              <InfoPage />
            </Route>
            <Route exact path="/companies">
              <CompaniesPage />
            </Route>
            <Route exact path="/offerRequest">
              <OfferRequest />
            </Route>
            <Route path="/orderform/:id">
              <OrderForm />
            </Route>
            <Route exact path="/privacy">
              <PrivacyPolicy />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/mypage/customer/modifydata">
              <ModifyCustomerData customerId={loggedInCustomerId} />
            </Route>
            <Route path="/mypage/customer/myofferrequests/:customerEmail">
              <CustomerOfferRequests />
            </Route>
            <Route exact path="/mypage/customer">
              <CustomerFront customerId={loggedInCustomerId} />
            </Route>
            <Route exact path="/company/login">
              <CompanyLogin />
            </Route>
            <Route exact path="/mypage/company/createspecialoffer">
              <CreateSpecialOffer companyId={loggedInCompanyId} />
            </Route>
            <Route exact path="/mypage/company/myspecialoffers">
              <MySpecialOffers companyId={loggedInCompanyId} />
            </Route>
            <Route path="/mypage/company/myofferrequests/:companyName">
              <CompanyOfferRequests />
            </Route>
            <Route exact path="/mypage/company/modifydata">
              <ModifyCompanyData companyId={loggedInCompanyId} />
            </Route>
            <Route exact path="/mypage/company">
              <CompanyFront companyId={loggedInCompanyId} />
            </Route>
            <Route exact path="/admin/addsupplier">
              <AddSupplier />
            </Route>
            <Route exact path="/admin">
              <AdminPage />
            </Route>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Redirect to="/">
              <MainPage />
            </Redirect>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
