import { inject } from '@adonisjs/core'
import app from '@adonisjs/core/services/app'
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

export class PdfGeneratorService {
  async generate(headers: string[], data: any[][]) {
    const doc = new jsPDF()

    autoTable(doc, {
      head: [headers],
      body: data,
    })

    const documentPath = `${app.tmpPath()}/relatorio-${Date.now()}.pdf`

    await doc.save(documentPath, { returnPromise: true })

    return { paht: documentPath }
  }
}
