"use client";

import { useState, useEffect } from "react";
import axios from "axios";


interface User {
    id_usuario: number;
    nome: string;
    email: string;
    tipo_usuario: string;
    data_criacao: Date; // Pode ser `Date` se o backend retornar já em formato de data
}

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([]); // Tipagem explícita para o estado
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Certifique-se de usar `NEXT_PUBLIC_` para variáveis acessíveis no front-end

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get<User[]>(`http://localhost:3001/usuario/lista`);
                console.log(response)
                setUsers(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [apiUrl]);

    return (
        <div>
            <h2>Admin Page</h2>
            {loading ? (
                <p>Carregando usuários...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Tipo de Usuário</th>
                            <th>Data de Criação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id_usuario}>
                                    <td>{user.id_usuario}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.tipo_usuario}</td>
                                    <td>{new Date(user.data_criacao).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>Nenhum usuário cadastrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
