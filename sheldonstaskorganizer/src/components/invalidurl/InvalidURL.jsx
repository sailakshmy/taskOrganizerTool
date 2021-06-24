import React from 'react';
import Alert from 'react-bootstrap/Alert';



const InvalidURL = () => {
    return (
        <Alert variant="danger">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
                But sorry to say, this page has no content for you.......
            </p>
            <hr />
            <p className="mb-0">
                Click <Alert.Link href='/login'>login</Alert.Link> to view your notes again.
            </p>
        </Alert>
    )
}

export default InvalidURL;