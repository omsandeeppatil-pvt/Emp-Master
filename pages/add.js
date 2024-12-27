import { useState } from "react";
import { useRouter } from "next/router";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, position }),
    });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Employee</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
