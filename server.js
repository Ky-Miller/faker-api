const express = require("express");
const app = express();
const port = 8000;
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
const { faker } = require('@faker-js/faker');

const createUser = () => {
    const newUser = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        id: faker.string.uuid
    };
    return newUser;
};
    
const newFakeUser = createUser();

app.get("/api/users/new", (req, res) => {
    res.json( newFakeUser );
});

const createCompany = () => {
    const newCompany = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        adress: {
            street: faker.location.street(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country()
        }
    };
    return newCompany;
};

const newFakeCompany = createCompany();

app.get("/api/companies/new", (req, res) => {
    res.json( newFakeCompany );
});

const newFakeUserAndCompany = [createUser(), createCompany()]

app.get("/api/user/company", (req, res) => {
    res.json( newFakeUserAndCompany );
});


app.listen( port, () => console.log(`Listening on port: ${port}`) );
