import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./src/firebaseConfig";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(true); // panggil callback ke App.jsx
    } catch (err) {
      setError("Email atau password salah!");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login Admin Balai Desa</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Kata Sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Masuk</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 320,
    margin: "100px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#f8f9fa"
  },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { padding: 10, borderRadius: 5, border: "1px solid #ccc" },
  button: {
    padding: 10,
    border: "none",
    borderRadius: 5,
    background: "#4a8bdf",
    color: "white",
    cursor: "pointer"
  },
  error: { color: "red", marginTop: 10 }
};

export default Login;
