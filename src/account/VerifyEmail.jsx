import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { accountService, alertService } from '@/_services';

function VerifyEmail({ history }) {
    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

    useEffect(() => {
        const { token } = queryString.parse(location.search);

        // remove token from url to prevent http referer leakage
        history.replace(location.pathname);

        accountService.verifyEmail(token)
            .then(() => {
                alertService.success('Weryfikacja pomyślna, mozesz juz się zalogować', { keepAfterRouteChange: true });
                history.push('login');
            })
            .catch(() => {
                setEmailStatus(EmailStatus.Failed);
            });
    }, []);

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <div>Weryfikuję...</div>;
            case EmailStatus.Failed:
                return <div>Weryfikacja nieudana, mozesz równiez zweryfikować konto poprzez stronę <Link to="forgot-password">zapomniałem hasła</Link>.</div>;
        }
    }

    return (
        <div>
            <h3 className="card-header">Weryfikacja maila</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}

export { VerifyEmail }; 