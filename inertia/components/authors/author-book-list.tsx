import AuthorBookListItem from './author-book-list-item'

export default function AuthorBookList({
  books,
}: {
  books: {
    id: string
    title: string
    seducCode: string
    quantity: number
    isAvailable: boolean
    createdAt: string
  }[]
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {books.map((book: any) => (
        <AuthorBookListItem book={book} />
      ))}
    </div>
  )
}
