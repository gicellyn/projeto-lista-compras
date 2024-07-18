import { Alert } from "react-bootstrap";

function NotFound() {
    return(
        <main>
            <Alert className="mt-2" variant="danger">
                <Alert.Heading>Que pena! Um erro 404.</Alert.Heading>
                <hr />
                <p>Página não encontrada. Tente outro link.</p>
            </Alert>
        </main>
    );
}


export default NotFound;