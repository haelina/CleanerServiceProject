import React, { useState, useEffect } from "react";
import "./styles/TextPage.css";
import { makeStyles } from "@material-ui/core/styles";
import BackendConnection from "./BackendConnection";
import AdminModifyCompanyData from "./AdminModifyCompanyData";
import AdminModifyCustomerData from "./AdminModifyCustomerData";
import AdminModifyOfferData from "./AdminModifyOfferData";
import AddSupplier from "./AddSupplier";
import { PurpleButton } from "./CustomButtons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    marginBottom: theme.spacing(2),
  },
  activeButton: {
    backgroundColor: "#7D076C",
    color: "white",
  },
  defaultButton: {
    backgroundColor: "default",
  },
}));

const AdminPage = () => {
  const styles = useStyles();
  const customersTxt = "Asiakkaat";
  const companiesTxt = "Palveluntarjoajat";
  const offersTxt = "Pikatarjoukset";
  //placeholder text
  const supplierTxt = "Lisää yritys";

  const [adminRights, setAdminRights] = useState(false);
  const [selectedPage, setSelectedPage] = useState(customersTxt);
  const [customers, setCustomers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const checkIfAdmin = async () => {
      const getAdmin = localStorage.getItem("admin");
      //console.log(getAdmin);
      if (getAdmin) {
        setAdminRights(true);
      }
    };
    checkIfAdmin();
    if (adminRights) {
      fetchData();
    }
  }, [adminRights, selectedPage]);

  const fetchData = async () => {
    try {
      const customersListed = await BackendConnection.getAllCustomers();
      const companiesListed = await BackendConnection.getAllCompanies();
      const offersListed = await BackendConnection.getAllSpecialOffers();
      setCustomers(customersListed);
      setCompanies(companiesListed);
      setOffers(offersListed);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCustomers = async () => {
    setCustomers(await BackendConnection.getAllCustomers());
    await setSelectedPage(null);
    setSelectedPage(customersTxt);
  };
  const updateCompanies = async () => {
    setCompanies(await BackendConnection.getAllCompanies());
    await setSelectedPage(null);
    setSelectedPage(companiesTxt);
  };
  const updateOffers = async () => {
    setOffers(await BackendConnection.getAllSpecialOffers());
    await setSelectedPage(null);
    setSelectedPage(offersTxt)
  };

  const deleteCustomer = async (id) => {
    await BackendConnection.deleteCustomer(id);
    setCustomers(await BackendConnection.getAllCustomers());
    await setSelectedPage(null);
    setSelectedPage(customersTxt);
  };
  const deleteCompany = async (id) => {
    await BackendConnection.deleteSupplier(id);
    setCompanies(await BackendConnection.getAllCompanies());
    await setSelectedPage(null)
    setSelectedPage(companiesTxt)
  };
  const deleteOffer = async (id) => {
    await BackendConnection.deleteOffer(id);
    setOffers(await BackendConnection.getAllSpecialOffers());
    await setSelectedPage(null);
    setSelectedPage(offersTxt);
  };

  const getContent = (selectedP) => {
    if (selectedP === customersTxt) {
      return (
        <div>
          <h1>Muokkaa asiakastietoja:</h1>

          {customers.map((data) => (
            <ul key={data.customer_id}>
              <AdminModifyCustomerData
                cData={data}
                update={() => updateCustomers()}
                cDelete={() => deleteCustomer(data.customer_id)}
              />
            </ul>
          ))}
        </div>
      );
    } else if (selectedPage === companiesTxt) {
      return (
        <div>
          <h1>Muokkaa yritystietoja:</h1>

          {companies.map((data) => (
            <ul key={data.supplier_id}>
              <AdminModifyCompanyData
                cData={data}
                update={() => updateCompanies()}
                cDelete={() => deleteCompany(data.supplier_id)}
              />
            </ul>
          ))}
        </div>
      );
    } else if (selectedPage === offersTxt) {
      //product_id
      return (
        <div>
          <h1>Muokkaa tarjoustietoja:</h1>
          {/*product_id*/}
          {offers.map((data) => (
            <ul key={data.product_id}>
              <AdminModifyOfferData
                oData={data}
                company={companies.filter(
                  (co) => co.supplier_id === data.supplier_id
                )}
                update={() => updateOffers()}
                oDelete={() => deleteOffer(data.product_id)}
              />
            </ul>
          ))}
        </div>
      );
    } else if (selectedPage === supplierTxt) {
      return (
        <div>
          <AddSupplier />
        </div>
      );
    }
    // works as a pageswitcher -> reload data (useEffect)
    // or maybe it doesnt, idk, everythings a mess
    else {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }
  };

  return (
    <div>
      {adminRights ? (
        <div>
          <div>
            <br />
            <PurpleButton
              className={
                selectedPage === supplierTxt
                  ? styles.activeButton
                  : styles.defaultButton
              }
              variant="contained"
              size="large"
              //color={selectedPage === supplierTxt ? "primary" : "default"}
              onClick={() => setSelectedPage(supplierTxt)}
            >
              {supplierTxt}
            </PurpleButton>
            <PurpleButton
              className={
                selectedPage === customersTxt
                  ? styles.activeButton
                  : styles.defaultButton
              }
              variant="contained"
              size="large"
              //color={selectedPage === customersTxt ? "primary" : "default"}
              onClick={() => setSelectedPage(customersTxt)}
            >
              {customersTxt}
            </PurpleButton>
            <PurpleButton
              className={
                selectedPage === companiesTxt
                  ? styles.activeButton
                  : styles.defaultButton
              }
              variant="contained"
              size="large"
              //color={selectedPage === companiesTxt ? "primary" : "default"}
              onClick={() => setSelectedPage(companiesTxt)}
            >
              {companiesTxt}
            </PurpleButton>
            <PurpleButton
              className={
                selectedPage === offersTxt
                  ? styles.activeButton
                  : styles.defaultButton
              }
              variant="contained"
              size="large"
              //color={selectedPage === offersTxt ? "primary" : "default"}
              onClick={() => setSelectedPage(offersTxt)}
            >
              {offersTxt}
            </PurpleButton>
            <br />
            {getContent(selectedPage)}
          </div>
        </div>
      ) : (
        <div>
          <p>Not Admin user</p>
        </div>
      )}
    </div>
  );
};
export default AdminPage;
