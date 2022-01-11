import axios from "axios";

const baseUrl = "https://clean-buddy.herokuapp.com/api/";
//const baseUrl = "http://localhost:8080/api/";

const getAllCompanies = async () => {
  const result = await axios.get(`${baseUrl}suppliers/`);
  //console.log("BackendConnection: Getting all companies");
  //console.log(result.data);
  return result.data;
};

const getAllCustomers = async () => {
  const result = await axios.get(`${baseUrl}customers/`);
  //console.log("BackendConnection: Getting all customers");
  //console.log(result.data);
  return result.data;
};

const getAllSpecialOffers = async () => {
  const result = await axios.get(`${baseUrl}products/`);
  //console.log("BackendConnection: Getting all specialoffers.");
  //console.log(result.data);
  return result.data;
};

const getOfferRequestsBySupplier = async (supplier) => {
  const result = await axios.get(
    `${baseUrl}offer-requests?supplier=${supplier}`
  );
  //console.log("BackendConnection: Getting all offer request for supplier.");
  //console.log(result.data);
  return result.data;
};

const postSpecialOffer = async ({
  supplier_name,
  product_name,
  product_description,
  product_price,
  ends_at,
  work_hours,
  is_available,
}) => {
  /*console.log(
    `Posting values to db with axios:
    ${supplier_name},
    ${product_name},
    ${product_description},
    ${product_price},
    ${ends_at},
    ${work_hours},
    ${is_available}`
  );
  */
  const result = await axios
    .post(`${baseUrl}products/`, {
      // supplier_name: "Siivouspojat Oy",
      // product_name: "Juhlasiivous",
      // product_description: "Tarkempi kuvaus juhlasiivouksesta",
      // product_price: 100,
      // ends_at: null,
      // work_hours: 5,
      // is_available: true,
      supplier_name: supplier_name,
      product_name: product_name,
      product_description: product_description,
      product_price: product_price,
      ends_at: ends_at,
      work_hours: work_hours,
      is_available: is_available,
    })
    .then(function (response) {
      try {
        // your own try...catch block to catch the error before axios ..catch
        //console.log(response);
      } catch (e) {
        console.log(e);
      } // your catch block
    })
    .catch(function (error) {
      console.log(error);
    });
  //console.log(result.data);
  return result.data;
};

const postNewCustomer = async ({
  first_name,
  last_name,
  street_address,
  city,
  postcode,
  phone,
  email,
  password,
}) => {
  /*console.log(`Sending this data with axios post
    ${first_name},
    ${last_name},
    ${street_address},
    ${city},
    ${postcode},
    ${phone},
    ${email},
    ${password}`);
  */
  const result = await axios
    .post(`${baseUrl}customers/`, {
      first_name: first_name,
      last_name: last_name,
      street_address: street_address,
      city: city,
      postcode: postcode,
      phone: phone,
      email: email,
      password: password,
    })
    .then(function (response) {
      try {
        // your own try...catch block to catch the error before axios ..catch
        //console.log(response);
      } catch (e) {
        console.log(e);
      } // your catch block
    })
    .catch(function (error) {
      console.log(error);
    });
  //console.log(result.data);
  return result.data;
};

const postNewSupplier = async ({
  name,
  supplier_description,
  street_address,
  city,
  postcode,
  phone,
  email,
  password,
}) => {
  /*console.log(`Sending this data with axios post
    ${name},
    ${supplier_description},
    ${street_address},
    ${city},
    ${postcode},
    ${phone},
    ${email},
    ${password}`);
  */
  const result = await axios
    .post(`${baseUrl}suppliers/`, {
      name: name,
      supplier_description: supplier_description,
      street_address: street_address,
      city: city,
      postcode: postcode,
      phone: phone,
      email: email,
      password: password,
    })
    .then(function (response) {
      try {
        // your own try...catch block to catch the error before axios ..catch
        //console.log(response);
      } catch (e) {
        console.log(e);
      } // your catch block
    })
    .catch(function (error) {
      console.log(error);
    });
  //console.log(result.data);
  return result.data;
  //return result[0].data;
};

const postNewOfferRequest = async ({
  apartment_type,
  apartment_area,
  cleaning_frequency,
  request_suppliers,
  optional_information,
  first_name,
  last_name,
  street_address,
  city,
  postcode,
  phone,
  email,
}) => {
  /*console.log(`Sending this data with axios post
    ${apartment_type},
    ${apartment_area},
    ${cleaning_frequency},
    ${request_suppliers}
    ${optional_information},
    ${first_name},
    ${last_name},
    ${street_address},
    ${city},
    ${postcode},
    ${phone},
    ${email}`);
  */
  const result = await axios
    .post(`${baseUrl}offer-requests/`, {
      apartment_type: apartment_type,
      apartment_area: apartment_area,
      cleaning_frequency: cleaning_frequency,
      request_suppliers: request_suppliers,
      optional_information: optional_information,
      first_name: first_name,
      last_name: last_name,
      street_address: street_address,
      city: city,
      postcode: postcode,
      phone: phone,
      email: email,
    })
    .then(function (response) {
      try {
        // your own try...catch block to catch the error before axios ..catch
        //console.log(response);
      } catch (e) {
        console.log(e);
      } // your catch block
    })
    .catch(function (error) {
      console.log(error);
    });
  //console.log(result.data);
  return result.data;
};

const modifyCustomer = async (
  customer_id,
  customer_firstName,
  customer_lastName,
  customer_streetAddress,
  customer_city,
  customer_postCode,
  customer_phone,
  customer_email
) => {
  const result = await axios.put(`${baseUrl}customers/`, {
    customer_id: customer_id,
    first_name: customer_firstName,
    last_name: customer_lastName,
    street_address: customer_streetAddress,
    city: customer_city,
    postcode: customer_postCode,
    phone: customer_phone,
    email: customer_email,
  });
  return result.data;
};
//"supplier_id":13,"
//"name":"Paska firma"
//"supplier_description":": )"
//"street_address":"Kikkakuja 16"
//"city":"Åbo"
//"postcode":"241343"
//"phone":"41234324"
//"email":"dsdfsd@dsfsd.fds"}]
const modifySupplier = async (
  supplier_id,
  name,
  supplier_description,
  street_address,
  city,
  postcode,
  phone,
  email
) => {
  const result = await axios.put(`${baseUrl}suppliers/`, {
    supplier_id: supplier_id,
    name: name,
    supplier_description: supplier_description,
    street_address: street_address,
    city: city,
    postcode: postcode,
    phone: phone,
    email: email,
  });
  return result.data;
};

//not implemented in backend yet
const modifyOffer = async (
  offer_id,
  name,
  description,
  price,
  endsAt,
  workHours,
  isAvailable
) => {
  const result = await axios.put(`${baseUrl}products/`, {
    //offers url?
    product_id: offer_id,
    product_name: name,
    product_description: description,
    product_price: price,
    ends_at: endsAt,
    work_hours: workHours,
    is_available: isAvailable,
  });
  return result.data;
};

const deleteCustomer = async (id) => {
  await axios
    .delete(`${baseUrl}customers/${id}`)
    .then(function (response) {
      try {
        // your own try...catch block to catch the error before axios ..catch
        //console.log(response);
      } catch (e) {
        console.log(e);
      } // your catch block
    })
    .catch(function (error) {
      console.log(error);
    });
};

const deleteSupplier = async (id) => {
  await axios
    .delete(`${baseUrl}suppliers/${id}`)
    .then(function (response) {
      try {
        // your own try...catch block to catch the error before axios ..catch
        //console.log(response);
      } catch (e) {
        console.log(e);
      } // your catch block
    })
    .catch(function (error) {
      console.log(error);
    });
};

const deleteOffer = async (id) => {
  await axios
    .delete(`${baseUrl}products/${id}`)
    .then(function (response) {
      try {
        // your own try...catch block to catch the error before axios ..catch
        //console.log(response);
      } catch (e) {
        console.log(e);
      } // your catch block
    })
    .catch(function (error) {
      console.log(error);
    });
};

const obj = {
  getAllCompanies,
  getAllCustomers,
  getAllSpecialOffers,
  getOfferRequestsBySupplier,
  postSpecialOffer,
  postNewCustomer,
  postNewSupplier,
  postNewOfferRequest,
  deleteCustomer,
  deleteSupplier,
  deleteOffer,
  modifySupplier,
  modifyCustomer,
  modifyOffer,
};
export default obj;
