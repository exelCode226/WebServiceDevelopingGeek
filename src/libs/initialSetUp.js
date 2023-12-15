import Role from "../models/role.model.js"

export const createRoles = async () => {

try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
        new Role({ name: 'Administrador' }).save(),
        new Role({ name: 'Gerente' }).save(),
        new Role({ name: 'Propietario' }).save()
    ]);

    console.log(values);
} catch (error) {
    console.error(error);
}

}