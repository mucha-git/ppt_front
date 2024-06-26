import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../_helpers/context';

import { accountService } from '@/_services';

function List({ match }) {
    const { applications } = useContext(AppContext)
    const { path } = match;
    const [users, setUsers] = useState(null);

    useEffect(() => {
        accountService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        accountService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Użytkownicy</h1>
            <p>Lista wszystkich twoich użytkowników:</p>
            <Link to={`${path}/add`} className="btn m-1 btn-sm btn-success mb-2">Dodaj użytkownika</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '25%' }}>Nazwa</th>
                        <th style={{ width: '25%' }}>Email</th>
                        <th style={{ width: '15%' }}>Rola</th>
                        <th style={{ width: '25%' }}>Aplikacja</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.title} {user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{applications.find( p => p.id === user.pilgrimageId)?.name}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.id}`} className="btn m-1 btn-sm btn-primary mr-1">Edytuj</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn m-1 btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Usuń</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };