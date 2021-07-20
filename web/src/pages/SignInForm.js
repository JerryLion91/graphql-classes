import React from 'react';

export default function SignInForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      response.json().then((data) => console.log(data));
    });
  };

  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const handleChange = (atribute, newValue) => {
    setFormData((prev) => {
      return { ...prev, [atribute]: newValue };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={({ target: { value } = {} }) =>
            handleChange('email', value)
          }
          inputMode="email"
          autoComplete="username"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={({ target: { value } = {} }) =>
            handleChange('password', value)
          }
          autoComplete="current-password"
        />
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
}
