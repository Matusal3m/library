import app from '@adonisjs/core/services/app'
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

export class DocumentGeneratorService {
    async generate(headers: string[], data: any[][]) {
        const doc = new jsPDF()

        autoTable(doc, {
            head: [headers],
            body: data,
            theme: 'grid',
        })

        const documentPath = `${app.tmpPath()}/documento-${Date.now()}.pdf`

        await doc.save(documentPath, { returnPromise: true })

        return { path: documentPath }
    }
}
