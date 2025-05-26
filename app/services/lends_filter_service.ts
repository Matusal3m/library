import Lend from '#models/lend'

type FilterLendsOptions = {
    direction?: string
    orderBy?: 'created_at' | 'ends_at' | 'extended_at' | 'returned_at' | 'students.name' | undefined
    where?: {
        wasExtended: string | boolean
        itsOngoing: string | boolean
        itsLate: string | boolean
        classRoomsIds?: string[] | undefined
    }
    search?: string
    searchBy?: 'student' | 'book'
}

type LendColumnsOptions = {
    loadStudentsClassRooms?: boolean
}

export class LendsFilterService {
    async filter(
        { direction, orderBy, where, search, searchBy }: FilterLendsOptions,
        { loadStudentsClassRooms }: LendColumnsOptions = {}
    ) {
        const query = Lend.query()

        const { wasExtended, itsOngoing, itsLate, classRoomsIds } = where || {}

        const hasFilters =
            wasExtended !== 'any' ||
            itsOngoing !== 'any' ||
            itsLate !== 'any' ||
            (classRoomsIds && classRoomsIds.length > 0)

        if (hasFilters) {
            if (wasExtended !== undefined && wasExtended !== 'any') {
                query.where('was_extended', wasExtended)
            }

            if (itsOngoing !== undefined && itsOngoing !== 'any') {
                query.where('its_ongoing', itsOngoing)
            }

            if (itsLate !== undefined && itsLate !== 'any') {
                const operator = itsLate ? '<' : '>'
                query.where((subquery) => {
                    subquery
                        .where((sq) => {
                            sq.where('ends_at', operator, Date.now()).andWhereNull('returned_at')
                        })
                        .orWhereColumn('ends_at', operator, 'returned_at')
                })
            }

            if (classRoomsIds && classRoomsIds.length > 0) {
                classRoomsIds.forEach((classRoomId) => {
                    query.whereHas('student', (studentQuery) => {
                        studentQuery.where('class_room_id', classRoomId)
                    })
                })
            }
        }

        if (search && search.trim()) {
            const term = `%${search.trim()}%`
            if (searchBy === 'student') {
                query.whereHas('student', (sq) => {
                    sq.whereLike('name', term)
                })
            }

            if (searchBy === 'book') {
                query.whereHas('bookReplica', (br) => {
                    br.whereHas('book', (bq) => {
                        bq.whereLike('title', term)
                    })
                })
            }
        }
        query
            .preload('bookReplica', (q) =>
                q
                    .select('id', 'seduc_code', 'bookId')
                    .preload('book', (q) => q.select('title', 'id'))
            )
            .preload('student', (q) => {
                q.select('id', 'name', 'enrollment_number')

                if (loadStudentsClassRooms) {
                    q.select('class_room_id')
                    q.preload('classRoom', (crq) => crq.select('name'))
                }
            })

        if (orderBy === 'students.name') {
            const lends = await query.exec()

            if (direction === 'desc') {
                return lends.sort((a, b) => a.student.name.localeCompare(b.student.name))
            }

            if (direction === 'asc') {
                return lends.sort((a, b) => b.student.name.localeCompare(a.student.name))
            }
        }

        // @ts-ignore
        query.orderBy(orderBy || 'created_at', direction || 'desc')

        return await query.exec()
    }
}
