# project-node
Se ha creado un servidor de películas que contiene las siguientes características:

1. Servidor Express.js
2. Se conecta a una base de datos MongoDB, en local o mediante MongoAtlas, utilizando mongoose.
3. Se ha creado una semilla con el nombre **`movies.seed.js`** que se carga en la base de datos las siguientes películas:
4. const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción',
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción',
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación',
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación',
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción',
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica',
  },
];
5. Se ha creado un endpoint **get** que devuelva todas las películas.
6. Se ha creado  un endpoint **get** que devuelva una película según su **_id**
7. Se ha creado  un endpoint **get** que devuelva un valor por su titulo.
8. Se ha creado  un endpoint **get** que devuelva los documentos según su género.
9. Se ha creado  un endpoint **get** que devuelva las películas que se han estrenado a partir de 2010.
10.Se ha creado un CRUD completo, junto con una colección en base de datos que contiene la información de los cines que van a emitir las películas; para ello se ha creado:
11. - Método post de Movies para crear una nueva película.
12. - Método put de Movies para modificar una película.
13. - Método delete de Movies para eliminar una película, la cual se elimina de todos los cines que la tengan en cartelera.
14. Se ha creado un modelo Cinema el cual tiene las propiedades:
    1. name (campo requerido).
    2. location (campo requerido).
    3. movies [ ] (relación con la colección movies).
15. Se han creado los métodos GET, POST, PUT y DELETE de la colección Cinema.
16. Insertar dos documentos en la colección cinema que tengan al menos una relación con una película.
17. Controlar los errores.
18. Se ha añadido autenticación a la API con Passport. 
19. Se han creado dos middleware que permite que ciertos endpoints sólo sean accesibles si el usuario está registrado. (GET all movies, y GET movies por Id)
20. Se permite la subida de archivos al servidor. 
21. Se permite post en movies para la subida de imágenes se guarden en el servidor utilizando multer.
