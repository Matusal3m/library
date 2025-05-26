import Lend from '#models/lend'

type FilterLendsOptions = {
    direction?: 'asc' | 'desc' | undefined
    orderBy?: 'created_at' | 'ends_at' | 'extended_at' | 'returned_at' | 'students.name' | undefined
    where?:
        | {
              wasExtended: string | boolean
              itsOngoing: string | boolean
              itsLate: string | boolean
              classRoomsIds?: string[] | undefined
          }
        | undefined
}

type LendColumnsOptions = {
    loadStudentsClassRooms?: boolean
}

export class LendsFilterService {
    async filter(
        { direction, orderBy, where }: FilterLendsOptions,
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
            if (wasExtended && wasExtended !== 'any') {
                query.where('was_extended', wasExtended)
            }

            if (itsOngoing && itsOngoing !== 'any') {
                query.where('its_ongoing', itsOngoing)
            }

            if (itsLate && itsLate !== 'any') {
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

        query.orderBy(orderBy || 'created_at', direction || 'desc')

        return await query.exec()
    }
}
