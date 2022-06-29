import './App.css';
import React, { useState , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';

//query to get the names of all the countries

const COUNTRY = `{
  countries {
      name
      code
    }
}`;

//query to get the details of a specific country

const COUNTRY_DETAILS = `
  query Country($countryCode: ID!) {
    country(code: $countryCode) {
      code
      name
      native
      currency
      phone
      emoji
      emojiU
      languages {
        code
        name
      }
    }
  }
`;


function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setloading] = useState(false);
  const [country, setCountry] = useState();
  const [details, setDetails] = useState({
    name: "",
    code: "",
    native: "",
    currency: "",
    phone: "",
    emoji: "",
    emojiU: "",
    languages: [{ code: "", name: "" }],
  });


  //fetching the names of the countries from the graphql api using first query

  useEffect(() => {
    fetch("https://countries.trevorblades.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: COUNTRY }),
    })
      .then((response) => response.json())
      .then((data) => setCountries(data.data.countries));
  });
  //fetching the details of a country from the graphql api using second query

  useEffect(() => {
    fetch("https://countries.trevorblades.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: COUNTRY_DETAILS,
        variables: { countryCode: country },
      }),
    })
      .then((response) => response.json())
      .then((data) => setDetails(data.data.country))
      .then(() => setloading(true));
  }, [country]);


  return (
    <div>
      <h1 className='header'>Get Information About Countries</h1>
      <select className='country-dropdown'
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      >
        <option>--Select Country--</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
      </select>
      <div>
          { loading ? (
            <div className='card'>
              <h6><span>Name : </span>{details.name}</h6>
              <h6><span>Code : </span>{details.code}</h6>
              <h6><span>Currency : </span>{details.currency}</h6>
              <h6><span>Native : </span>{details.native}</h6>
              <h6><span>Phone : </span>{details.phone}</h6>
              <h6><span>Emoji : </span>{details.emoji}</h6>
              <h6><span>EmojiU : </span>{details.emojiU}</h6>
              <h6><span>Languages : </span></h6>
              {details.languages.map((lang) => (
                <h6>{lang.name}</h6>
              ))}
          </div>
          ) : (
            <div className='card'>
              <h6>Search your country. The details will be displayed here!!</h6>
            </div>
          )
        }
      </div>
      <footer>
        Developed By Aswathy Saji 
      </footer>
    </div>
  );
}

export default App;
