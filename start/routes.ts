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
const BookReplicasController = () => import('#controllers/book_replicas_controller')

router.resource('authors', AuthorsController)
router.resource('books', BooksController)
router.resource('class_rooms', ClassRoomsController).only(['index', 'show'])
router.resource('genres', GenresController).only(['index', 'store', 'show', 'create'])
router.resource('students', StudentsController)

router.get('lends', [LendsController, 'index'])
router.post('lends', [LendsController, 'store'])
router.post('lends/:id/extend', [LendsController, 'extend'])
router.post('lends/:id/finish', [LendsController, 'finish'])

router.get('book-replicas/:id', [BookReplicasController, 'show'])
router.post('book-replicas', [BookReplicasController, 'store'])
router.delete('book-replicas/:id', [BookReplicasController, 'delete'])

router.get('lends/document', [LendsController, 'document'])

router.on('*').redirect('/lends')
