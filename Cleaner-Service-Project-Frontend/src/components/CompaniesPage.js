import React, { useState, useEffect } from "react";
import Company from "./Company";
import BackendConnection from "./BackendConnection";

const CompaniesPage = (props) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    /*
    const exampleData = [
      {
        id: 1,
        name: "Siivouspojat Ab",
        contactPerson: "Jussi Mäkinen",
        phone: "040 5544671",
        streetAddress: "Mäkitie 3",
        postcode: "36100",
        city: "Tampere",
        email: "asiakaspalvelu@siivouspojat.fi",
        supplier_description: "Tehdään loistavaa jälkeä",
      },
      {
        id: 2,
        name: "Duunia Pukkaa Ky",
        contactPerson: "Reiska Taipale",
        phone: "040 5544671",
        streetAddress: "Koivukuja 155",
        postcode: "13340",
        city: "Salo",
        email: "reiskahoitaa@yahoo.com",
        supplier_description: "Siivotaan kun ehditään",
      },
    ];
    */
    const loadCompanyList = async () => {
      try {
        const companiesListed = await BackendConnection.getAllCompanies();
        if (companiesListed.length === 0) {
          /*console.log(
            "Got empty list from backend, using example data instead"
          );
          //setCompanies(exampleData); */
        } else {
          setCompanies(companiesListed);
        }
      } catch (err) {
        console.log("Error situation, using example data now.");
        //setCompanies(exampleData);
        alert("Problem with loading supplier data from database");
      }
    };
    loadCompanyList();
  }, []);
  const companyList = companies.map((company) => {
    return (
      <Company
        key={company.name}
        name={company.name}
        address={company.street_address}
        postnumber={company.postcode}
        city={company.city}
        phonenumber={company.phone}
        email={company.email}
        description={company.supplier_description}
      />
    );
  });
  return (
    <div>
      <h1>Palveluntarjoajat:</h1>
      {companyList}
      {/*
        <Company
          name="Siivouspojat Ab"
          address="Liinakatu 33"
          postnumber="33450"
          city="Tampere"
          phonenumber="040 81534734"
          email="asiakaspalvelu@siivouspojat.fi"
          description="Phasellus tristique massa eget arcu mollis pellentesque. Maecenas imperdiet blandit lobortis. Aenean scelerisque in ipsum quis lacinia. Nullam auctor interdum nibh, ut ultricies purus suscipit non. Integer mattis mollis feugiat. Duis fringilla orci interdum, facilisis ex vitae, tempus turpis. Donec imperdiet, urna ac euismod dapibus, magna metus convallis risus, sed rhoncus diam risus at risus."
        />
        <Company
          name="DuuniaPukkaa Ky"
          address="Kylmäsenkuja 167 b"
          postnumber="33150"
          city="Valkeakoski"
          phonenumber="040 66544734"
          email="reiska@yahoo.com"
          description="Phasellus tristique massa eget arcu mollis pellentesque. Maecenas imperdiet blandit lobortis. Aenean scelerisque in ipsum quis lacinia. Nullam auctor interdum nibh, ut ultricies purus suscipit non. Integer mattis mollis feugiat. Duis fringilla orci interdum, facilisis ex vitae, tempus turpis. Donec imperdiet, urna ac euismod dapibus, magna metus convallis risus, sed rhoncus diam risus at risus."
        /> */}
    </div>
  );
};

export default CompaniesPage;
