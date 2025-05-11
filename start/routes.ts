/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const BooksController = () => import('#controllers/books_controller')
const AuthorsController = () => import('#controllers/authors_controller')
const ClassRoomsController = () => import('#controllers/class_rooms_controller')
const GenresController = () => import('#controllers/genres_controller')
const StudentsController = () => import('#controllers/students_controller')
const LendsController = () => import('#controllers/lends_controller')

router.resource('authors', AuthorsController)
router.resource('books', BooksController)
router.resource('class_rooms', ClassRoomsController)
router.resource('genres', GenresController)
router.resource('students', StudentsController)
router.resource('lends', LendsController).except(['edit', 'update', 'destroy', 'show'])

router.post('lends/:id/extend', [LendsController, 'extend'])
router.post('lends/:id/finish', [LendsController, 'finish'])

router.on('/').renderInertia('home')
