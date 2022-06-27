import './App.css';
import React from "react";

const COUNTRY = `{
  countries {
      name
      code
    }
}`;

const COUNTRY_DETAILS = `
  query Country($countryCode: ID!) {
    country(code: $countryCode) {
      code
      name
      native
      emoji
      emojiU
      currency
      phone
      languages {
        code
        name
      }
    }
  }
`;

function App() {
  const [countrydropdown, setCountryDropdown] = React.useState([]);
  const [country, setCountry] = React.useState();
  const [details, setDetails] = React.useState({
    name: "",
    code: "",
    native: "",
    currency: "",
    phone: "",
    emoji: "",
    emojiU: "",
    languages: [{ code: "", name: "" }],
  });

  React.useEffect(() => {
    fetch("https://countries.trevorblades.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: COUNTRY }),
    })
      .then((response) => response.json())
      .then((data) => setCountryDropdown(data.data.countries));
  }, []);

  React.useEffect(() => {
    fetch("https://countries.trevorblades.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: COUNTRY_DETAILS,
        variables: { countryCode: country },
      }),
    })
      .then((response) => response.json())
      .then((data) => setDetails(data.data.country));
  }, [country]);


  return (
    <div>
      <h1 className='header'>Get Information About Countries</h1>
      <select className='country-dropdown'
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      >
        <option>--Select Country--</option>
          {countrydropdown.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
      </select>
      <div className='card'>
        <h3><span>Name : </span>{details.name}</h3>
        <h3><span>Code : </span>{country}</h3>
        <h3><span>Currency : </span>{details.currency}</h3>
        <h3><span>Native : </span>{details.native}</h3>
        <h3><span>Phone : </span>{details.phone}</h3>
        <h3><span>Emoji : </span>{details.emoji}</h3>
        <h3><span>EmojiU : </span>{details.emojiU}</h3>
        <h3><span>Languages : </span></h3>
        {details.languages.map((lang) => (
          <h3>{lang.name}</h3>
        ))}
      </div>
      <footer>
        Developed By Aswathy Saji 
      </footer>
    </div>
  );
}

export default App;
