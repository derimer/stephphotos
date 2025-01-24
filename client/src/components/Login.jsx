// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = "admin@example.com";
    const validPassword = "admin@example.com";

    if (email === validEmail && password === validPassword) {
      // Simuler une authentification réussie
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin"); // Rediriger vers la page d'administration
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login">
      <h2>Connexion</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email" // Ajout de l'attribut pour le champ email
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password" // Ajout de l'attribut pour le champ mot de passe
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );}